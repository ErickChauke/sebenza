import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_FOLDERS = ["lifeperch/vault", "lifeperch/literature"];

// Uploads a single file to Cloudinary and returns its delivery URL and id, which
// the caller stores via the vault/literature server actions.
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const folderRaw = form.get("folder");
  const folder = ALLOWED_FOLDERS.includes(String(folderRaw))
    ? String(folderRaw)
    : "lifeperch";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (max 10MB)" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type || "application/octet-stream"};base64,${buffer.toString("base64")}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      resource_type: "auto",
    });
    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format ?? null,
      bytes: result.bytes ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
