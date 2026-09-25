import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IProgram } from "@/models/schemas";
import { programImageByIndex } from "@/lib/data/site-images";

export function ProgramsPreview({ programs }: { programs: IProgram[] }) {
  const featured = programs.filter((p) => p.featured).slice(0, 3);
  const list = featured.length ? featured : programs.slice(0, 3);

  return (
    <section className="section-clip relative section-gradient-b py-12 sm:py-16 md:py-24">
      <div className="mesh-orb left-1/4 top-0 h-80 w-80 bg-electric/15" />
      <div className="relative mx-auto max-w-7xl page-x">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">Programs</p>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl">Train Like a Lion</h2>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-steel hover:text-white"
          >
            View all programs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((program, index) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group relative overflow-hidden gradient-card clip-angle transition"
            >
              <div className="relative h-48">
                <SafeImage
                  src={program.featuredImage || programImageByIndex(index)}
                  alt={program.featuredImageAlt || program.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-charcoal/40 to-electric/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl uppercase sm:text-2xl">{program.title}</h3>
                <p className="mt-2 text-sm text-steel">{program.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
