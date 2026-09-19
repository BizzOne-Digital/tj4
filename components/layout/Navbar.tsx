"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import type { ISiteSettings } from "@/models/schemas";

export function Navbar({
  settings,
  embedded = false,
}: {
  settings: ISiteSettings;
  embedded?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = settings.navigation?.length
    ? settings.navigation
    : [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ];

  return (
    <>
      <header
        className={cn(
          "w-full transition-all duration-500",
          !embedded && "fixed inset-x-0 top-0 z-50",
          embedded && "relative"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2 transition-all duration-500 sm:px-4 sm:py-2.5 lg:px-8",
            scrolled || embedded
              ? "border-b border-electric/20 bg-gradient-to-r from-midnight/98 via-navy/95 to-midnight/98 backdrop-blur-xl"
              : "border-b border-white/10 bg-midnight/90 backdrop-blur-md md:rounded-none md:border-white/10",
            !embedded && !scrolled && "md:mt-2 md:rounded-2xl md:border md:border-white/10 md:glass-panel"
          )}
        >
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-[60%] sm:flex-initial sm:gap-3">
            <Image
              src="/images/logo.png"
              alt="Central PA Lions logo"
              width={56}
              height={56}
              className="h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12"
              priority
            />
            <div className="min-w-0 leading-none">
              <p className="truncate font-[family-name:var(--font-display)] text-sm tracking-wide text-white sm:text-lg">
                CENTRAL PA LIONS
              </p>
              <p className="truncate text-[9px] uppercase tracking-[0.15em] text-steel sm:text-[10px] sm:tracking-[0.25em]">
                Youth Basketball Academy
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-6 lg:flex">
            {nav.map((item) =>
              item.children?.length ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {moreOpen && (
                    <div className="absolute right-0 top-full pt-3">
                      <div className="min-w-[200px] rounded-xl border border-white/10 bg-charcoal/95 p-2 shadow-2xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-electric after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Button href="/register" variant="secondary">
              Register Now
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "touch-target inline-flex shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 lg:hidden",
              open && "border-electric/50 bg-electric/15"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} settings={settings} />
    </>
  );
}
