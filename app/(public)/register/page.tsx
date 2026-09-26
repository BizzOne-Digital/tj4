import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { getPrograms, getSiteSettings } from "@/lib/data/queries";
import { drivePageHero } from "@/lib/images/drive-page-heroes";
import { GOOGLE_SIGNUP_FORM_URL, registrationPromoCopy, SQUARE_SITE_URL } from "@/lib/content/lions-copy";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Join Our Team",
  description: "Sign up for Central PA Lions basketball — Google Forms and academy registration.",
};

export default async function RegisterPage() {
  const [programs, settings] = await Promise.all([getPrograms(), getSiteSettings()]);

  return (
    <>
      <InnerHero
        eyebrow="Join Our Team"
        title="Sign Up for Central PA Lions Basketball"
        description="Ready to be a Lion? Complete the signup form for your program level."
        image={drivePageHero("register")}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-10 page-x">
          <div className="gradient-card border border-electric/30 p-6 clip-angle sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-electric">{registrationPromoCopy.headline}</p>
            <h2 className="mt-2 text-2xl uppercase">{registrationPromoCopy.tagline}</h2>
            <p className="mt-3 text-sm text-white">{registrationPromoCopy.salePricing}</p>
            <p className="mt-2 text-sm text-steel">{registrationPromoCopy.priceGuarantee}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button href={GOOGLE_SIGNUP_FORM_URL} fullWidth>
                Open Signup Form
              </Button>
              <Button href={SQUARE_SITE_URL} variant="secondary" fullWidth>
                Pay Online (Square)
              </Button>
            </div>
          </div>
          <div className="gradient-card p-6 clip-angle sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-electric">Central PA Lions Basketball Sign Ups</p>
            <h2 className="mt-2 text-2xl uppercase">AAU/Travel Team Registration</h2>
            <p className="mt-3 text-sm text-steel">
              AAU/Travel basketball registration for the Mountaineer program. The button below opens our official
              Google Form in a new tab—fill it out completely so our coaching staff has your information. Responses
              go to Google Forms (not this website); any confirmation email comes from Google only if that form is set
              up to send one.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={GOOGLE_SIGNUP_FORM_URL} fullWidth>
                Open Signup Form
              </Button>
              <Button href="/contact" variant="secondary" fullWidth>
                Questions About Signups
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-steel">
              Enrollment deadline: <strong className="text-white">{settings.registrationDeadline}</strong>
            </p>
            <p className="mt-2 text-sm text-steel">{settings.registrationNotice}</p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-electric">Academy inquiry form</p>
            <p className="mb-6 text-sm text-steel">
              Use this form if you want the academy to follow up about programs or have questions before signing up.
              Your answers are saved for our staff and we get an email notification—we do not send an automatic
              confirmation to your inbox. Someone from the academy will reach out using the phone or email you provide.
            </p>
            <RegistrationForm programs={programs} />
          </div>
          <p className="text-center text-sm text-steel">
            Prefer tryout details and packets? Visit{" "}
            <Link href="/tryouts" className="text-electric hover:text-white">
              Tryouts
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
