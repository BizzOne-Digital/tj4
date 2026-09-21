import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { getPricingPlans, getSiteSettings } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";
import { Button } from "@/components/ui/Button";
import { SQUARE_SITE_URL } from "@/lib/content/lions-copy";

export const metadata: Metadata = {
  title: "Program Fees",
  description: "Central PA Lions Academy registration fees and enrollment information.",
};

export default async function PricingPage() {
  const [plans, settings] = await Promise.all([getPricingPlans(), getSiteSettings()]);

  return (
    <>
      <InnerHero
        eyebrow="Program Fees"
        title="Program Pricing to Join Our Family"
        description="Non-refundable registration fees due upon enrollment."
        image={siteImages.achievements}
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          <p className="max-w-2xl text-steel">The non-refundable fees are as follows:</p>
          <ul className="mt-4 space-y-2 text-steel">
            <li>• $400 (individual)</li>
            <li>• $700 (2 person family)</li>
            <li>• $1,050 (3 person family)</li>
          </ul>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`border p-6 clip-angle sm:p-8 ${i === 1 ? "border-electric bg-electric/10 glow-blue" : "border-white/10 bg-charcoal/40"}`}
              >
                <p className="text-sm uppercase tracking-widest text-steel">{plan.name}</p>
                <p className="mt-3 text-4xl font-[family-name:var(--font-display)] sm:text-6xl">${plan.price}</p>
                <p className="mt-2 text-sm text-steel">{plan.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-amber-400/30 bg-amber-400/10 p-6 text-sm leading-relaxed text-steel">
            {settings.registrationNotice}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={SQUARE_SITE_URL} fullWidth>
              Pay Online (Square)
            </Button>
            <Button href="/register" variant="secondary" fullWidth>
              Join Our Team
            </Button>
            <Button href="/tryouts" variant="ghost" fullWidth>
              Tryout Information
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
