import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SafeImage } from "@/components/ui/SafeImage";
import { getProgramBySlug, getPrograms } from "@/lib/data/queries";
import { Button } from "@/components/ui/Button";
import { siteImages } from "@/lib/data/site-images";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const programs = await getPrograms(false);
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program" };
  return { title: program.title, description: program.shortDescription };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program || !program.active) notFound();

  return (
    <>
      <section className="section-clip relative min-h-[40vh] overflow-hidden sm:min-h-[45vh]">
        <SafeImage
          src={program.featuredImage || siteImages.trainingCourt}
          alt={program.featuredImageAlt || program.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-midnight/70" />
        <div className="relative mx-auto max-w-7xl page-x py-12 sm:py-20">
          <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">Program</p>
          <h1 className="mt-2 break-words text-3xl sm:text-5xl md:text-6xl">{program.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-steel sm:text-lg">{program.shortDescription}</p>
        </div>
      </section>
      <section className="section-y">
        <div className="mx-auto grid max-w-7xl gap-8 page-x lg:grid-cols-3 lg:gap-10">
          <div className="min-w-0 space-y-6 text-steel leading-relaxed lg:col-span-2">
            <p>{program.fullDescription}</p>
          </div>
          <aside className="space-y-4 border border-white/10 p-6 h-fit clip-angle">
            {program.ageRange && (
              <p>
                <span className="text-white">Grades/Ages:</span> {program.ageRange}
              </p>
            )}
            {program.skillLevel && (
              <p>
                <span className="text-white">Skill Level:</span> {program.skillLevel}
              </p>
            )}
            {program.schedule && (
              <p>
                <span className="text-white">Schedule:</span> {program.schedule}
              </p>
            )}
            {program.location && (
              <p>
                <span className="text-white">Location:</span> {program.location}
              </p>
            )}
            {program.price && (
              <p>
                <span className="text-white">Price:</span> {program.price}
              </p>
            )}
            <Button href={program.registrationLink || "/register"} fullWidth>
              Register Interest
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
