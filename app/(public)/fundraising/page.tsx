import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { MediaPlaceholder } from "@/components/sections/MediaPlaceholder";
import { Button } from "@/components/ui/Button";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Support the Central PA Lions through Cash Bash, Pick 3 Lottery, and more.",
};

export default function FundraisingPage() {
  return (
    <>
      <InnerHero
        eyebrow="Fundraising"
        title="Support the Lion Basketball Program"
        description="Fundraising efforts support uniforms, equipment, training programs, and tournament travel."
        image={driveManifest.cashBash[0] || siteImages.achievements}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-12 page-x">
          <div>
            <h2 className="text-2xl uppercase">Cash Bash</h2>
            <p className="mt-2 text-sm text-steel">
              Join us for our annual fundraiser — details on the{" "}
              <Link href="/cash-bash" className="text-electric">
                Cash Bash event page
              </Link>
              .
            </p>
            <div className="mt-6">
              <DriveImageGrid images={driveManifest.cashBash} altPrefix="Cash Bash" columns="grid-cols-1" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl uppercase">Pick 3 Lottery</h2>
            <p className="mt-2 text-sm text-steel">
              Support the program through our Pick 3 fundraiser. Contact the coaching staff for more details.
            </p>
            {driveManifest.pick3.length > 0 ? (
              <DriveImageGrid images={driveManifest.pick3} altPrefix="Pick 3 Lottery" columns="grid-cols-1" />
            ) : (
              <MediaPlaceholder className="mt-6" label="Pick 3 Lottery (HEIC in Drive — add JPG export to display)" aspect="video" />
            )}
            <Button href="/contact" variant="secondary" className="mt-6" fullWidth>
              Contact for Details
            </Button>
          </div>
          <div className="gradient-card p-6 clip-angle">
            <h2 className="text-xl uppercase">Why We Fundraise</h2>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              Fundraising efforts support uniforms, equipment, training programs, and tournament travel for our
              student-athletes. Every contribution helps maintain the Mountaineer tradition of excellence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
