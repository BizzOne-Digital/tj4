import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { getSiteSettings } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";
import { Button } from "@/components/ui/Button";
import { MAILING_ADDRESS, SQUARE_SITE_URL } from "@/lib/content/lions-copy";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Central PA Lions uniforms, equipment, and student-athletes.",
};

export default async function DonatePage() {
  const settings = await getSiteSettings();
  const levels = settings.donation.levels?.length
    ? settings.donation.levels
    : [25, 50, 75, 100, 150, 250, 500, 1000];

  return (
    <>
      <InnerHero
        eyebrow="Donate"
        title="Support Our Student-Athletes"
        description="Fundraising is vital for uniforms, equipment, training programs, and tournament travel."
        image={siteImages.achievements}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-8 page-x">
          <Prose />
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
            {levels.map((amount) => (
              <a
                key={amount}
                href={SQUARE_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[88px] flex-col items-center justify-center border border-white/10 p-4 text-center clip-angle hover:border-electric/40 sm:p-6"
              >
                <p className="text-3xl font-[family-name:var(--font-display)] sm:text-4xl">${amount}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-steel">Donate</p>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={SQUARE_SITE_URL} fullWidth>
              Secure Online Donation
            </Button>
            <Button href="/contact" variant="secondary" fullWidth>
              Corporate Sponsorships
            </Button>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-charcoal/40 p-6 text-sm text-steel">
            {MAILING_ADDRESS}
          </pre>
          {settings.donation.mailingInstructions && (
            <p className="text-sm text-steel">{settings.donation.mailingInstructions}</p>
          )}
          <p className="text-sm text-steel">
            For more information about corporate sponsorships, contact us at{" "}
            <a href="mailto:contact@centralpalions.com" className="text-electric">
              contact@centralpalions.com
            </a>
            .
          </p>
          <p className="text-center text-lg text-white">Thank you for your support of our student-athletes and program!</p>
        </div>
      </section>
    </>
  );
}

function Prose() {
  return (
    <div className="space-y-4 text-steel">
      <p>
        Fundraising is vital for the success of our program. The funds raised will assist our program in the
        purchasing of new uniforms, equipment (such as shooting machines, balls, protective gear), and other
        pertinent expenses. Below are various fundraising levels for which you can support our student-athletes
        and our program.
      </p>
      <p className="text-sm">
        Fundraising levels: $25 · $50 · $75 · $100 · $150 · $250 · $500 · $1,000
      </p>
    </div>
  );
}
