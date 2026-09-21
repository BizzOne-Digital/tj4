import Image, { type ImageProps } from "next/image";
import { isStoredUploadUrl, resolveImageSrc } from "@/lib/images/resolve-image-src";
import { isDriveAssetUrl } from "@/lib/images/drive-assets";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
};

export function SafeImage({ src, alt, unoptimized, ...rest }: SafeImageProps) {
  const resolved = resolveImageSrc(src);
  return (
    <Image
      src={resolved}
      alt={alt}
      unoptimized={unoptimized ?? isStoredUploadUrl(src) ?? isDriveAssetUrl(src)}
      {...rest}
    />
  );
}
