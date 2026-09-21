import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Championship Teams",
  description: "Central PA Lions championship teams through the years.",
};

const sections = [
  { year: "2023", title: "2023 Championship Teams" },
  { year: "2025", title: "2025 Championship Teams" },
  { year: "2026", title: "2026 Championship Teams" },
] as const;

export default function ChampionshipsPage() {
  const hero =
    driveManifest.championships["2026"][0] ||
    driveManifest.championships["2023"][0] ||
    siteImages.achievements;

  return (
    <>
      <InnerHero
        eyebrow="Championship Teams"
        title="Titles Through the Years"
        description="Take a look at the championship teams through the years."
        image={hero}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-5xl space-y-14 page-x">
          {sections.map(({ year, title }) => {
            const images = driveManifest.championships[year as keyof typeof driveManifest.championships] ?? [];
            return (
              <div key={year}>
                <h2 className="text-2xl uppercase">{title}</h2>
                <div className="mt-6">
                  <DriveImageGrid images={images} altPrefix={title} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
