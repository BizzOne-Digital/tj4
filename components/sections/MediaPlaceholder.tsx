import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function MediaPlaceholder({
  label,
  className,
  aspect = "video",
}: {
  label: string;
  className?: string;
  aspect?: "video" | "square" | "poster";
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "poster" ? "aspect-[3/4]" : "aspect-video";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 bg-charcoal/40 p-6 text-center",
        aspectClass,
        className
      )}
    >
      <ImageIcon className="h-10 w-10 text-electric/60" aria-hidden />
      <p className="text-xs uppercase tracking-widest text-steel">Photo / video coming soon</p>
      <p className="max-w-xs text-[11px] leading-snug text-steel/80">{label}</p>
    </div>
  );
}
