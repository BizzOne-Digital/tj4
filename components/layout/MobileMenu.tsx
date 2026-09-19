"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, ChevronDown, Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import type { ISiteSettings } from "@/models/schemas";

function useMobileNavStructure(settings: ISiteSettings) {
  return useMemo(() => {
    const nav = settings.navigation?.length
      ? settings.navigation
      : [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ];

    const primary: { label: string; href: string }[] = [];
    const moreSections: { title: string; links: { label: string; href: string }[] }[] = [];

    for (const item of nav) {
      if (item.children?.length) {
        moreSections.push({
          title: item.label,
          links: item.children.map((c) => ({ label: c.label, href: c.href })),
        });
        continue;
      }
      if (item.href && item.href !== "#") {
        primary.push({ label: item.label, href: item.href });
      }
    }

    return { primary, moreSections };
  }, [settings.navigation]);
}

function NavLink({
  href,
  label,
  active,
  onClose,
  size = "lg",
}: {
  href: string;
  label: string;
  active: boolean;
  onClose: () => void;
  size?: "lg" | "md";
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "flex min-h-[48px] items-center rounded-lg border-l-2 px-3 transition-colors",
        active
          ? "border-electric bg-electric/10 text-white"
          : "border-transparent text-white/90 hover:border-white/20 hover:bg-white/5",
        size === "lg"
          ? "text-xl font-[family-name:var(--font-display)] uppercase tracking-wide sm:text-2xl"
          : "text-base font-semibold uppercase tracking-wider"
      )}
    >
      {label}
    </Link>
  );
}

export function MobileMenu({
  open,
  onClose,
  settings,
}: {
  open: boolean;
  onClose: () => void;
  settings: ISiteSettings;
}) {
  const pathname = usePathname();
  const { primary, moreSections } = useMobileNavStructure(settings);
  const [moreOpen, setMoreOpen] = useState(true);
  const prevPath = useRef(pathname);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("mobile-nav-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("mobile-nav-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      onClose();
      prevPath.current = pathname;
    }
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-midnight/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[60] flex w-[min(100%,22rem)] max-w-full flex-col border-l border-white/10 bg-gradient-to-b from-charcoal via-midnight to-midnight shadow-2xl lg:hidden"
            style={{
              paddingTop: "max(env(safe-area-inset-top), 0px)",
              paddingBottom: "max(env(safe-area-inset-bottom), 0px)",
            }}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <Image src="/images/logo.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0" />
                <p className="truncate text-sm font-[family-name:var(--font-display)] uppercase tracking-wide">
                  Menu
                </p>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="touch-target inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-4">
              <nav className="flex flex-col gap-1">
                {primary.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={isActive(link.href)}
                    onClose={onClose}
                  />
                ))}

                {moreSections.map((section) => (
                  <div key={section.title} className="mt-2 border-t border-white/10 pt-3">
                    <button
                      type="button"
                      onClick={() => setMoreOpen((v) => !v)}
                      className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-electric"
                    >
                      {section.title}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", moreOpen && "rotate-180")} />
                    </button>
                    {moreOpen && (
                      <div className="mt-1 flex flex-col gap-0.5 pl-1">
                        {section.links.map((link) => (
                          <NavLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            active={isActive(link.href)}
                            onClose={onClose}
                            size="md"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-3">
                <Button href="/register" onClick={onClose} fullWidth>
                  Register Now
                </Button>
                <Button href="/donate" variant="secondary" onClick={onClose} fullWidth>
                  Support the Lions
                </Button>
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-steel">
                <a
                  href={`tel:${settings.contact.phone}`}
                  className="flex min-h-[44px] items-center gap-3 rounded-lg px-2 hover:bg-white/5 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-electric" />
                  {settings.contact.phone}
                </a>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="flex min-h-[44px] items-center gap-3 break-all rounded-lg px-2 hover:bg-white/5 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-electric" />
                  {settings.contact.email}
                </a>
                <div className="flex gap-2 pt-1">
                  {settings.social.facebook && (
                    <a
                      href={settings.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="touch-target inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {settings.social.instagram && (
                    <a
                      href={settings.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="touch-target inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {settings.social.twitter && (
                    <a
                      href={settings.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X"
                      className="touch-target inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
