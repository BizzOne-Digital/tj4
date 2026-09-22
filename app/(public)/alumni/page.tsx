import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { MediaPlaceholder } from "@/components/sections/MediaPlaceholder";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";
import { alumniPageCopy } from "@/lib/content/lions-copy";

export const metadata: Metadata = {
  title: "Alumni",
  description: alumniPageCopy.intro,
};

export default function AlumniPage() {
  const copy = alumniPageCopy;
  const heroImage = driveManifest.alumni[0] || siteImages.lockerRoom;

  return (
    <>
      <InnerHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.intro}
        image={heroImage}
      />
      <section className="section-y">
        <div className="mx-auto max-w-5xl space-y-10 page-x">
          <p className="text-center text-base leading-relaxed text-steel sm:text-lg">{copy.intro}</p>
          {driveManifest.alumni.length > 0 ? (
            <DriveImageGrid images={driveManifest.alumni} altPrefix="Lions alumni" />
          ) : (
            <MediaPlaceholder
              label="Alumni — add JPG/PNG to ALUMNI/PICTURES in Drive folder"
              aspect="video"
            />
          )}
        </div>
      </section>
    </>
  );
}
