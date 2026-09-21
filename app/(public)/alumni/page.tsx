import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Central PA Lions alumni who played college athletics.",
};

export default function AlumniPage() {
  return (
    <>
      <InnerHero
        eyebrow="Alumni"
        title="Lions in College"
        description="Take a look at the alumnus from our program who played college athletics."
        image={driveManifest.alumni[0] || siteImages.lockerRoom}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-5xl page-x">
          <DriveImageGrid images={driveManifest.alumni} altPrefix="Lions alumni" />
        </div>
      </section>
    </>
  );
}
