import { PersonPhoto } from "@/components/ui/PersonPhoto";

export function DriveImageGrid({
  images,
  altPrefix = "Central PA Lions",
  columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
}: {
  images: string[];
  altPrefix?: string;
  columns?: string;
}) {
  if (!images.length) return null;

  return (
    <div className={`grid gap-3 sm:gap-4 ${columns}`}>
      {images.map((url, i) => (
        <PersonPhoto key={url + i} src={url} alt={`${altPrefix} ${i + 1}`} />
      ))}
    </div>
  );
}
