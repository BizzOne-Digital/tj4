import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { ProseBlock } from "@/components/sections/ProseBlock";
import { getSiteSettings } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";
import { drivePageHero } from "@/lib/images/drive-page-heroes";
import {
  aboutAcademyIntro,
  seasonMission,
  teamCultureBlocks,
  visionFull,
} from "@/lib/content/lions-copy";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About the Academy",
  description: "History, mission, vision, and culture of TJ Anderson's Central PA Lions Academy.",
};

const timeline = [
  {
    year: "2011",
    title: "Huntingdon Cats Youth Basketball",
    copy: "The program launches with a community-first approach to youth basketball development.",
  },
  {
    year: "2014",
    title: "JV Stingers Basketball Academy",
    copy: "The academy expands its travel and development model for student-athletes.",
  },
  {
    year: "2020",
    title: "Central PA Lions Academy",
    copy: "TJ Anderson reorganizes the program as TJ Anderson's Central PA Lions Academy.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <InnerHero
        eyebrow="About the Academy"
        title="TJ Anderson's Central PA Lions Academy"
        description="Youth basketball for grades K–12 — developing athletes on and off the court across Central Pennsylvania."
        image={drivePageHero("about")}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl page-x">
          <ProseBlock paragraphs={aboutAcademyIntro} />
        </div>
      </section>

      <section className="border-y border-white/10 bg-charcoal/40 section-y">
        <div className="mx-auto max-w-7xl page-x">
          <h2 className="text-3xl sm:text-4xl">Our Story</h2>
          <div className="mt-8 space-y-8 border-l border-electric/40 pl-5 sm:mt-12 sm:space-y-10 sm:pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative pl-1">
                <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-electric sm:-left-[41px]" />
                <p className="text-sm uppercase tracking-[0.3em] text-electric">{item.year}</p>
                <h3 className="mt-1 text-xl uppercase sm:text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-steel">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto max-w-3xl page-x space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-electric">Mission, Vision &amp; Team Culture</p>
            <h2 className="mt-3 text-3xl">Season Mission</h2>
            <p className="mt-4 text-steel leading-relaxed">{seasonMission}</p>
          </div>
          <div>
            <h2 className="text-2xl uppercase sm:text-3xl">Vision</h2>
            <p className="mt-4 text-steel leading-relaxed">{visionFull}</p>
          </div>
          <div>
            <h2 className="text-2xl uppercase sm:text-3xl">Team Culture</h2>
            <div className="mt-6 space-y-8">
              {teamCultureBlocks.map((block) => (
                <div key={block.quote} className="gradient-card p-6 clip-angle">
                  <p className="text-lg font-semibold text-white">&ldquo;{block.quote}&rdquo;</p>
                  <p className="mt-3 text-sm text-steel leading-relaxed">{block.body}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-steel">{settings.mission}</p>
        </div>
      </section>

      <section className="section-y text-center">
        <Button href="/register" fullWidth className="mx-auto sm:w-auto">
          Join Our Team
        </Button>
      </section>
    </>
  );
}
