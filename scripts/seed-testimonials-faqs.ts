import { readFileSync } from "fs";
import { resolve } from "path";
import { connectDB } from "../lib/db/mongodb";
import { Testimonial, FAQ, FAQCategory } from "../models/schemas";
import { defaultTestimonials, defaultFaqs } from "../lib/data/seed-content";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  try {
    const content = readFileSync(path, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* optional */
  }
}

const faqCategories = [
  { name: "Registration", slug: "registration", order: 0 },
  { name: "Eligibility", slug: "eligibility", order: 1 },
  { name: "Payments & Fees", slug: "payments", order: 2 },
  { name: "Programs & Teams", slug: "programs", order: 3 },
  { name: "Travel & Schedule", slug: "travel", order: 4 },
];

async function main() {
  loadEnvLocal();
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }
  await connectDB();

  await FAQCategory.deleteMany({});
  await FAQCategory.insertMany(faqCategories);

  await Testimonial.deleteMany({});
  await Testimonial.insertMany(defaultTestimonials);

  await FAQ.deleteMany({});
  await FAQ.insertMany(defaultFaqs);

  console.log(
    `Updated ${defaultTestimonials.length} testimonials and ${defaultFaqs.length} FAQs (site settings and programs unchanged).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
