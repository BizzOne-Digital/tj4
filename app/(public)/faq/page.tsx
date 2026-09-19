import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getFaqs } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Registration, travel teams, payments, and parent information.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <InnerHero eyebrow="FAQ" title="Answers For Lions Families" image={siteImages.shootingMachine} />
      <section className="section-y">
        <div className="mx-auto max-w-3xl page-x">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}
