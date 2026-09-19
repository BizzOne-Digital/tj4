import type { ISiteSettings } from "@/models/schemas";

export function headerOffsetClass(settings: ISiteSettings) {
  const showAnnouncement = Boolean(settings.announcementBar?.enabled && settings.announcementBar.text);
  return showAnnouncement
    ? "pt-[var(--header-h-with-bar)] [--header-offset:var(--header-h-with-bar)]"
    : "pt-[var(--header-h-nav)] [--header-offset:var(--header-h-nav)]";
}
