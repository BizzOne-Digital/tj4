import { revalidatePath, revalidateTag } from "next/cache";

/** Shared tag for CMS-backed public content (optional future use with unstable_cache). */
export const SITE_CONTENT_TAG = "site-content";

const PUBLIC_PATHS = [
  "/",
  "/about",
  "/programs",
  "/pricing",
  "/team",
  "/contact",
  "/register",
  "/donate",
  "/faq",
  "/news",
  "/testimonials",
  "/privacy",
  "/terms",
] as const;

export function revalidatePublicSite(options?: { programSlug?: string; blogSlug?: string }) {
  revalidateTag(SITE_CONTENT_TAG);
  revalidatePath("/", "layout");

  for (const path of PUBLIC_PATHS) {
    revalidatePath(path);
  }

  if (options?.programSlug) {
    revalidatePath(`/programs/${options.programSlug}`);
  }

  if (options?.blogSlug) {
    revalidatePath(`/news/${options.blogSlug}`);
  }
}
