import manifest from "@/lib/data/drive-manifest.json";
import type { IGalleryImage } from "@/models/schemas";

export type DriveManifest = typeof manifest;

export const driveManifest = manifest as DriveManifest;

export function isDriveAssetUrl(src?: string | null): boolean {
  return Boolean(src?.includes("Central%20PA%20Lions%20AAU%20New%20Website"));
}

export function driveGalleryImages(albumSlug: string): IGalleryImage[] {
  const album = driveManifest.meetTheLions[albumSlug as keyof typeof driveManifest.meetTheLions];
  if (!album?.images?.length) return [];
  return album.images.map((url, order) => ({
    albumSlug,
    url,
    alt: `Central PA Lions ${albumSlug}`,
    order,
  }));
}

export function driveGalleryCover(albumSlug: string): string | undefined {
  const album = driveManifest.meetTheLions[albumSlug as keyof typeof driveManifest.meetTheLions];
  return album?.cover || album?.images?.[0];
}
