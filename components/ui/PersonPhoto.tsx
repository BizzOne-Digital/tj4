/* eslint-disable @next/next/no-img-element -- Native img keeps natural aspect ratio per portrait. */
import { cn } from "@/lib/utils/cn";
import { resolveImageSrc } from "@/lib/images/resolve-image-src";

/** Frame hugs the image — native img avoids Next.js fixed aspect-ratio wrappers. */
export const personPhotoFrameClass =
  "overflow-hidden rounded-xl ring-1 ring-white/10 bg-transparent";

export function PersonPhoto({
  src,
  alt,
  className,
  frameClassName,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  /** @deprecated layout is always natural width; kept for call-site compatibility */
  sizes?: string;
}) {
  const resolved = resolveImageSrc(src);

  return (
    <div className={cn(personPhotoFrameClass, frameClassName, className)}>
      {/* Native img so container height matches each photo (no letterbox frame). */}
      <img
        src={resolved}
        alt={alt}
        className="block h-auto w-full align-bottom"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

export const posterPhotoFrameClass =
  "overflow-hidden rounded-xl ring-1 ring-white/10 w-full bg-transparent";

export function PosterPhoto({
  src,
  alt,
  className,
  frameClassName,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const resolved = resolveImageSrc(src);

  return (
    <div className={cn(posterPhotoFrameClass, frameClassName, className)}>
      <img
        src={resolved}
        alt={alt}
        className="block h-auto w-full align-bottom"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
