import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { Button } from "@/components/ui/Button";
import {
  GOOGLE_SIGNUP_FORM_URL,
  SQUARE_SITE_URL,
  tryoutSessions,
  tryoutsPageCopy,
} from "@/lib/content/lions-copy";
import { drivePageHero } from "@/lib/images/drive-page-heroes";

export const metadata: Metadata = {
  title: "Tryouts",
  description: tryoutsPageCopy.intro,
};

export default function TryoutsPage() {
  const copy = tryoutsPageCopy;

  return (
    <>
      <InnerHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.location}
        image={drivePageHero("tryouts")}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-10 page-x text-steel">
          <p className="text-base text-white">{copy.intro}</p>

          {tryoutSessions.map((session) => (
            <div key={session.date}>
              <h2 className="text-xl uppercase text-white">{session.date}</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {session.slots.map((slot) => (
                  <li key={slot}>• {slot}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm">
                <strong className="text-white">***Note:</strong> {session.registrationDue}
              </p>
            </div>
          ))}

          <p className="text-sm leading-relaxed">{copy.location}</p>

          <div>
            <h2 className="text-lg uppercase text-white">{copy.registrationHeading}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                •{" "}
                <Link href="/register" className="text-electric hover:underline">
                  2026-2027 Registration Packet (online signups)
                </Link>
              </li>
              <li>
                •{" "}
                <Link href="/contact" className="text-electric hover:underline">
                  2026-2027 Registration Packet (pdf)
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed">
              <strong className="text-white">***Note:</strong> {copy.birthCertificateNote}
            </p>
            <p className="mt-4 text-sm">{copy.hardCopyIntro}</p>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-charcoal/40 p-4 text-xs text-white">
              {copy.hardCopyAddress}
            </pre>
          </div>

          <div>
            <h2 className="text-lg uppercase text-white">{copy.feesHeading}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {copy.fees.map((fee) => (
                <li key={fee}>• {fee}</li>
              ))}
            </ul>
            {copy.saleNote ? (
              <p className="mt-4 text-sm text-white">{copy.saleNote}</p>
            ) : null}
            {copy.priceGuarantee ? (
              <p className="mt-2 text-sm text-steel">{copy.priceGuarantee}</p>
            ) : null}
            <p className="mt-4 text-sm leading-relaxed">
              {copy.feesParagraphBeforeSquare}
              <a
                href={SQUARE_SITE_URL}
                className="text-electric hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://centralpalions.square.site/
              </a>
              {copy.feesParagraphAfterSquare}
            </p>
          </div>

          <div className="gradient-card p-6 clip-angle">
            <h2 className="text-lg uppercase text-white">{copy.portalHeading}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {copy.portalSteps.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={GOOGLE_SIGNUP_FORM_URL} fullWidth>
              Open Signup Form
            </Button>
            <Button href="/pricing" variant="secondary" fullWidth>
              Program Fees
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
