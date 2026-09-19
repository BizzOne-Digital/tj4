import { randomBytes } from "crypto";
import { connectDB } from "@/lib/db/mongodb";
import { StoredUpload } from "@/models/schemas";
import { extensionForMime, isUploadFolder } from "@/lib/uploads/constants";

const UPLOAD_URL_PREFIX = "/api/uploads/";

export function parseStoredUploadUrl(url: string): { folder: string; filename: string } | null {
  if (!url.startsWith(UPLOAD_URL_PREFIX)) return null;
  const rest = url.slice(UPLOAD_URL_PREFIX.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) return null;
  const folder = rest.slice(0, slash);
  const filename = rest.slice(slash + 1);
  if (!isUploadFolder(folder) || !isSafeFilename(filename)) return null;
  return { folder, filename };
}

export function isSafeFilename(filename: string): boolean {
  if (!filename || filename.length > 200) return false;
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) return false;
  return /^[a-zA-Z0-9._-]+$/.test(filename);
}

export function buildUploadPublicUrl(folder: string, filename: string): string {
  return `${UPLOAD_URL_PREFIX}${folder}/${filename}`;
}

export function generateUploadFilename(mimeType: string): string {
  const ext = extensionForMime(mimeType) || "bin";
  return `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
}

export async function deleteStoredUploadByUrl(url: string | null | undefined): Promise<boolean> {
  if (!url) return false;
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const result = await StoredUpload.deleteOne({ folder: parsed.folder, filename: parsed.filename });
  return result.deletedCount > 0;
}
