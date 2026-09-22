import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { getTestimonials } from "@/lib/data/queries";
import { drivePageHero } from "@/lib/images/drive-page-heroes";
import { TestimonialSubmitForm } from "@/components/forms/TestimonialSubmitForm";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Stories from Central PA Lions families and athletes.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <InnerHero eyebrow="Testimonials" title="Voices of the Pride" image={drivePageHero("testimonials")} imageFit="contain" />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.content.slice(0, 24)} className="border border-white/10 p-5 sm:p-6">
                <p className="text-base text-steel sm:text-lg">&ldquo;{t.content}&rdquo;</p>
                <footer className="mt-4 text-sm">
                  {t.name} · {t.relationship} · {"★".repeat(t.rating)}
                </footer>
              </blockquote>
            ))}
          </div>
          <TestimonialSubmitForm />
        </div>
      </section>
    </>
  );
}
