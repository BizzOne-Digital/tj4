import type { Metadata } from "next";
import { HeroHome } from "@/components/sections/HeroHome";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProgramsPreview } from "@/components/sections/ProgramsPreview";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { MissionBlock } from "@/components/sections/InnerHero";
import { HomeWelcomeMedia } from "@/components/sections/HomeWelcomeMedia";
import { Button } from "@/components/ui/Button";
import {
  getSiteSettings,
  getPrograms,
  getEvents,
  getAchievements,
  getCoaches,
  getTestimonials,
  getPricingPlans,
  getBlogPosts,
  getSponsors,
} from "@/lib/data/queries";
import Link from "next/link";
import Image from "next/image";
import { PosterPhoto } from "@/components/ui/PersonPhoto";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { siteImages } from "@/lib/data/site-images";
import { SectionBackdrop } from "@/components/sections/SectionImagery";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Build the next generation of Lions with Central PA's premier youth basketball academy.",
};

export default async function HomePage() {
  const settings = await getSiteSettings();
  const programs = await getPrograms();
  const events = await getEvents();
  const achievements = await getAchievements();
  const coaches = await getCoaches().then((c) => c.slice(0, 3));
  const testimonials = await getTestimonials().then((t) => t.filter((x) => x.featured));
  const pricing = await getPricingPlans();
  const posts = await getBlogPosts().then((p) => p.slice(0, 2));
  const sponsors = await getSponsors();

  const ticker = achievements.map((a) => a.title);

  return (
    <>
      <HeroHome settings={settings} />
      <MarqueeTicker items={ticker.length ? ticker : ["Attitude & Effort", "Central PA Lions", "One Team One Goal"]} />
      <StatsSection stats={settings.stats || []} />
      <MissionBlock settings={settings} />
      <HomeWelcomeMedia />

      <SectionBackdrop src={siteImages.trainingCourt} alt="Lions training on court" className="border-y border-white/10 section-y">
        <div className="relative mx-auto max-w-7xl page-x">
          <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">Why Choose the Lions</p>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl">Development With Purpose</h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {[
              {
                title: "Fundamentals First",
                copy: "Skill development rooted in basketball IQ, footwork, and decision-making.",
              },
              {
                title: "Character Matters",
                copy: "Attitude & effort. Leading by example on and off the court.",
              },
              {
                title: "Competitive Culture",
                copy: "Prepare intensely, compete with class, and respect the game.",
              },
            ].map((item) => (
              <div key={item.title} className="gradient-card p-6 clip-angle">
                <h3 className="text-xl uppercase sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm text-steel">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionBackdrop>

      <ProgramsPreview programs={programs} />

      <section className="section-clip relative section-gradient-a section-y">
        <div className="relative mx-auto max-w-7xl page-x">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="gradient-card border-electric/30 p-5 clip-angle glow-blue sm:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-electric">Tryouts & Events</p>
              <h2 className="mt-2 text-3xl">Upcoming Lions Events</h2>
              <ul className="mt-6 space-y-4">
                {events.map((event) => (
                  <li key={event.slug} className="border-b border-white/10 pb-4">
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-steel">{event.description}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/register" fullWidth>
                  Register for Tryouts
                </Button>
              </div>
            </div>
            <div className="relative min-h-[240px] overflow-hidden clip-angle ring-1 ring-electric/30 sm:min-h-[320px]">
              <Image src={siteImages.shootingMachine} alt="Lions skill development" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-electric/10" />
            </div>
          </div>
        </div>
      </section>

      <SectionBackdrop src={siteImages.lockerRoom} alt="Lions team locker room" className="section-y court-lines">
        <div className="relative mx-auto max-w-7xl page-x">
          <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">Coaching Staff</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Meet the Pride</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {coaches.map((coach) => (
              <div key={coach.name} className="glass-panel overflow-hidden">
                {coach.photo && (
                  <PosterPhoto
                    src={coach.photo}
                    alt={coach.photoAlt || coach.name}
                    frameClassName="rounded-none ring-0"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl uppercase sm:text-2xl">{coach.name}</h3>
                  <p className="text-sm text-electric">{coach.title}</p>
                  <p className="mt-3 text-sm text-steel line-clamp-4">{coach.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/team" variant="secondary" fullWidth>
              View Full Team
            </Button>
          </div>
        </div>
      </SectionBackdrop>

      <SectionBackdrop src={siteImages.benchGear} alt="Lions game day preparation" className="section-y">
        <div className="relative mx-auto max-w-7xl page-x">
          <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">Testimonials</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Lions Families Speak</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.name + t.content.slice(0, 12)} className="gradient-card p-6">
                <p className="text-steel">&ldquo;{t.content}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold">
                  {t.name} · {t.relationship}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </SectionBackdrop>

      <SectionBackdrop src={siteImages.achievements} alt="Lions achievements" className="border-y border-electric/15 section-y">
        <div className="relative mx-auto max-w-7xl page-x">
          <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">Registration Fees</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Invest In Development</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricing.map((plan, i) => (
              <div
                key={plan.name}
                className={`p-6 text-center clip-angle gradient-card ${i === 1 ? "ring-1 ring-electric/50 glow-blue" : ""}`}
              >
                <p className="text-sm uppercase tracking-widest text-steel">{plan.name}</p>
                <p className="mt-2 text-3xl font-[family-name:var(--font-display)] text-gradient-electric sm:text-5xl">${plan.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-steel">{settings.registrationNotice}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/pricing" fullWidth>
              View Pricing Details
            </Button>
            <Button href="/register" variant="secondary" fullWidth>
              Start Registration
            </Button>
          </div>
        </div>
      </SectionBackdrop>

      <SectionBackdrop src={siteImages.arenaTunnel} alt="Walk onto the court with the Lions" className="section-y">
        <div className="relative mx-auto max-w-7xl page-x">
          <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">News</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Latest Updates</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="block gradient-card p-6">
                <h3 className="text-xl uppercase sm:text-2xl">{post.title}</h3>
                <p className="mt-2 text-sm text-steel">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionBackdrop>

      {sponsors.length > 0 && (
        <section className="border-t border-white/10 py-12">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 opacity-80">
            {sponsors.map((s) => (
              <span key={s.name} className="text-sm uppercase tracking-widest text-steel">
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="section-clip relative border-t border-electric/20 bg-gradient-to-br from-navy/30 via-midnight to-electric/10 py-12 sm:py-16">
        <div className="relative mx-auto max-w-7xl page-x">
          <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">Newsletter</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">Stay In The Pride</h2>
          <div className="mt-6">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            name: settings.siteName,
            url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            sport: "Basketball",
            areaServed: settings.contact.serviceArea,
            email: settings.contact.email,
            telephone: settings.contact.phone,
          }),
        }}
      />

      <section className="section-clip relative overflow-hidden py-16 sm:py-24">
        <Image src={siteImages.achievements} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/75 to-electric/25" />
        <div className="mesh-orb left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 bg-electric/20 sm:h-[500px] sm:w-[500px]" />
        <div className="relative mx-auto max-w-4xl page-x text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl">Ready to Join the Pride?</h2>
          <p className="mt-4 text-base text-steel sm:text-lg">{settings.motto}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="/register" fullWidth>
              Register Now
            </Button>
            <Button href="/contact" variant="secondary" fullWidth>
              Contact Coaches
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
