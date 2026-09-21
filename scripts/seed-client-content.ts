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

/** Updates client copy without wiping programs, testimonials, or admin settings images. */
async function main() {
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
