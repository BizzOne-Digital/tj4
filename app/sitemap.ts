import type { MetadataRoute } from "next";
import { getBlogPosts, getPrograms } from "@/lib/data/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/pricing",
    "/register",
    "/team",
    "/meet-the-lions",
    "/gear",
    "/schedule",
    "/tryouts",
    "/championships",
    "/cash-bash",
    "/fundraising",
    "/articles",
    "/alumni",
    "/testimonials",
    "/news",
    "/faq",
    "/contact",
    "/donate",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 }));

  const programs = await getPrograms();
  const posts = await getBlogPosts();

  return [
    ...staticRoutes,
    ...programs.map((p) => ({ url: `${base}/programs/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${base}/news/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
