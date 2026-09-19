"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "btn-gradient text-white border border-electric/50 glow-blue",
  secondary:
    "bg-gradient-to-r from-white/5 to-navy/20 text-white border border-white/35 hover:from-electric/20 hover:to-navy/30 hover:border-electric/40",
  ghost:
    "bg-gradient-to-br from-white/5 to-transparent text-white border border-white/10 hover:border-electric/30 hover:from-electric/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
  fullWidth,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  const classes = cn(
    "inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 clip-angle sm:px-6 sm:text-sm",
    fullWidth && "w-full sm:w-auto",
    variants[variant],
    className
  );

  if (href) {
    return (
      <motion.div
        className={cn(fullWidth && "w-full sm:w-auto")}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(classes, disabled && "cursor-not-allowed opacity-50")}
    >
      {children}
    </motion.button>
  );
}
