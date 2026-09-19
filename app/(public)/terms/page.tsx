import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { getSiteSettings } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <InnerHero title="Terms & Conditions" image={siteImages.trainingCourt} />
      <section className="mx-auto max-w-3xl space-y-4 page-x section-y text-steel">
        <p>
          Enrollment in {settings.siteName} programs constitutes agreement to academy policies, codes of conduct, and
          payment terms communicated during registration.
        </p>
        <p>{settings.registrationNotice}</p>
        <p>Athletes and families agree to represent the program with class on and off the court.</p>
      </section>
    </>
  );
}
