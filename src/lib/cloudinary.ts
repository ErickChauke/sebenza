import { v2 as cloudinary } from "cloudinary";

// Configured from the Cloudinary env vars (see .env.example). secure: true so
// delivery URLs are always https.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

// Best-effort delete of an uploaded asset. The resource type is not stored, so
// each candidate is tried; a missing asset is not treated as an error.
export async function destroyAsset(publicId: string): Promise<void> {
  for (const resource_type of ["image", "raw", "video"] as const) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, { resource_type });
      if (result.result === "ok") return;
    } catch {
      // try the next resource type
    }
  }
}
