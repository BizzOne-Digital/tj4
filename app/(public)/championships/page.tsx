import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { MediaPlaceholder } from "@/components/sections/MediaPlaceholder";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";
import { championshipSections, championshipsPageCopy } from "@/lib/content/lions-copy";

export const metadata: Metadata = {
  title: "Championship Teams",
  description: championshipsPageCopy.intro,
};

export default function ChampionshipsPage() {
  const copy = championshipsPageCopy;
  const hero =
    driveManifest.championships["2026"][0] ||
    driveManifest.championships["2023"][0] ||
    driveManifest.championships["2025"][0] ||
    siteImages.achievements;

  return (
    <>
      <InnerHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.intro}
        image={hero}
      />
      <section className="section-y">
        <div className="mx-auto max-w-5xl space-y-14 page-x">
          <p className="text-center text-base leading-relaxed text-steel sm:text-lg">{copy.intro}</p>

          {championshipSections.map(({ driveKey, title }) => {
            const images = driveManifest.championships[driveKey] ?? [];
            return (
              <div key={driveKey}>
                <h2 className="text-2xl uppercase">{title}</h2>
                <div className="mt-6">
                  {images.length > 0 ? (
                    <DriveImageGrid images={images} altPrefix={title} />
                  ) : (
                    <MediaPlaceholder label={`${title} — add pictures to Drive folder`} aspect="video" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
