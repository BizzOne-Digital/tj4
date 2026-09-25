"use client";

import type { ISiteSettings } from "@/models/schemas";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils/cn";

export function PublicHeader({ settings }: { settings: ISiteSettings }) {
  const showAnnouncement = Boolean(settings.announcementBar?.enabled && settings.announcementBar.text);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full",
        showAnnouncement ? "public-header-with-bar" : "public-header-nav-only"
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <AnnouncementBar settings={settings} />
      <Navbar settings={settings} embedded />
    </div>
  );
}
