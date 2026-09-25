/**
 * Converts HEIC files in Articles through the years → JPG (web-safe, committable).
 * Run: npx tsx scripts/convert-articles-heic.ts
 */
import fs from "fs";
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const convert = require("heic-convert");

const ARTICLES_DIR = path.join(
  process.cwd(),
  "public",
  "Central PA Lions AAU New Website -20260921T153347Z-1-001",
  "Central PA Lions AAU New Website",
  "Articles through the years",
  "PICTURES"
);

async function main() {
  const sourceDir = path.dirname(ARTICLES_DIR);
  if (!fs.existsSync(sourceDir)) {
    console.error("Articles folder not found:", sourceDir);
    process.exit(1);
  }

  fs.mkdirSync(ARTICLES_DIR, { recursive: true });

  const heicFiles = fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.heic$/i.test(e.name))
    .map((e) => e.name);

  if (!heicFiles.length) {
    console.log("No HEIC files in", sourceDir);
    return;
  }

  for (const name of heicFiles) {
    const base = name.replace(/\.heic$/i, "");
    const outPath = path.join(ARTICLES_DIR, `${base}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log("Skip (exists):", outPath);
      continue;
    }
    const input = fs.readFileSync(path.join(sourceDir, name));
    const output = await convert({
      buffer: input,
      format: "JPEG",
      quality: 0.92,
    });
    fs.writeFileSync(outPath, Buffer.from(output));
    console.log("Wrote", outPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
