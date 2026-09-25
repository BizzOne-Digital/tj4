import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { drivePageHero } from "@/lib/images/drive-page-heroes";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <InnerHero
        title="Privacy Policy"
        description="How Central PA Lions Academy handles your information."
        image={drivePageHero("privacy")}
      />
      <section className="prose prose-invert mx-auto max-w-3xl page-x section-y text-steel">
        <p>
          We collect information you submit through registration, contact, newsletter, and testimonial forms to
          communicate about programs and academy operations. We do not sell personal information. Data is stored securely
          and accessed only by authorized staff.
        </p>
        <p>
          For questions about your data, contact{" "}
          <a href="mailto:tjandersty@gmail.com" className="text-electric">
            tjandersty@gmail.com
          </a>
          .
        </p>
      </section>
    </>
  );
}
