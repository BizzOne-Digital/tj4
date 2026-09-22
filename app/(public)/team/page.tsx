import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { PosterPhoto } from "@/components/ui/PersonPhoto";
import { MediaPlaceholder } from "@/components/sections/MediaPlaceholder";
import { getCoaches } from "@/lib/data/queries";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Meet the Coaches",
  description: "Meet the Central PA Lions coaching staff.",
};

export default async function TeamPage() {
  const coaches = await getCoaches();
  const coachHero =
    (Object.values(driveManifest.coaches).find(Boolean) as string | undefined) || siteImages.lockerRoom;

  return (
    <>
      <InnerHero
        eyebrow="Meet the Coaches"
        title="One Team. One Family. One Purpose."
        description="USAB Gold Certified coaches invested in player development and character."
        image={coachHero}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-4xl space-y-16 page-x">
          {coaches.map((coach) => (
            <article key={coach.name} className="overflow-hidden border border-white/10 bg-charcoal/50 clip-angle">
              <div className="grid items-start gap-6 md:grid-cols-[minmax(0,300px)_1fr] md:gap-8">
                <div className="mx-auto w-full max-w-[300px] md:mx-0">
                  {coach.photo ? (
                    <PosterPhoto src={coach.photo} alt={coach.photoAlt || coach.name} frameClassName="min-h-[360px]" />
                  ) : (
                    <MediaPlaceholder label={`Meet the Coaches / ${coach.name} / Poster`} aspect="poster" />
                  )}
                </div>
                <div className="p-6 md:p-8 md:pt-6">
                  <h2 className="text-2xl uppercase sm:text-3xl">{coach.name}</h2>
                  <p className="text-sm text-electric">{coach.title}</p>
                  <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-steel">{coach.bio}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
