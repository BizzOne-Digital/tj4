import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Gear Store",
  description: "Official Lions Basketball gear for the 2027 summer season.",
};

export default function GearPage() {
  return (
    <>
      <InnerHero
        eyebrow="Gear Store"
        title="Lions Basketball Gear"
        description="Official Lions Basketball gear for the 2027 Summer season."
        image={driveManifest.gear[0] || siteImages.benchGear}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-8 page-x text-center">
          <p className="text-lg text-steel">Coming soon — link will be posted once available.</p>
          <DriveImageGrid images={driveManifest.gear} altPrefix="Lions gear" columns="grid-cols-1 sm:grid-cols-2" />
        </div>
      </section>
    </>
  );
}
