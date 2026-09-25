import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { sendMessagePageCopy } from "@/lib/content/lions-copy";
import { drivePageHero } from "@/lib/images/drive-page-heroes";

export const metadata: Metadata = {
  title: "Send a Message",
  description: sendMessagePageCopy.description,
};

export default function SendMessagePage() {
  const copy = sendMessagePageCopy;

  return (
    <>
      <InnerHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        image={drivePageHero("contact")}
      />
      <section className="section-y">
        <div className="mx-auto max-w-2xl page-x">
          <p className="text-center text-xs uppercase tracking-[0.35em] text-electric">{copy.formIntro}</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-charcoal/40 p-6 sm:p-10">
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
