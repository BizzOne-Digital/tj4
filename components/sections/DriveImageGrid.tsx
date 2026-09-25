import { PersonPhoto, PosterPhoto } from "@/components/ui/PersonPhoto";

export function DriveImageGrid({
  images,
  altPrefix = "Central PA Lions",
  columns = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  featured = false,
}: {
  images: string[];
  altPrefix?: string;
  columns?: string;
  /** One image uses full row width; larger frame for contact cards / hero assets */
  featured?: boolean;
}) {
  if (!images.length) return null;

  const gridCols = images.length === 1 ? "grid-cols-1" : columns;
  const Photo = featured ? PosterPhoto : PersonPhoto;

  return (
    <div className={`grid gap-3 sm:gap-4 ${gridCols}`}>
      {images.map((url, i) => (
        <Photo
          key={url + i}
          src={url}
          alt={`${altPrefix} ${i + 1}`}
          frameClassName={
            featured
              ? "w-[calc(100%+2rem)] max-w-none -mx-4 rounded-xl ring-1 ring-white/10 sm:mx-auto sm:w-full sm:max-w-4xl"
              : undefined
          }
        />
      ))}
    </div>
  );
}
