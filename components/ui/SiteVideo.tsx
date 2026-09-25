import { cn } from "@/lib/utils/cn";

export function SiteVideo({
  src,
  title,
  className,
  preload = "metadata",
}: {
  src: string;
  title: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
}) {
  return (
    <div className={cn("overflow-hidden bg-midnight clip-angle ring-1 ring-white/10", className)}>
      <video
        src={src}
        controls
        playsInline
        preload={preload}
        className="aspect-video h-full w-full bg-black object-contain"
        title={title}
        aria-label={title}
      />
    </div>
  );
}
