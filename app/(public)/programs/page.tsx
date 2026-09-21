import type { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { InnerHero } from "@/components/sections/InnerHero";
import { ProseBlock } from "@/components/sections/ProseBlock";
import { getPrograms } from "@/lib/data/queries";
import { siteImages, programImageByIndex } from "@/lib/data/site-images";
import { programsIntro, travelTeamsCopy } from "@/lib/content/lions-copy";

export const metadata: Metadata = {
  title: "Programs",
  description: "Camps, clinics, AAU, travel teams, and K-12 development programs.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <InnerHero
        eyebrow="Programs"
        title="Development Led by USAB Gold Certified Coaches"
        description="From novice to advanced — learn the game and take skills to the next level on and off the court."
        image={siteImages.trainingCourt}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl page-x">
          <ProseBlock paragraphs={programsIntro} />
          <div className="mt-10 gradient-card p-6 clip-angle">
            <h2 className="text-2xl uppercase">Travel Teams</h2>
            <p className="mt-4 text-sm leading-relaxed text-steel">{travelTeamsCopy}</p>
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 section-y">
        <div className="mx-auto grid max-w-7xl gap-6 page-x md:grid-cols-2">
          {programs.map((program, index) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group grid overflow-hidden gradient-card md:grid-cols-2 clip-angle"
            >
              <div className="relative min-h-[200px] sm:min-h-[220px]">
                <SafeImage
                  src={program.featuredImage || programImageByIndex(index)}
                  alt={program.featuredImageAlt || program.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="text-2xl uppercase sm:text-3xl">{program.title}</h2>
                <p className="mt-2 text-sm text-steel">{program.shortDescription}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-electric">View Details</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
