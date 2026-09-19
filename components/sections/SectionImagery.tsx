import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export function SectionBackdrop({
  src,
  alt,
  children,
  className,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("section-clip relative overflow-hidden", className)}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/80 to-midnight/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-navy/25" />
      <div className="relative">{children}</div>
    </section>
  );
}

export function SplitImagePanel({
  src,
  alt,
  reverse,
  children,
}: {
  src: string;
  alt: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid min-h-0 overflow-hidden sm:min-h-[360px] clip-angle lg:grid-cols-2",
        reverse && "lg:[direction:rtl]"
      )}
    >
      <div className={cn("relative min-h-[280px] lg:min-h-full", reverse && "lg:[direction:ltr]")}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-midnight/30" />
      </div>
      <div className={cn("flex flex-col justify-center p-5 sm:p-8 lg:p-12", reverse && "lg:[direction:ltr]")}>
        {children}
      </div>
    </div>
  );
}
