/** Fallback when legacy disk paths or missing images are used on the public site. */
import { normalizePublicAssetUrl } from "@/lib/images/drive-public-url";

export const IMAGE_PLACEHOLDER = "/images/court-center.jpg";

const LEGACY_DISK_PREFIX = "/uploads/";

export function resolveImageSrc(src?: string | null): string {
  if (!src) return IMAGE_PLACEHOLDER;
  if (src.startsWith(LEGACY_DISK_PREFIX)) return IMAGE_PLACEHOLDER;
  if (src.includes("Central%20PA%20Lions") || src.includes("%2F")) {
    return normalizePublicAssetUrl(src);
  }
  return src;
}

export function isStoredUploadUrl(src?: string | null): boolean {
  return Boolean(src?.startsWith("/api/uploads/"));
}
