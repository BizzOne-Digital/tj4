import fs from "fs";
import path from "path";

const PUBLIC = path.join(process.cwd(), "public");
const DRIVE_ROOT = path.join(
  PUBLIC,
  "Central PA Lions AAU New Website -20260921T153347Z-1-001",
  "Central PA Lions AAU New Website"
);

const WEB_PUBLIC_PREFIX =
  "Central PA Lions AAU New Website -20260921T153347Z-1-001/Central PA Lions AAU New Website";

const IMAGE_EXT = /\.(jpe?g|png|gif|webp)$/i;

function toPublicUrl(relativeFromSite: string): string {
  const segments = [WEB_PUBLIC_PREFIX, ...relativeFromSite.split(/[/\\]/).filter(Boolean)];
  return "/" + segments.map((s) => encodeURIComponent(s)).join("/");
}

function listFiles(dir: string, relative = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = relative ? `${relative}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, rel));
    else out.push(rel.replace(/\\/g, "/"));
  }
  return out;
}

function allImagesUnder(relativeFolder: string): string[] {
  return listFiles(path.join(DRIVE_ROOT, relativeFolder), relativeFolder)
    .filter((f) => IMAGE_EXT.test(f))
    .map((f) => toPublicUrl(f));
}

const imagesIn = allImagesUnder;

const SEASON_MAP: Record<string, string> = {
  "2020-21": "MEET THE LIONS/2020-21 Season",
  "2021-22": "MEET THE LIONS/2021-2022 Season",
  "2022-23": "MEET THE LIONS/2022-23 Season",
  "2023-24": "MEET THE LIONS/2023-24 Season",
  "2024-25": "MEET THE LIONS/2024-25 Season",
  "2025-26": "MEET THE LIONS/2025-26 Season",
};

function coachPoster(folder: string): string | undefined {
  const imgs = imagesIn(`MEET THE COACHES/${folder}`);
  return imgs[0];
}

const meetTheLions: Record<string, { cover: string; images: string[] }> = {};
for (const [slug, folder] of Object.entries(SEASON_MAP)) {
  const images = imagesIn(folder);
  meetTheLions[slug] = {
    cover: images[0] ?? "",
    images,
  };
}

const mainImages = imagesIn("MAIN PAGE TAB FOLDER-PICTURES & VIDEOS");
const teamWelcome = imagesIn("Team Pictures/2025 Season");

const manifest = {
  welcomeHero:
    teamWelcome[0] ??
    mainImages[0] ??
    toPublicUrl("MAIN PAGE TAB FOLDER-PICTURES & VIDEOS/IMG_5423.jpg"),
  mainPage: { images: mainImages },
  coaches: {
    "TJ Anderson": coachPoster("Tj Anderson"),
    "Shane Kelly": coachPoster("Shane Kelly"),
    "Bryan Kulick": coachPoster("BRYAN KULICK"),
    "Brandon Myers": coachPoster("Brandon Myers"),
    "Tim Mills": coachPoster("Tim Mills"),
  },
  gear: imagesIn("GEAR STORE"),
  cashBash: imagesIn("CASH BASH"),
  pick3: imagesIn("PICK 3 LOTTERY"),
  alumni: imagesIn("ALUMNI"),
  articles: imagesIn("Articles through the years"),
  championships: {
    "2023": allImagesUnder("2023 Championship Teams"),
    "2024": allImagesUnder("2024 Championship Teams"),
    "2025": allImagesUnder("2025 Championship Teams"),
    "2026": allImagesUnder("2026 Championship Teams"),
  },
  meetTheLions,
};

const outPath = path.join(process.cwd(), "lib", "data", "drive-manifest.json");
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
console.log("Wrote", outPath);
console.log("Meet the Lions seasons:", Object.keys(meetTheLions).map((k) => `${k}: ${meetTheLions[k].images.length} imgs`));
