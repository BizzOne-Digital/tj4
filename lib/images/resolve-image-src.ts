/** Fallback when legacy disk paths or missing images are used on the public site. */
export const IMAGE_PLACEHOLDER = "/images/court-center.jpg";

const LEGACY_DISK_PREFIX = "/uploads/";

export function resolveImageSrc(src?: string | null): string {
  if (!src) return IMAGE_PLACEHOLDER;
  if (src.startsWith(LEGACY_DISK_PREFIX)) return IMAGE_PLACEHOLDER;
  return src;
}

export function isStoredUploadUrl(src?: string | null): boolean {
  return Boolean(src?.startsWith("/api/uploads/"));
}
