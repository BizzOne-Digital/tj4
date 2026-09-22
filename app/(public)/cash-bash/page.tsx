import type { Metadata } from "next";
import type { ReactNode } from "react";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";
import { cashBashEvent } from "@/lib/content/lions-copy";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Cash Bash Event",
  description: "Central PA Lions Basketball Cash Bash — June 6, 2026 at Columbia Fire Hall.",
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-electric">{children}</p>
  );
}

export default function CashBashPage() {
  const e = cashBashEvent;
  const heroImage = driveManifest.cashBash[0] || siteImages.achievements;

  return (
    <>
      <InnerHero
        eyebrow="Cash Bash Event"
        title="Central PA Lions Basketball Cash Bash"
        description={`${e.date} · ${e.venue.name} · Osceola Mills, PA`}
        image={heroImage}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-10 page-x">
          <div className="gradient-card space-y-8 p-6 text-sm leading-relaxed text-steel clip-angle sm:p-8">
            <div className="text-center">
              <p className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-white sm:text-2xl">
                {e.headline[0]}
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-electric sm:text-2xl">
                {e.headline[1]}
              </p>
              <p className="mt-6 text-base font-semibold text-white">{e.date}</p>
              <p className="mt-3">{e.venue.name}</p>
              <p>{e.venue.street}</p>
              <p>{e.venue.cityStateZip}</p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <SectionLabel>Ticket</SectionLabel>
              <p className="mt-2">{e.schedule.doors}</p>
              <p>{e.schedule.event}</p>
              <p className="mt-4">{e.ticketNote}</p>
              <p className="mt-3 font-semibold text-white">{e.ageRequirement}</p>
              <p className="mt-1 font-semibold text-white">{e.admission}</p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-white">{e.extras}</p>
            </div>

            <div className="border-t border-white/10 pt-6 text-center">
              <SectionLabel>Ticket</SectionLabel>
              <p className="mt-3 text-3xl font-[family-name:var(--font-display)] text-electric">{e.price}</p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <SectionLabel>{e.grandPrize.title}</SectionLabel>
              {e.grandPrize.lines.map((line) => (
                <p key={line} className="mt-2 text-base text-white">
                  {line}
                </p>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <SectionLabel>Ticket includes</SectionLabel>
              <ul className="mt-3 list-inside list-disc space-y-1">
                {e.ticketIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-6">
              <SectionLabel>Sold separately</SectionLabel>
              <ul className="mt-3 list-inside list-disc space-y-1">
                {e.soldSeparately.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="border-t border-white/10 pt-6 text-center font-semibold text-white">{e.presenceRule}</p>
          </div>

          {driveManifest.cashBash.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-center text-2xl uppercase">Pictures</h2>
              <DriveImageGrid
                images={driveManifest.cashBash}
                altPrefix="Cash Bash"
                columns="grid-cols-1 sm:grid-cols-2"
              />
            </div>
          )}

          <Button href="/fundraising" variant="secondary" fullWidth>
            More Fundraising Info
          </Button>
        </div>
      </section>
    </>
  );
}
