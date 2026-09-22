import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactUsPageCopy } from "@/lib/content/lions-copy";
import { drivePageHero } from "@/lib/images/drive-page-heroes";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactUsPageCopy.intro,
};

export default function ContactPage() {
  const copy = contactUsPageCopy;

  return (
    <>
      <InnerHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.intro}
        image={drivePageHero("contact")}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto grid max-w-7xl gap-10 page-x lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 space-y-6 text-steel lg:order-1">
            <p className="text-base leading-relaxed sm:text-lg">{copy.intro}</p>
            <div className="space-y-2 text-base">
              <p>
                <span className="font-semibold text-white">{copy.emailLabel}</span>
                <br />
                <a href={`mailto:${copy.email}`} className="text-electric hover:underline">
                  {copy.email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">{copy.phoneLabel}</span>{" "}
                <a href={`tel:${copy.phone.replace(/-/g, "")}`} className="text-electric hover:underline">
                  {copy.phone}
                </a>
              </p>
            </div>
          </div>
          <div className="min-w-0 lg:order-2">
            <ContactForm
              showInquiryType={false}
              submitLabel={copy.submitLabel}
              placeholders={copy.placeholders}
            />
          </div>
        </div>
      </section>
    </>
  );
}
