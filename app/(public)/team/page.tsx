import type { Metadata } from "next";
import { SafeImage } from "@/components/ui/SafeImage";
import { InnerHero } from "@/components/sections/InnerHero";
import { getCoaches } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the Central PA Lions coaching staff.",
};

export default async function TeamPage() {
  const coaches = await getCoaches();

  return (
    <>
      <InnerHero
        eyebrow="Coaching Staff"
        title="Built By Leaders"
        description="Experienced coaches invested in player development and character."
        image={siteImages.lockerRoom}
      />
      <section className="section-y">
        <div className="mx-auto grid max-w-7xl gap-8 page-x md:grid-cols-3">
          {coaches.map((coach) => (
            <article key={coach.name} className="overflow-hidden border border-white/10 bg-charcoal/50 clip-angle">
              <div className="relative h-64 bg-navy/40">
                {coach.photo && (
                  <SafeImage src={coach.photo} alt={coach.photoAlt || coach.name} fill className="object-cover" />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl uppercase sm:text-3xl">{coach.name}</h2>
                <p className="text-sm text-electric">{coach.title}</p>
                <p className="mt-4 text-sm text-steel">{coach.bio}</p>
                {coach.credentials && <p className="mt-3 text-xs uppercase tracking-wider text-steel">{coach.credentials}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
