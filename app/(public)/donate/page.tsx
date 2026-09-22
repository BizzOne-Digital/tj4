import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { Button } from "@/components/ui/Button";
import { donatePageCopy, SQUARE_SITE_URL } from "@/lib/content/lions-copy";
import { drivePageHero } from "@/lib/images/drive-page-heroes";

export const metadata: Metadata = {
  title: "Donate",
  description: donatePageCopy.intro,
};

function formatLevel(amount: number): string {
  return amount >= 1000 ? `$${amount.toLocaleString("en-US")}.00` : `$${amount}.00`;
}

export default function DonatePage() {
  const copy = donatePageCopy;

  return (
    <>
      <InnerHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.intro}
        image={drivePageHero("donate")}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-8 page-x text-steel">
          <p className="leading-relaxed">{copy.intro}</p>

          <p className="text-sm leading-relaxed">
            {copy.sponsorshipNote.split("contact@centralpalions.com")[0]}
            <a href="mailto:contact@centralpalions.com" className="text-electric hover:underline">
              contact@centralpalions.com
            </a>
            .
          </p>

          <div>
            <h2 className="text-xl uppercase text-white">{copy.levelsHeading}</h2>
            <ul className="mt-4 space-y-2">
              {copy.levels.map((amount) => (
                <li key={amount}>
                  •{" "}
                  <a
                    href={SQUARE_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric hover:underline"
                  >
                    {formatLevel(amount)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
            {copy.levels.map((amount) => (
              <a
                key={`card-${amount}`}
                href={SQUARE_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[88px] flex-col items-center justify-center border border-white/10 p-4 text-center clip-angle hover:border-electric/40 sm:p-6"
              >
                <p className="text-3xl font-[family-name:var(--font-display)] sm:text-4xl">{formatLevel(amount)}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-steel">Donate</p>
              </a>
            ))}
          </div>

          <p className="text-sm leading-relaxed">
            {copy.donationInstructionsBeforeSquare}{" "}
            <a
              href={SQUARE_SITE_URL}
              className="break-all text-electric hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://centralpalions.square.site/
            </a>
            {copy.donationInstructionsAfterSquare}
          </p>

          <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-charcoal/40 p-6 text-sm text-white">
            {copy.mailingAddress}
          </pre>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={SQUARE_SITE_URL} fullWidth>
              Secure Online Donation
            </Button>
            <Button href="/contact" variant="secondary" fullWidth>
              Corporate Sponsorships
            </Button>
          </div>

          <p className="text-center text-lg text-white">{copy.thankYou}</p>
        </div>
      </section>
    </>
  );
}
