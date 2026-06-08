"use server";

import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { destroyAsset } from "@/lib/cloudinary";
import { documentSchema, type DocumentInput } from "@/lib/vault";

const VAULT_COOKIE = "vault_token";

// Returns the current user id or throws when there is no session.
async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return session.user.id;
}

// The opaque token stored in the unlock cookie: a hash of the PIN and the auth
// secret, so a forged cookie value cannot unlock the vault without the PIN.
function expectedToken(): string {
  const pin = process.env.VAULT_PIN ?? "";
  const secret = process.env.NEXTAUTH_SECRET ?? "";
  return createHash("sha256").update(`${pin}:${secret}`).digest("hex");
}

// Whether the vault is unlocked for this session (cookie matches the token).
export async function isVaultUnlocked(): Promise<boolean> {
  const store = await cookies();
  return store.get(VAULT_COOKIE)?.value === expectedToken();
}

// Verifies the PIN and, on success, sets the session unlock cookie.
export async function unlockVault(pin: string): Promise<{ ok: boolean }> {
  await requireUserId();
  if (!process.env.VAULT_PIN || pin !== process.env.VAULT_PIN) {
    return { ok: false };
  }
  const store = await cookies();
  store.set(VAULT_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  revalidatePath("/vault");
  return { ok: true };
}

// Clears the unlock cookie, re-locking the vault.
export async function lockVault(): Promise<void> {
  const store = await cookies();
  store.delete(VAULT_COOKIE);
  revalidatePath("/vault");
}

// Fetches the user's documents, newest first. Throws when the vault is locked.
export async function getDocuments() {
  const userId = await requireUserId();
  if (!(await isVaultUnlocked())) throw new Error("Vault locked");
  return prisma.document.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

// Stores a document record after its file has been uploaded via /api/upload.
export async function createDocument(input: DocumentInput) {
  const userId = await requireUserId();
  if (!(await isVaultUnlocked())) throw new Error("Vault locked");
  const data = documentSchema.parse(input);
  await prisma.document.create({
    data: {
      userId,
      title: data.title.trim(),
      category: data.category,
      url: data.url,
      publicId: data.publicId,
      format: data.format ?? null,
      bytes: data.bytes ?? null,
    },
  });
  revalidatePath("/vault");
}

// Deletes a document and its Cloudinary asset, scoped to the current user.
export async function deleteDocument(id: string) {
  const userId = await requireUserId();
  if (!(await isVaultUnlocked())) throw new Error("Vault locked");
  const doc = await prisma.document.findFirst({ where: { id, userId } });
  if (!doc) return;
  await destroyAsset(doc.publicId);
  await prisma.document.deleteMany({ where: { id, userId } });
  revalidatePath("/vault");
}
