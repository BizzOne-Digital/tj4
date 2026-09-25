import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { MediaPlaceholder } from "@/components/sections/MediaPlaceholder";
import { Button } from "@/components/ui/Button";
import { driveManifest } from "@/lib/images/drive-assets";
import { drivePageHero } from "@/lib/images/drive-page-heroes";
import { fundraisingPageCopy } from "@/lib/content/lions-copy";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Support the Central PA Lions through Cash Bash, Pick 3 Lottery, and more.",
};

export default function FundraisingPage() {
  const copy = fundraisingPageCopy;

  return (
    <>
      <InnerHero
        eyebrow="Fundraising"
        title={copy.title}
        description={copy.whyBody}
        image={drivePageHero("fundraising")}
      />
      <section className="section-y">
        <div className="mx-auto max-w-3xl space-y-12 page-x">
          <div>
            <h2 className="text-2xl uppercase">{copy.cashBashHeading}</h2>
            <p className="mt-2 text-sm text-steel">
              Event details on the{" "}
              <Link href="/cash-bash" className="text-electric hover:underline">
                Cash Bash event page
              </Link>
              .
            </p>
            {driveManifest.cashBash.length > 0 ? (
              <div className="mt-6">
                <DriveImageGrid
                  images={driveManifest.cashBash}
                  altPrefix="Cash Bash"
                  columns="grid-cols-1 sm:grid-cols-2"
                />
              </div>
            ) : (
              <MediaPlaceholder className="mt-6" label="Cash Bash pictures" aspect="video" />
            )}
          </div>

          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-steel">{copy.pick3Intro}</p>
            <Button href="/contact" variant="secondary" fullWidth>
              {copy.contactCta}
            </Button>
          </div>

          <div>
            <h2 className="text-2xl uppercase">{copy.pick3Heading}</h2>
            {driveManifest.pick3.length > 0 ? (
              <div className="mt-6">
                <DriveImageGrid
                  images={driveManifest.pick3}
                  altPrefix="Pick 3 Lottery"
                  columns="grid-cols-1"
                />
              </div>
            ) : (
              <MediaPlaceholder
                className="mt-6"
                label="Pick 3 Lottery — add JPG/PNG to PICK 3 LOTTERY/PICTURES in Drive folder"
                aspect="video"
              />
            )}
            <p className="mt-6 text-sm leading-relaxed text-steel">{copy.pick3Details}</p>
            <Button href="/contact" variant="secondary" className="mt-6" fullWidth>
              {copy.contactCta}
            </Button>
          </div>

          <div className="gradient-card p-6 clip-angle sm:p-8">
            <h2 className="text-xl uppercase">{copy.whyHeading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-steel">{copy.whyBody}</p>
          </div>
        </div>
      </section>
    </>
  );
}
