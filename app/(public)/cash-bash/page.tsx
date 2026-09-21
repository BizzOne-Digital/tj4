import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Cash Bash",
  description: "Central PA Lions Basketball Cash Bash — June 6, 2026 at Columbia Fire Hall.",
};

export default function CashBashPage() {
  return (
    <>
      <InnerHero
        eyebrow="Cash Bash Event"
        title="Central PA Lions Basketball Cash Bash"
        description="Saturday, June 6, 2026 · Columbia Fire Hall · Osceola Mills, PA"
        image={driveManifest.cashBash[0] || siteImages.achievements}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-8 page-x">
          <DriveImageGrid images={driveManifest.cashBash} altPrefix="Cash Bash" columns="grid-cols-1" />
          <div className="gradient-card p-6 text-sm leading-relaxed text-steel clip-angle sm:p-8">
            <p className="text-lg font-semibold text-white">Saturday, June 6, 2026</p>
            <p className="mt-2">Columbia Fire Hall</p>
            <p>140 Curtain Street</p>
            <p>Osceola Mills, PA 16666</p>
            <p className="mt-4">Doors open at 5:45 pm · Event 6:00 pm to 11:00 pm</p>
            <p className="mt-4">
              Ticket admits 1 person and includes meal, adult beverages, entertainment, and the chance to win cash
              prizes included in the price of the ticket. Must be 21 to attend. Must have ticket at door for admission.
            </p>
            <p className="mt-4 font-semibold text-white">
              50/50&apos;s · Pull tab tickets · Big ticket items · Chinese auction · Lottery game and more!
            </p>
            <p className="mt-6 text-2xl font-[family-name:var(--font-display)] text-electric">$20 / ticket</p>
            <p className="mt-2">Grand prize: Final cash winner $1,000 · Chance @ $100 every 15 minutes</p>
            <p className="mt-4">
              <strong className="text-white">Ticket includes:</strong> Meal · Adult drinks · Entertainment · Chance @
              $100 every 15 minutes
            </p>
            <p className="mt-4">
              <strong className="text-white">Sold separately:</strong> Basket raffle · Rip-off tickets · Door prizes ·
              50/50 + more
            </p>
            <p className="mt-4">You must be present to win @ 9 PM</p>
          </div>
          <Button href="/fundraising" variant="secondary" fullWidth>
            More Fundraising Info
          </Button>
        </div>
      </section>
    </>
  );
}
