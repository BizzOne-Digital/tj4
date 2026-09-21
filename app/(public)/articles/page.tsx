import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { MediaPlaceholder } from "@/components/sections/MediaPlaceholder";
import { getBlogPosts } from "@/lib/data/queries";
import { driveManifest } from "@/lib/images/drive-assets";
import { siteImages } from "@/lib/data/site-images";

export const metadata: Metadata = {
  title: "Articles Through the Years",
  description: "News and articles from Central PA Lions Academy.",
};

export default async function ArticlesPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <InnerHero
        eyebrow="Articles"
        title="Articles Through the Years"
        description="Stories, updates, and highlights from the Lions program."
        image={siteImages.arenaTunnel}
      />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          {driveManifest.articles.length > 0 ? (
            <div className="mb-10 max-w-4xl">
              <DriveImageGrid images={driveManifest.articles} altPrefix="Lions article" />
            </div>
          ) : (
            <MediaPlaceholder
              className="mb-10 max-w-2xl"
              label="Articles folder has HEIC files only — export JPG/PNG from Drive to display here"
              aspect="video"
            />
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="gradient-card p-6 clip-angle">
                <h2 className="text-xl uppercase">{post.title}</h2>
                <p className="mt-2 text-sm text-steel">{post.excerpt}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-electric">Read article</p>
              </Link>
            ))}
          </div>
          <Link href="/news" className="mt-10 inline-block text-sm uppercase tracking-widest text-electric">
            View all news →
          </Link>
        </div>
      </section>
    </>
  );
}
