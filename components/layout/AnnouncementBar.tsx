"use client";

import Link from "next/link";
import type { ISiteSettings } from "@/models/schemas";

export function AnnouncementBar({ settings }: { settings: ISiteSettings }) {
  if (!settings.announcementBar?.enabled || !settings.announcementBar.text) return null;

  const content = (
    <span className="text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/90 sm:text-xs sm:tracking-[0.2em]">
      {settings.announcementBar.text}
    </span>
  );

  return (
    <div className="relative border-b border-white/10 bg-midnight px-2 py-2 text-center sm:px-4">
        {settings.announcementBar.link ? (
          <Link href={settings.announcementBar.link} className="block hover:text-electric transition-colors">
            {content}
          </Link>
        ) : (
          content
        )}
    </div>
  );
}
