import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import type { ISiteSettings } from "@/models/schemas";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-steel transition-all duration-300 hover:border-electric/50 hover:bg-electric/15 hover:text-white hover:shadow-[0_0_24px_rgba(36,54,216,0.35)]"
    >
      {children}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-sm text-steel transition-colors hover:text-white"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-electric transition-all duration-300 group-hover:w-full" />
      </span>
    </Link>
  );
}

export function Footer({ settings }: { settings: ISiteSettings }) {
  const columns = settings.footerColumns?.length
    ? settings.footerColumns
    : [
        {
          title: "Academy",
          links: [
            { label: "About", href: "/about" },
            { label: "Programs", href: "/programs" },
          ],
        },
      ];

  return (
    <footer className="relative overflow-hidden bg-ink">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-electric to-transparent opacity-80" />
      <div className="absolute inset-0 court-lines opacity-[0.15]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-electric/10 blur-[100px] sm:-left-32 sm:h-64 sm:w-64" />
        <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-navy/40 blur-[100px] sm:-right-32 sm:h-64 sm:w-64" />
      </div>

      {/* CTA band */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-6 px-4 py-8 sm:py-10 lg:flex-row lg:items-center lg:px-8">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.35em]">
              Join the pride
            </p>
            <p className="mt-2 break-words font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide sm:text-3xl md:text-4xl">
              {settings.motto}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href="/register"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-electric px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-electric/90 glow-blue clip-angle sm:w-auto sm:text-sm"
            >
              Register Now
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/donate"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-white/25 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/50 hover:bg-white/10 clip-angle sm:w-auto sm:text-sm"
            >
              Support the Lions
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="min-w-0 lg:col-span-4">
            <Link href="/" className="inline-flex max-w-full items-center gap-3 sm:gap-4">
              <div className="relative rounded-xl border border-white/10 bg-midnight/80 p-2 shadow-[0_0_40px_rgba(16,23,111,0.4)]">
                <Image src="/images/logo.png" alt="Central PA Lions" width={64} height={64} className="h-14 w-14 object-contain" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg leading-tight tracking-wide text-white sm:text-xl">
                  CENTRAL PA LIONS
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-steel">Youth Basketball Academy</p>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel">{settings.tagline}</p>
            <p className="mt-4 hidden text-xs leading-relaxed text-white/50 sm:block">{settings.mission.slice(0, 140)}…</p>
            <div className="mt-8 flex gap-3">
              {settings.social.facebook && (
                <SocialIcon href={settings.social.facebook} label="Facebook">
                  <Facebook className="h-5 w-5" />
                </SocialIcon>
              )}
              {settings.social.instagram && (
                <SocialIcon href={settings.social.instagram} label="Instagram">
                  <Instagram className="h-5 w-5" />
                </SocialIcon>
              )}
              {settings.social.twitter && (
                <SocialIcon href={settings.social.twitter} label="X / Twitter">
                  <Twitter className="h-5 w-5" />
                </SocialIcon>
              )}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <FooterLink href="/faq">FAQ</FooterLink>
                </li>
                <li>
                  <FooterLink href="/testimonials">Testimonials</FooterLink>
                </li>
                <li>
                  <FooterLink href="/news">News</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact</FooterLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-navy/40 to-charcoal/80 p-6 backdrop-blur-sm clip-angle">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">Get in touch</h3>
              <p className="mt-4 font-[family-name:var(--font-display)] text-2xl uppercase">{settings.contact.name}</p>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href={`tel:${settings.contact.phone}`}
                    className="flex items-start gap-3 text-sm text-steel transition hover:text-white"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric/15 text-electric">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-widest text-white/40">Phone</span>
                      {settings.contact.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="flex items-start gap-3 text-sm text-steel transition hover:text-white"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric/15 text-electric">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="break-all">
                      <span className="block text-[10px] uppercase tracking-widest text-white/40">Email</span>
                      {settings.contact.email}
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-steel">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric/15 text-electric">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/40">Service area</span>
                    {settings.contact.serviceArea}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-midnight/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-steel sm:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 uppercase tracking-widest">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/admin/login" className="transition hover:text-white/60">
              Staff
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
