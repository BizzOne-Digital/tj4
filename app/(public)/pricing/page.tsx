import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { Button } from "@/components/ui/Button";
import { pricingPageCopy, SQUARE_SITE_URL } from "@/lib/content/lions-copy";
import { drivePageHero } from "@/lib/images/drive-page-heroes";

export const metadata: Metadata = {
  title: "Program Fees",
  description: pricingPageCopy.subtitle,
};

export default function PricingPage() {
  const copy = pricingPageCopy;

  return (
    <>
      <InnerHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.subtitle}
        image={drivePageHero("pricing")}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-8 page-x text-steel">
          <div>
            <h2 className="text-2xl uppercase text-white">{copy.eyebrow}</h2>
            <p className="mt-2 text-base">{copy.subtitle}</p>
          </div>

          <div>
            <p className="text-base">{copy.feesHeading}</p>
            <ul className="mt-4 space-y-2">
              {copy.fees.map((fee) => (
                <li key={fee}>• {fee}</li>
              ))}
            </ul>
            {copy.saleNote ? <p className="mt-4 text-sm text-white">{copy.saleNote}</p> : null}
            {copy.priceGuarantee ? (
              <p className="mt-2 text-sm text-steel">{copy.priceGuarantee}</p>
            ) : null}
          </div>

          <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-charcoal/40 p-4 text-sm text-white">
            {copy.mailingAddress}
          </pre>

          <p className="text-sm leading-relaxed">
            {copy.paymentParagraphBeforeSquare}
            <a
              href={SQUARE_SITE_URL}
              className="text-electric hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://centralpalions.square.site/
            </a>
            {copy.paymentParagraphAfterSquare}
          </p>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
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
