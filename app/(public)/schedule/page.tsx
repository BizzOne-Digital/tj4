import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { schedulePageCopy, tournamentSchedule2526 } from "@/lib/content/lions-copy";
import { siteImages } from "@/lib/data/site-images";
import { drivePageHero } from "@/lib/images/drive-page-heroes";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Central PA Lions tournament schedule for the 2025–26 and 2026–27 seasons.",
};

export default function SchedulePage() {
  const copy = schedulePageCopy;

  return (
    <>
      <InnerHero
        eyebrow="Schedule"
        title={copy.tournamentsHeading}
        description={copy.season2526Banner}
        image={drivePageHero("schedule")}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-16 page-x">
          <div>
            <h2 className="text-2xl uppercase text-electric">Tab: {copy.season2526Label}</h2>
            <p className="mt-4 text-center text-lg font-semibold">{copy.season2526Banner}</p>
            <ul className="mt-8 space-y-6">
              {tournamentSchedule2526.map((item) => (
                <li key={item.num} className="border-b border-white/10 pb-6">
                  <p className="text-base font-semibold text-white">
                    ✅ #{item.num}. {item.line}
                  </p>
                  {item.subtitle ? <p className="mt-2 text-sm text-steel">{item.subtitle}</p> : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-dashed border-white/20 p-8 text-center">
            <h2 className="text-2xl uppercase">Tab: {copy.season2627Label}</h2>
            <p className="mt-3 text-lg text-steel">{copy.season2627Message}</p>
          </div>
        </div>
      </section>
    </>
  );
}
