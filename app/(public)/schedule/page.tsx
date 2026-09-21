import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { tournamentSchedule2526 } from "@/lib/content/lions-copy";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Central PA Lions tournament schedule for the 2025–26 and 2026–27 seasons.",
};

export default function SchedulePage() {
  return (
    <>
      <InnerHero
        eyebrow="Schedule"
        title="Central PA Lions Tournaments"
        description="🚨 Central PA Lions 2025–26 Season 🚨"
        image={siteImages.courtCenter}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl page-x">
          <h2 className="text-2xl uppercase text-electric">2025–26 Season</h2>
          <ul className="mt-8 space-y-6">
            {tournamentSchedule2526.map((item) => (
              <li key={item.num} className="border-b border-white/10 pb-6">
                <p className="text-xs uppercase tracking-widest text-steel">
                  #{item.num} · {item.dates}
                </p>
                <p className="mt-1 text-lg font-semibold">{item.title}</p>
                {item.subtitle && <p className="text-sm text-steel">{item.subtitle}</p>}
              </li>
            ))}
          </ul>
          <div className="mt-16 rounded-xl border border-dashed border-white/20 p-8 text-center">
            <h2 className="text-2xl uppercase">2026–27 Season</h2>
            <p className="mt-3 text-lg text-steel">Coming soon!!</p>
          </div>
        </div>
      </section>
    </>
  );
}
