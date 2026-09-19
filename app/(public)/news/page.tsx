import type { Metadata } from "next";
import Link from "next/link";
import { InnerHero } from "@/components/sections/InnerHero";
import { getBlogPosts } from "@/lib/data/queries";
import { siteImages } from "@/lib/data/site-images";
import { formatDate } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "News",
  description: "Academy news, tryouts, tournaments, and player development updates.",
};

export default async function NewsPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((p) => p.featured) || posts[0];

  return (
    <>
      <InnerHero eyebrow="News & Updates" title="Lions Headlines" image={siteImages.arenaTunnel} />
      <section className="section-y">
        <div className="mx-auto max-w-7xl page-x">
          {featured && (
            <Link href={`/news/${featured.slug}`} className="mb-8 block border border-electric/30 bg-electric/10 p-5 clip-angle sm:mb-12 sm:p-8">
              <p className="text-xs uppercase tracking-widest text-electric">Featured</p>
              <h2 className="mt-2 text-2xl uppercase sm:text-4xl">{featured.title}</h2>
              <p className="mt-2 text-steel">{featured.excerpt}</p>
            </Link>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="border border-white/10 p-6 hover:border-electric/30">
                <p className="text-xs text-steel">{post.publishedAt ? formatDate(post.publishedAt) : ""}</p>
                <h3 className="mt-2 text-xl uppercase sm:text-2xl">{post.title}</h3>
                <p className="mt-2 text-sm text-steel">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
