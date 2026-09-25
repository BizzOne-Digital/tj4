"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "@/components/layout/MobileMenu";
import type { ISiteSettings } from "@/models/schemas";
import { navigationForDesktopBar } from "@/lib/navigation/public-nav";

export function Navbar({
  settings,
  embedded = false,
}: {
  settings: ISiteSettings;
  embedded?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = navigationForDesktopBar(settings.navigation?.length ? settings.navigation : undefined);
  const navFallback = navigationForDesktopBar([
    { label: "About", href: "/about" },
    { label: "Join", href: "/register" },
  ]);
  const items = nav.length ? nav : navFallback;

  return (
    <>
      <header
        className={cn(
          "w-full transition-all duration-300",
          !embedded && "fixed inset-x-0 top-0 z-50",
          embedded && "relative"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-3 py-2 sm:px-5 lg:px-8",
            "border-b border-white/10 bg-midnight/95 backdrop-blur-md",
            scrolled && "shadow-lg shadow-black/20"
          )}
        >
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <Image
              src="/images/logo.png"
              alt="Central PA Lions logo"
              width={48}
              height={48}
              className="h-8 w-8 shrink-0 object-contain sm:h-10 sm:w-10"
              priority
            />
            <div className="hidden min-w-0 leading-tight xl:block">
              <p className="truncate font-[family-name:var(--font-display)] text-xs tracking-wide text-white lg:text-sm">
                CENTRAL PA LIONS
              </p>
              <p className="truncate text-[8px] uppercase tracking-[0.2em] text-steel lg:text-[9px]">
                {settings.tagline || settings.motto || "Youth Basketball Academy"}
              </p>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 lg:flex xl:gap-3">
            <nav className="flex max-w-[min(100%,52rem)] flex-wrap items-center justify-end gap-x-2 gap-y-1 xl:gap-x-3">
            {items.map((item) =>
              item.children?.length ? (
                <div
                  key={item.label}
                  className="relative shrink-0"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white xl:text-[11px] xl:tracking-[0.2em]"
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute left-1/2 top-full z-50 min-w-[220px] -translate-x-1/2 pt-2">
                      <div className="max-h-[min(70vh,420px)] overflow-y-auto rounded-lg border border-white/10 bg-charcoal/98 p-1.5 shadow-2xl">
                        {item.href && item.href !== "#" && (
                          <Link
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider text-electric hover:bg-white/5"
                          >
                            View all
                          </Link>
                        )}
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-white/85 hover:bg-white/5 hover:text-white"
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
                  className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-white lg:text-[10px] xl:tracking-[0.18em]"
                >
                  {item.label}
                </Link>
              )
            )}
            </nav>

            <Link
              href="/donate"
              className="inline-flex min-h-[36px] shrink-0 items-center justify-center rounded-full bg-sky-300 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-midnight transition hover:bg-sky-200 xl:px-5 xl:text-[11px] xl:tracking-[0.2em]"
            >
              Donate
            </Link>
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
