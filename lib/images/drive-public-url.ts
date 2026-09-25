/** Correct public URL for files under public/ (encode each path segment, not slashes). */
export function toDrivePublicUrl(relativeFromDriveSite: string): string {
  const prefixParts = [
    "Central PA Lions AAU New Website -20260921T153347Z-1-001",
    "Central PA Lions AAU New Website",
  ];
  const segments = [
    ...prefixParts,
    ...relativeFromDriveSite.split(/[/\\]/).filter(Boolean),
  ];
  return "/" + segments.map((s) => encodeURIComponent(s)).join("/");
}

/** Fix legacy manifest URLs that encoded "/" as %2F inside the first folder name. */
export function normalizePublicAssetUrl(src: string): string {
  if (!src.includes("%2F") && !src.includes("%2f")) return src;
  return src.replace(
    /Central%20PA%20Lions%20AAU%20New%20Website%20-20260921T153347Z-1-001%2F/gi,
    "Central%20PA%20Lions%20AAU%20New%20Website%20-20260921T153347Z-1-001/"
  );
}
