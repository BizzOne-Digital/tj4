import { readFileSync } from "fs";
import { resolve } from "path";
import { connectDB } from "../lib/db/mongodb";
import {
  SiteSettings,
  Coach,
  Event,
  Achievement,
  GalleryAlbum,
} from "../models/schemas";
import { defaultSiteSettings } from "../lib/data/defaults";
import {
  defaultCoaches,
  defaultEvents,
  defaultAchievements,
  defaultGalleryAlbums,
} from "../lib/data/seed-content";

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
    // .env.local optional for CI
  }
}

/** Updates client copy without wiping programs, testimonials, or admin settings images. */
async function main() {
  loadEnvLocal();
  await connectDB();

  const { _id, ...settingsDoc } = defaultSiteSettings;
  void _id;
  await SiteSettings.findOneAndUpdate(
    {},
    {
      $set: {
        siteName: settingsDoc.siteName,
        tagline: settingsDoc.tagline,
        motto: settingsDoc.motto,
        mission: settingsDoc.mission,
        vision: settingsDoc.vision,
        contact: settingsDoc.contact,
        donation: settingsDoc.donation,
        registrationDeadline: settingsDoc.registrationDeadline,
        registrationNotice: settingsDoc.registrationNotice,
        navigation: settingsDoc.navigation,
        footerColumns: settingsDoc.footerColumns,
      },
    },
    { upsert: true, new: true }
  );

  await Coach.deleteMany({});
  await Coach.insertMany(defaultCoaches);

  await Event.deleteMany({});
  await Event.insertMany(defaultEvents);

  await Achievement.deleteMany({});
  await Achievement.insertMany(defaultAchievements);

  await GalleryAlbum.deleteMany({});
  await GalleryAlbum.insertMany(defaultGalleryAlbums);

  console.log("Client content updated (coaches, events, achievements, gallery, site settings).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
