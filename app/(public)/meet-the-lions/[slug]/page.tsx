import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { driveGalleryCover } from "@/lib/images/drive-assets";
import { getGalleryAlbumBySlug, getGalleryImages } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";
import { meetTheLionsSeasons } from "@/lib/content/lions-copy";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return meetTheLionsSeasons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  return {
    title: album?.title ?? "Season Gallery",
    description: album?.description,
  };
}

export default async function MeetTheLionsSeasonPage({ params }: Props) {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) notFound();

  const images = await getGalleryImages(slug);
  const meta = meetTheLionsSeasons.find((s) => s.slug === slug);
  const heroImage = driveGalleryCover(slug) || album.coverImage || siteImages.benchGear;

  return (
    <>
      <InnerHero
        eyebrow={meta?.label ?? "Meet the Lions"}
        title={meta?.title ?? album.title}
        description={meta?.description || undefined}
        image={heroImage}
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          <DriveImageGrid images={images.map((i) => i.url)} altPrefix={album.title} />
          <Link href="/meet-the-lions" className="mt-10 inline-block text-sm uppercase tracking-widest text-electric">
            ← All seasons
          </Link>
        </div>
      </section>
    </>
  );
}
