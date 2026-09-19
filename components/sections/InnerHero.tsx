import Image from "next/image";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ISiteSettings } from "@/models/schemas";

export function InnerHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "Central PA Lions basketball",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="section-clip relative overflow-hidden border-b border-white/10 py-12 sm:py-16 md:py-20 lg:py-24">
      {image ? (
        <>
          <SafeImage src={image} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/80 to-midnight/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-navy/25" />
        </>
      ) : (
        <>
          <div className="mesh-orb -left-24 top-0 h-72 w-72 bg-electric/30" />
          <div className="mesh-orb -right-16 top-1/4 h-96 w-96 bg-navy/50" />
          <div className="absolute inset-0 court-lines opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-midnight/90 to-electric/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-navy/20" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl page-x">
        {eyebrow && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gradient-electric sm:text-xs sm:tracking-[0.35em]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-4xl break-words text-4xl sm:text-5xl md:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base text-steel sm:text-lg">{description}</p>}
      </div>
    </section>
  );
}

export function MissionBlock({ settings }: { settings: ISiteSettings }) {
  return (
    <section className="section-clip relative section-gradient-a py-12 sm:py-16 md:py-20">
      <div className="mesh-orb right-0 top-1/2 h-64 w-64 -translate-y-1/2 bg-electric/20" />
      <div className="relative mx-auto max-w-7xl page-x">
        <div className="overflow-hidden rounded-2xl border border-white/10 gradient-card">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
              <Image
                src="/images/court-center.jpg"
                alt="Central PA Lions training on center court"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-midnight/50" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <p className="text-xs uppercase tracking-[0.3em] text-electric">Mission</p>
              <h2 className="mt-3 text-3xl text-gradient-silver sm:text-4xl">Built for More Than Game Day</h2>
              <p className="mt-4 text-base leading-relaxed text-steel sm:mt-6 sm:text-lg">{settings.mission}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
