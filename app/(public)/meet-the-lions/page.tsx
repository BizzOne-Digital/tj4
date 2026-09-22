import type { Metadata } from "next";
import Link from "next/link";
import { PersonPhoto } from "@/components/ui/PersonPhoto";
import { InnerHero } from "@/components/sections/InnerHero";
import { driveGalleryCover } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";
import { meetTheLionsSeasons } from "@/lib/content/lions-copy";

export const metadata: Metadata = {
  title: "Meet the Lions",
  description: "Browse Lions Basketball team pictures from every season.",
};

export default function MeetTheLionsPage() {
  const heroCover =
    driveGalleryCover("2025-26") || driveGalleryCover("2020-21") || siteImages.benchGear;

  return (
    <>
      <InnerHero
        eyebrow="Meet the Lions"
        title="Meet the Lions"
        description="Browse Lions Basketball team pictures from every season."
        image={heroCover}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          <p className="mx-auto max-w-2xl text-center text-base text-steel sm:text-lg">
            Browse Lions Basketball team pictures from every season.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {meetTheLionsSeasons.map((season) => {
              const cover = driveGalleryCover(season.slug) || siteImages.trainingCourt;
              return (
                <Link
                  key={season.slug}
                  href={`/meet-the-lions/${season.slug}`}
                  className="group overflow-hidden gradient-card clip-angle transition hover:border-electric/30"
                >
                  <PersonPhoto
                    src={cover}
                    alt={season.title}
                    frameClassName="aspect-[4/3] rounded-none ring-0"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-widest text-electric">{season.label}</p>
                    <h2 className="mt-1 text-xl uppercase sm:text-2xl">{season.title}</h2>
                    {season.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-steel">{season.description}</p>
                    ) : null}
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-electric group-hover:text-white">
                      View season →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
