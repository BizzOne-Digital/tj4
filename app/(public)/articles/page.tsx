import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { MediaPlaceholder } from "@/components/sections/MediaPlaceholder";
import { driveManifest } from "@/lib/images/drive-assets";
import { articlesPageCopy } from "@/lib/content/lions-copy";
import { drivePageHero } from "@/lib/images/drive-page-heroes";

export const metadata: Metadata = {
  title: "Articles Through the Years",
  description: articlesPageCopy.sectionHeading,
};

export default function ArticlesPage() {
  const copy = articlesPageCopy;
  const heroImage = drivePageHero("articles");

  return (
    <>
      <InnerHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.intro}
        image={heroImage}
        imageFit="contain"
      />
      <section className="section-y">
        <div className="mx-auto max-w-5xl space-y-10 page-x">
          <p className="text-center text-base leading-relaxed text-steel sm:text-lg">{copy.intro}</p>

          <div>
            <h2 className="text-2xl uppercase">{copy.sectionHeading}</h2>
            <div className="mt-6">
              {driveManifest.articles.length > 0 ? (
                <DriveImageGrid
                  images={driveManifest.articles}
                  altPrefix="Articles through the years"
                  columns="grid-cols-2 md:grid-cols-3"
                />
              ) : (
                <MediaPlaceholder
                  label="Articles through the years — add JPG/PNG to Articles through the years/PICTURES in Drive folder"
                  aspect="video"
                />
              )}
            </div>
          </div>

          <p className="text-center">
            <Link href="/news" className="text-sm uppercase tracking-widest text-electric hover:underline">
              View news &amp; blog posts →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
