import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { Button } from "@/components/ui/Button";
import {
  GOOGLE_SIGNUP_FORM_URL,
  MAILING_ADDRESS,
  SQUARE_SITE_URL,
} from "@/lib/content/lions-copy";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Tryouts",
  description: "Central PA Lions tryout dates, registration packets, and fees.",
};

export default function TryoutsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Tryouts"
        title="2026–2027 Tryout Information"
        description="Philipsburg-Osceola Middle School · 200 Short Street, Philipsburg, PA 16866"
        image={siteImages.shootingMachine}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-10 page-x text-steel">
          <div>
            <h2 className="text-xl uppercase text-white">Saturday, October 17, 2026</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• 8:00am–9:00am, Grades 3–6 (Boys)</li>
              <li>• 9:00am–10:30am, Grades 7–12 (Boys)</li>
              <li>• 11:00am–12:00pm, Grades 7–12 (Girls)</li>
              <li>• 12:00pm–1:00pm, Grades 3–6 (Girls)</li>
            </ul>
            <p className="mt-3 text-sm">
              <strong className="text-white">Note:</strong> Registration packet due by Saturday, October 4, 2026 for this
              tryout.
            </p>
          </div>
          <div>
            <h2 className="text-xl uppercase text-white">Sunday, February 14, 2027</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• 8:00am–9:00am, Grades 3–6 (Boys)</li>
              <li>• 9:00am–10:30am, Grades 7–12 (Boys)</li>
              <li>• 11:00am–12:00pm, Grades 7–12 (Girls)</li>
              <li>• 12:00pm–1:00pm, Grades 3–6 (Girls)</li>
            </ul>
            <p className="mt-3 text-sm">
              <strong className="text-white">Note:</strong> Registration packet due by Sunday, February 7, 2027.
            </p>
          </div>
          <div>
            <h2 className="text-lg uppercase text-white">Ways to Register</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                •{" "}
                <Link href="/register" className="text-electric">
                  2026–2027 Registration (online signups)
                </Link>
              </li>
              <li>• 2026–2027 Registration Packet (PDF) — contact staff for the latest file</li>
            </ul>
            <p className="mt-4 text-sm">
              All student-athletes must submit a copy of their birth certificate with registration. Returning athletes:
              email{" "}
              <a href="mailto:contact@centralpalions.com" className="text-electric">
                contact@centralpalions.com
              </a>{" "}
              to confirm we have your certificate on file.
            </p>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-charcoal/40 p-4 text-xs">
              {`Hard copy mail to:\nCentral PA Lions / 2024 Tournament Season\n7410 Sportsman Road\nAlexandria, PA 16611`}
            </pre>
          </div>
          <div>
            <h2 className="text-lg uppercase text-white">Fees</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• $400 (individual)</li>
              <li>• $700 (2 person family)</li>
              <li>• $1,050 (3 person family)</li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed">
              Fees are non-refundable, due upon enrollment, and no later than February 28, 2027. Fundraiser opt-out fee
              is $200. Pay at{" "}
              <a href={SQUARE_SITE_URL} className="text-electric" target="_blank" rel="noopener noreferrer">
                centralpalions.square.site
              </a>{" "}
              or mail a check payable to Central PA Lions to the address above.
            </p>
          </div>
          <div className="gradient-card p-6 clip-angle">
            <h2 className="text-lg uppercase text-white">To Try Out (member portal)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
              <li>Click &ldquo;Log In&rdquo; in the upper right corner of our page.</li>
              <li>Create an account.</li>
              <li>Wait for member approval from the site administrator.</li>
              <li>Once approved, access the necessary forms to try out.</li>
            </ol>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={GOOGLE_SIGNUP_FORM_URL} fullWidth>
              Open Signup Form
            </Button>
            <Button href="/pricing" variant="secondary" fullWidth>
              Program Fees
            </Button>
          </div>
          <pre className="whitespace-pre-wrap text-xs text-steel">{MAILING_ADDRESS}</pre>
        </div>
      </section>
    </>
  );
}
