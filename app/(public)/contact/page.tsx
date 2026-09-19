import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact TJ Anderson and the Central PA Lions Academy staff.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <InnerHero
        eyebrow="Contact"
        title="Let's Connect"
        description={settings.contact.serviceArea}
        image={siteImages.courtCenter}
      />
      <section className="section-y">
        <div className="mx-auto grid max-w-7xl gap-10 page-x lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 space-y-4 text-steel">
            <p className="text-xl text-white sm:text-2xl">{settings.contact.name}</p>
            <p>
              Phone:{" "}
              <a href={`tel:${settings.contact.phone}`} className="text-electric">
                {settings.contact.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${settings.contact.email}`} className="text-electric">
                {settings.contact.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-3 pt-4 text-xs uppercase tracking-widest sm:gap-4 sm:text-sm">
              {settings.social.facebook && (
                <a href={settings.social.facebook} className="hover:text-white">
                  Facebook
                </a>
              )}
              {settings.social.instagram && (
                <a href={settings.social.instagram} className="hover:text-white">
                  Instagram
                </a>
              )}
              {settings.social.twitter && (
                <a href={settings.social.twitter} className="hover:text-white">
                  X
                </a>
              )}
            </div>
            {settings.contact.mapEmbedUrl ? (
              <iframe
                title="Academy location map"
                src={settings.contact.mapEmbedUrl}
                className="mt-8 h-64 w-full rounded-xl border border-white/10"
                loading="lazy"
              />
            ) : (
              <div className="mt-8 flex h-64 items-center justify-center rounded-xl border border-dashed border-white/20 text-sm">
                Map embed can be configured in admin settings.
              </div>
            )}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
