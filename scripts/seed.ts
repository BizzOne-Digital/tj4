import { connectDB } from "../lib/db/mongodb";
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
  PageSection,
} from "../models/schemas";
import { defaultSiteSettings } from "../lib/data/defaults";
import {
  defaultPrograms,
  defaultPricing,
  defaultCoaches,
  defaultTestimonials,
  defaultBlogPosts,
  defaultFaqs,
  defaultEvents,
  defaultAchievements,
} from "../lib/data/seed-content";

async function main() {
  await connectDB();

  await SiteSettings.deleteMany({});
  const { _id, ...siteSettingsDoc } = defaultSiteSettings;
  void _id;
  await SiteSettings.create(siteSettingsDoc);

  await Program.deleteMany({});
  await Program.insertMany(defaultPrograms);

  await PricingPlan.deleteMany({});
  await PricingPlan.insertMany(defaultPricing);

  await Coach.deleteMany({});
  await Coach.insertMany(defaultCoaches);

  await Testimonial.deleteMany({});
  await Testimonial.insertMany(defaultTestimonials);

  await BlogCategory.deleteMany({});
  await BlogCategory.insertMany([
    { name: "Academy News", slug: "academy-news", order: 0 },
    { name: "Tryouts", slug: "tryouts", order: 1 },
    { name: "Player Development", slug: "player-development", order: 2 },
  ]);

  await BlogPost.deleteMany({});
  await BlogPost.insertMany(defaultBlogPosts);

  await FAQCategory.deleteMany({});
  await FAQCategory.insertMany([
    { name: "Registration", slug: "registration", order: 0 },
    { name: "Eligibility", slug: "eligibility", order: 1 },
    { name: "Payments & Fees", slug: "payments", order: 2 },
    { name: "Programs & Teams", slug: "programs", order: 3 },
    { name: "Travel & Schedule", slug: "travel", order: 4 },
  ]);

  await FAQ.deleteMany({});
  await FAQ.insertMany(defaultFaqs);

  await Event.deleteMany({});
  await Event.insertMany(defaultEvents);

  await Achievement.deleteMany({});
  await Achievement.insertMany(defaultAchievements);

  await PageSection.deleteMany({ pageSlug: "home" });
  await PageSection.insertMany([
    {
      pageSlug: "home",
      key: "intro",
      type: "text",
      title: "Academy Introduction",
      content:
        "TJ Anderson's Central PA Lions Academy develops student-athletes in grades K–12 through competitive basketball and character coaching.",
      order: 0,
      visible: true,
    },
  ]);

  console.log("Database seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
