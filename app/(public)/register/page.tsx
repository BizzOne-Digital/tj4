import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { getPrograms, getSiteSettings } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Register",
  description: "Submit your Central PA Lions Academy registration inquiry.",
};

export default async function RegisterPage() {
  const [programs, settings] = await Promise.all([getPrograms(), getSiteSettings()]);

  return (
    <>
      <InnerHero
        eyebrow="Registration Inquiry"
        title="Join the Pride"
        description={`Enrollment deadline: ${settings.registrationDeadline}`}
        image={siteImages.shootingMachine}
      />
      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-3xl page-x">
          <RegistrationForm programs={programs} />
        </div>
      </section>
    </>
  );
}
