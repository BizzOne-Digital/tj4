"use client";

import Image from "next/image";
import { resolveImageSrc } from "@/lib/images/resolve-image-src";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ISiteSettings } from "@/models/schemas";
import { siteImages } from "@/lib/data/site-images";
import { isDriveAssetUrl } from "@/lib/images/drive-assets";
import { cn } from "@/lib/utils/cn";

export function HeroHome({ settings }: { settings: ISiteSettings }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const bg = settings.heroBackgroundImage || siteImages.hero;
  const bgSrc = resolveImageSrc(bg);
  const heroUnoptimized = bg.startsWith("/api/uploads/") || isDriveAssetUrl(bg);

  return (
    <section ref={ref} className="section-clip relative min-h-[calc(100dvh-var(--header-offset,3.25rem))] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <Image
          src={bgSrc}
          alt="Central PA Lions basketball arena"
          fill
          priority
          unoptimized={heroUnoptimized}
          className={cn(
            isDriveAssetUrl(bg)
              ? "object-contain object-center bg-midnight"
              : "object-cover object-[center_30%] sm:object-center"
          )}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/90 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-navy/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-electric/15 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 flex-col justify-center gap-8 pr-4 text-[10px] uppercase tracking-[0.4em] text-white/20 lg:flex">
        <span className="rotate-180 [writing-mode:vertical-rl]">Discipline</span>
        <span className="rotate-180 [writing-mode:vertical-rl]">Development</span>
        <span className="rotate-180 [writing-mode:vertical-rl]">Character</span>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-var(--header-offset,3.25rem))] max-w-7xl flex-col justify-center px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3 max-w-md text-[10px] font-semibold uppercase tracking-[0.2em] text-steel sm:mb-4 sm:text-xs sm:tracking-[0.35em]"
        >
          {settings.tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="max-w-4xl break-words text-[1.65rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {settings.siteName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:mt-4 sm:text-sm sm:tracking-[0.35em]"
        >
          {settings.motto}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-4 max-w-2xl text-sm italic text-steel sm:mt-6 sm:text-base md:text-lg"
        >
          &ldquo;{settings.mission}&rdquo;
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap"
        >
          <Button href="/register" fullWidth className="sm:w-auto">
            Register Now <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/programs" variant="secondary" fullWidth className="sm:w-auto">
            Explore Programs <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/donate" variant="ghost" fullWidth className="sm:w-auto">
            Support the Lions
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-4 hidden items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-steel sm:flex sm:gap-3 sm:text-xs sm:tracking-[0.3em] lg:bottom-8 lg:left-8"
      >
        <span className="inline-flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </span>
        Discover the Pride
      </motion.div>
    </section>
  );
}
