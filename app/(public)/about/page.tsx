import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { getSiteSettings } from "@/lib/data/queries";
import { Button } from "@/components/ui/Button";
import { siteImages } from "@/lib/data/site-images";
import { SplitImagePanel } from "@/components/sections/SectionImagery";

export const metadata: Metadata = {
  title: "About Us",
  description: "History, mission, and culture of TJ Anderson's Central PA Lions Academy.",
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
        title="Excellence Is A Habit"
        description="Youth basketball for grades K–12 — developing athletes on and off the court across Central Pennsylvania."
        image={siteImages.courtCenter}
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          <div className="overflow-hidden rounded-2xl border border-white/10 gradient-card">
            <SplitImagePanel src={siteImages.arenaTunnel} alt="Central PA Lions arena">
              <p className="text-xs uppercase tracking-[0.3em] text-electric">Our Story</p>
              <h2 className="mt-2 text-3xl">From Huntingdon Cats to Central PA Lions</h2>
              <p className="mt-4 text-steel">
                A program built on community, development, and competing with class across Central Pennsylvania.
              </p>
            </SplitImagePanel>
          </div>
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
        <div className="mx-auto grid max-w-7xl gap-10 page-x lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-electric">Vision</p>
            <p className="mt-4 text-lg text-steel">{settings.vision}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-electric">Team Culture</p>
            <ul className="mt-4 space-y-3 text-steel">
              {[
                "Winning begins with intentional daily choices.",
                "Preparation and discipline create confidence.",
                "Hard work is required in the classroom and on the court.",
                "Development beyond basketball is as important as athletic success.",
              ].map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y text-center">
        <Button href="/register" fullWidth className="mx-auto sm:w-auto">
          Join the Academy
        </Button>
      </section>
    </>
  );
}
