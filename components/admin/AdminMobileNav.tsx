"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { adminLinks } from "@/components/admin/AdminSidebar";

export function AdminMobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="touch-target inline-flex items-center justify-center rounded-lg border border-white/15 px-3 text-xs uppercase tracking-widest text-steel"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-midnight/80 backdrop-blur-sm"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed inset-x-0 top-[57px] z-50 max-h-[calc(100dvh-57px)] overflow-y-auto border-b border-white/10 bg-charcoal px-4 py-4 shadow-xl">
            <Link
              href="/"
              className="mb-4 block text-sm uppercase tracking-widest text-electric"
              onClick={() => setOpen(false)}
            >
              ← View Site
            </Link>
            <ul className="space-y-1 text-sm">
              {adminLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block min-h-[44px] rounded-lg px-3 py-2.5 text-steel hover:bg-white/5 hover:text-white",
                      pathname === link.href && "bg-electric/20 text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
