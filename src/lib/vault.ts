import { z } from "zod";

// Document categories for the vault.
export const DOCUMENT_CATEGORIES = [
  "ID & legal",
  "Finance",
  "Medical",
  "Education",
  "Work",
  "Other",
] as const;

// Validation for creating a document. The upload fields come from our own upload
// route, so the form only supplies title and category.
export const documentSchema = z.object({
  title: z.string().min(1, "Name the document"),
  category: z.string().min(1, "Pick a category"),
  url: z.string().url(),
  publicId: z.string().min(1),
  format: z.string().nullable().optional(),
  bytes: z.number().nullable().optional(),
});

export type DocumentInput = z.infer<typeof documentSchema>;
