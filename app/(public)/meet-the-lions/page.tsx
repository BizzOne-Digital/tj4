import type { Metadata } from "next";
import Link from "next/link";
import { PersonPhoto } from "@/components/ui/PersonPhoto";
import { InnerHero } from "@/components/sections/InnerHero";
import { getGalleryAlbums } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";
import { meetTheLionsSeasons } from "@/lib/content/lions-copy";

export const metadata: Metadata = {
  title: "Meet the Lions",
  description: "Browse Central PA Lions team pictures from every season.",
};

export default async function MeetTheLionsPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      <InnerHero
        eyebrow="Meet the Lions"
        title="Team Photos by Season"
        description="Browse Lions Basketball team pictures from every season."
        image={siteImages.benchGear}
      />
      <section className="section-y">
        <div className="mx-auto grid max-w-7xl gap-6 page-x md:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => {
            const meta = meetTheLionsSeasons.find((s) => s.slug === album.slug);
            return (
              <Link
                key={album.slug}
                href={`/meet-the-lions/${album.slug}`}
                className="group overflow-hidden gradient-card clip-angle"
              >
                <PersonPhoto
                  src={album.coverImage || siteImages.trainingCourt}
                  alt={album.title}
                  frameClassName="aspect-[4/3] rounded-none ring-0"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-electric">{meta?.label ?? album.title}</p>
                  <h2 className="mt-1 text-xl uppercase">{album.title}</h2>
                  <p className="mt-2 text-sm text-steel line-clamp-3">{meta?.description ?? album.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-electric">View season</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
