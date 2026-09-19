import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { getSiteSettings } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Support the Lions",
  description: "Help fund uniforms, equipment, and tournament resources for Central PA Lions athletes.",
};

export default async function DonatePage() {
  const settings = await getSiteSettings();
  const levels = settings.donation.levels?.length
    ? settings.donation.levels
    : [25, 50, 75, 100, 150, 250, 500, 1000];

  return (
    <>
      <InnerHero
        eyebrow="Support"
        title="Fuel the Pride"
        description="Donations help purchase uniforms, equipment, shooting machines, basketballs, protective gear, and tournament resources."
        image={siteImages.achievements}
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
            {levels.map((amount) => (
              <a
                key={amount}
                href={settings.donation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[88px] flex-col items-center justify-center border border-white/10 p-4 text-center clip-angle hover:border-electric/40 sm:p-6"
              >
                <p className="text-3xl font-[family-name:var(--font-display)] sm:text-4xl">${amount}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-steel">Donate</p>
              </a>
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: "Uniforms & Gear", copy: "Outfit athletes with pride and safety." },
              { title: "Training Equipment", copy: "Basketballs, machines, and court tools." },
              { title: "Tournament Resources", copy: "Travel and competition support." },
            ].map((card) => (
              <div key={card.title} className="glass-panel p-6">
                <h3 className="text-xl uppercase">{card.title}</h3>
                <p className="mt-2 text-sm text-steel">{card.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={settings.donation.url} fullWidth>
              Secure Donation Link
            </Button>
            <Link href="/contact" className="text-sm uppercase tracking-widest text-steel hover:text-white">
              Corporate Sponsorship Inquiries
            </Link>
          </div>
          {settings.donation.mailingInstructions && (
            <p className="mt-8 text-sm text-steel">{settings.donation.mailingInstructions}</p>
          )}
        </div>
      </section>
    </>
  );
}
