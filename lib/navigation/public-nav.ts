import type { ISiteSettings } from "@/models/schemas";

/** Links that stay in More / mobile menu but not the compact desktop bar (Donate uses the CTA pill). */
const DESKTOP_BAR_EXCLUDED = new Set(["/donate", "/send-a-message", "/gear"]);

type NavItem = NonNullable<ISiteSettings["navigation"]>[number];

/** Keeps dropdown parents; drops crowded top-level links even if DB nav is outdated. */
export function navigationForDesktopBar(navigation: NavItem[] | undefined): NavItem[] {
  if (!navigation?.length) return [];

  return navigation.filter((item) => {
    if (item.children?.length) return true;
    if (!item.href || item.href === "#") return false;
    return !DESKTOP_BAR_EXCLUDED.has(item.href);
  });
}

export function navigationForMobilePrimary(navigation: NavItem[] | undefined) {
  if (!navigation?.length) {
    return {
      primary: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ],
      moreSections: [] as { title: string; links: { label: string; href: string }[] }[],
    };
  }

  const primary: { label: string; href: string }[] = [];
  const moreSections: { title: string; links: { label: string; href: string }[] }[] = [];

  for (const item of navigation) {
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
}
