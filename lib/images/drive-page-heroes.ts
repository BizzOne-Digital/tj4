import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";

const mainImages = driveManifest.mainPage?.images ?? [];

/** Main page tab folder image by index, with welcome hero fallback. */
export function driveMainImage(index: number): string {
  return mainImages[index] ?? driveManifest.welcomeHero ?? siteImages.hero;
}

function firstDefined(...urls: (string | undefined | null)[]): string {
  for (const url of urls) {
    if (url) return url;
  }
  return driveManifest.welcomeHero || mainImages[0] || siteImages.hero;
}

export type DrivePageHeroKey =
  | "about"
  | "programs"
  | "register"
  | "tryouts"
  | "schedule"
  | "pricing"
  | "contact"
  | "donate"
  | "news"
  | "faq"
  | "testimonials"
  | "privacy"
  | "terms"
  | "fundraising"
  | "articles";

/** Drive-backed hero for pages without a dedicated content folder. */
export function drivePageHero(key: DrivePageHeroKey): string {
  switch (key) {
    case "fundraising":
      return firstDefined(driveManifest.cashBash[0], driveMainImage(9));
    case "articles":
      return firstDefined(driveManifest.articles[0], driveMainImage(10));
    case "donate":
      return firstDefined(
        driveManifest.alumni[0],
        driveManifest.championships["2023"]?.[0],
        driveMainImage(8)
      );
    case "about":
      return driveMainImage(0);
    case "programs":
      return driveMainImage(1);
    case "register":
    case "tryouts":
      return driveMainImage(2);
    case "schedule":
      return driveMainImage(3);
    case "pricing":
      return driveMainImage(4);
    case "contact":
      return driveMainImage(5);
    case "news":
      return driveMainImage(6);
    case "faq":
      return driveMainImage(7);
    case "testimonials":
      return firstDefined(driveManifest.alumni[2], driveMainImage(8));
    case "privacy":
    case "terms":
      return driveMainImage(11);
    default:
      return driveManifest.welcomeHero || siteImages.hero;
  }
}
