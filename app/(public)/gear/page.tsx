import type { Metadata } from "next";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Gear Store",
  description: "Official Lions Basketball gear for the 2027 Summer season.",
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
        <div className="mx-auto max-w-3xl space-y-10 page-x">
          <p className="text-center text-base leading-relaxed text-steel sm:text-lg">
            Official Lions Basketball gear for the 2027 Summer season.
          </p>

          {driveManifest.gear.length > 0 && (
            <DriveImageGrid images={driveManifest.gear} altPrefix="Lions gear" columns="grid-cols-1 sm:grid-cols-2" />
          )}

          <div className="gradient-card p-8 text-center clip-angle sm:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-electric">Lions Basketball Gear</p>
            <h2 className="mt-3 text-2xl uppercase sm:text-3xl">Coming Soon</h2>
            <p className="mt-4 text-steel">Coming soon — link will be posted once available.</p>
          </div>
        </div>
      </section>
    </>
  );
}
