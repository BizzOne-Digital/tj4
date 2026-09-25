"use client";

import { motion } from "framer-motion";

export function MarqueeTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="section-clip relative w-full max-w-full overflow-hidden border-y border-electric/20 bg-gradient-to-r from-navy via-electric/25 to-navy py-4">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex w-max max-w-none gap-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 will-change-transform sm:gap-12 sm:text-sm sm:tracking-[0.35em]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-12">
            {item}
            <span className="text-electric">◆</span>
          </span>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
