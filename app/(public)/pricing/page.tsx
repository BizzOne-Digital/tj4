import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { getPricingPlans, getSiteSettings } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Central PA Lions Academy registration fees and enrollment information.",
};

export default async function PricingPage() {
  const [plans, settings] = await Promise.all([getPricingPlans(), getSiteSettings()]);

  return (
    <>
      <InnerHero
        eyebrow="Registration Fees"
        title="Clear. Fair. Family-Friendly."
        description="Non-refundable registration fees due upon enrollment."
        image={siteImages.achievements}
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`border p-6 clip-angle sm:p-8 ${i === 1 ? "border-electric bg-electric/10 glow-blue" : "border-white/10 bg-charcoal/40"}`}
              >
                <p className="text-sm uppercase tracking-widest text-steel">{plan.name}</p>
                <p className="mt-3 text-4xl font-[family-name:var(--font-display)] sm:text-6xl">${plan.price}</p>
                <p className="mt-2 text-sm text-steel">{plan.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-steel">
                  {plan.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-amber-400/30 bg-amber-400/10 p-6 text-sm text-steel">
            {settings.registrationNotice}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/register" fullWidth>
              Start Registration
            </Button>
            <Button href="/faq" variant="secondary" fullWidth>
              Registration FAQ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
