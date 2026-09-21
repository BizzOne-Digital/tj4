import { cn } from "@/lib/utils/cn";
import { SafeImage } from "@/components/ui/SafeImage";

/** Full photo visible — no cropped heads (letterbox on dark background). */
export const personPhotoFrameClass =
  "relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-charcoal/85 ring-1 ring-white/10";

export const personPhotoImageClass = "object-contain object-center";

export function PersonPhoto({
  src,
  alt,
  className,
  frameClassName,
  priority,
  sizes = "(max-width:768px) 50vw, 25vw",
}: {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn(personPhotoFrameClass, frameClassName, className)}>
      <SafeImage src={src} alt={alt} fill priority={priority} className={personPhotoImageClass} sizes={sizes} />
    </div>
  );
}

export const posterPhotoFrameClass =
  "relative aspect-[2/3] w-full max-w-md overflow-hidden rounded-xl bg-charcoal/85 ring-1 ring-white/10";

export const posterPhotoImageClass = "object-contain object-top";

export function PosterPhoto({
  src,
  alt,
  className,
  frameClassName,
  priority,
  sizes = "(max-width:768px) 100vw, 280px",
}: {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn(posterPhotoFrameClass, frameClassName, className)}>
      <SafeImage src={src} alt={alt} fill priority={priority} className={posterPhotoImageClass} sizes={sizes} />
    </div>
  );
}
