import { unstable_noStore as noStore } from "next/cache";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import {
  SiteSettings,
  Program,
  PricingPlan,
  Coach,
  Testimonial,
  BlogPost,
  BlogCategory,
  FAQ,
  FAQCategory,
  Event,
  Achievement,
  Sponsor,
  Page,
  PageSection,
  type ISiteSettings,
  type IProgram,
  type IPricingPlan,
  type ICoach,
  type ITestimonial,
  type IBlogPost,
  type IFAQ,
  type IEvent,
  type IAchievement,
  type ISponsor,
  type IPage,
  type IPageSection,
} from "@/models/schemas";
import { defaultSiteSettings } from "@/lib/data/defaults";
import {
  defaultPrograms,
  defaultPricing,
  defaultCoaches,
  defaultTestimonials,
  defaultBlogPosts,
  defaultFaqs,
  defaultEvents,
  defaultAchievements,
} from "@/lib/data/seed-content";

function lean<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

export async function getSiteSettings(): Promise<ISiteSettings> {
  noStore();
  if (!isDbConfigured()) return defaultSiteSettings;
  try {
    await connectDB();
    const doc = await SiteSettings.findOne().lean();
    if (!doc) return defaultSiteSettings;
    return lean<ISiteSettings>(doc);
  } catch {
    return defaultSiteSettings;
  }
}

export async function getPrograms(activeOnly = true): Promise<IProgram[]> {
  noStore();
  if (!isDbConfigured()) return defaultPrograms;
  try {
    await connectDB();
    const filter = activeOnly ? { active: true } : {};
    const docs = await Program.find(filter).sort({ order: 1 }).lean();
    return docs.length ? lean(docs) : defaultPrograms;
  } catch {
    return defaultPrograms;
  }
}

export async function getProgramBySlug(slug: string): Promise<IProgram | null> {
  noStore();
  if (!isDbConfigured()) {
    return defaultPrograms.find((p) => p.slug === slug) ?? null;
  }
  try {
    await connectDB();
    const doc = await Program.findOne({ slug }).lean();
    if (doc) return lean<IProgram>(doc);
    return defaultPrograms.find((p) => p.slug === slug) ?? null;
  } catch {
    return defaultPrograms.find((p) => p.slug === slug) ?? null;
  }
}

export async function getPricingPlans(): Promise<IPricingPlan[]> {
  noStore();
  if (!isDbConfigured()) return defaultPricing;
  try {
    await connectDB();
    const docs = await PricingPlan.find({ active: true }).sort({ order: 1 }).lean();
    return docs.length ? lean(docs) : defaultPricing;
  } catch {
    return defaultPricing;
  }
}

export async function getCoaches(): Promise<ICoach[]> {
  noStore();
  if (!isDbConfigured()) return defaultCoaches;
  try {
    await connectDB();
    const docs = await Coach.find({ published: true }).sort({ order: 1 }).lean();
    return docs.length ? lean(docs) : defaultCoaches;
  } catch {
    return defaultCoaches;
  }
}

export async function getTestimonials(approvedOnly = true): Promise<ITestimonial[]> {
  noStore();
  if (!isDbConfigured()) return defaultTestimonials;
  try {
    await connectDB();
    const filter = approvedOnly ? { approved: true } : {};
    const docs = await Testimonial.find(filter).sort({ order: 1 }).lean();
    return docs.length ? lean(docs) : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}

export async function getBlogPosts(): Promise<IBlogPost[]> {
  noStore();
  if (!isDbConfigured()) return defaultBlogPosts;
  try {
    await connectDB();
    const docs = await BlogPost.find({ published: true }).sort({ publishedAt: -1 }).lean();
    return docs.length ? lean(docs) : defaultBlogPosts;
  } catch {
    return defaultBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<IBlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getBlogCategories() {
  if (!isDbConfigured()) {
    return [
      { name: "Academy News", slug: "academy-news", order: 0 },
      { name: "Tryouts", slug: "tryouts", order: 1 },
    ];
  }
  try {
    await connectDB();
    return BlogCategory.find().sort({ order: 1 }).lean();
  } catch {
    return [];
  }
}

export async function getFaqs(): Promise<IFAQ[]> {
  noStore();
  if (!isDbConfigured()) return defaultFaqs;
  try {
    await connectDB();
    const docs = await FAQ.find({ visible: true }).sort({ order: 1 }).lean();
    return docs.length ? lean(docs) : defaultFaqs;
  } catch {
    return defaultFaqs;
  }
}

export async function getFaqCategories() {
  if (!isDbConfigured()) {
    return [
      { name: "Registration", slug: "registration", order: 0 },
      { name: "Eligibility", slug: "eligibility", order: 1 },
      { name: "Payments & Fees", slug: "payments", order: 2 },
      { name: "Programs & Teams", slug: "programs", order: 3 },
      { name: "Travel & Schedule", slug: "travel", order: 4 },
    ];
  }
  try {
    await connectDB();
    return FAQCategory.find().sort({ order: 1 }).lean();
  } catch {
    return [];
  }
}

export async function getEvents(): Promise<IEvent[]> {
  noStore();
  if (!isDbConfigured()) return defaultEvents;
  try {
    await connectDB();
    const docs = await Event.find({ published: true }).sort({ date: 1 }).lean();
    return docs.length ? lean(docs) : defaultEvents;
  } catch {
    return defaultEvents;
  }
}

export async function getAchievements(): Promise<IAchievement[]> {
  noStore();
  if (!isDbConfigured()) return defaultAchievements;
  try {
    await connectDB();
    const docs = await Achievement.find({ published: true }).sort({ order: 1 }).lean();
    return docs.length ? lean(docs) : defaultAchievements;
  } catch {
    return defaultAchievements;
  }
}

export async function getSponsors(): Promise<ISponsor[]> {
  noStore();
  if (!isDbConfigured()) return [];
  try {
    await connectDB();
    const docs = await Sponsor.find({ published: true }).sort({ order: 1 }).lean();
    return lean(docs);
  } catch {
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<IPage | null> {
  if (!isDbConfigured()) return null;
  try {
    await connectDB();
    const doc = await Page.findOne({ slug, published: true }).lean();
    return doc ? lean(doc) : null;
  } catch {
    return null;
  }
}

export async function getPageSections(pageSlug: string): Promise<IPageSection[]> {
  if (!isDbConfigured()) return [];
  try {
    await connectDB();
    const docs = await PageSection.find({ pageSlug, visible: true }).sort({ order: 1 }).lean();
    return lean(docs);
  } catch {
    return [];
  }
}

export async function getHomeSections(): Promise<IPageSection[]> {
  return getPageSections("home");
}
