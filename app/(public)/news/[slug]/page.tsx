import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data/queries";
import { formatDate, readingTime } from "@/lib/utils/cn";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article" };
  return { title: post.seo?.title || post.title, description: post.seo?.description || post.excerpt };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = (await getBlogPosts()).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="section-y">
      <div className="mx-auto max-w-3xl page-x">
        <p className="text-xs uppercase tracking-widest text-electric">
          {post.publishedAt ? formatDate(post.publishedAt) : ""} · {readingTime(post.content)} min read
        </p>
        <h1 className="mt-3 break-words text-3xl sm:text-5xl">{post.title}</h1>
        <p className="mt-2 text-steel">By {post.author}</p>
        <div className="prose prose-invert mt-10 max-w-none text-steel" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-xl uppercase">Related</h2>
          <ul className="mt-4 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/news/${r.slug}`} className="text-electric hover:underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
