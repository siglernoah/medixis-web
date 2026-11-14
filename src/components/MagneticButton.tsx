"use client";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

const styles = {
  primary: "bg-ink text-white hover:bg-accent",
  secondary: "border border-ink/15 text-ink hover:border-ink/40",
  light: "bg-white text-ink hover:bg-accent-soft",
};

const MotionLink = motion.create(Link);

// Subtle magnetic pull on fine pointers only. Critically damped spring: no overshoot/bounce.
export default function MagneticButton({ href, children, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 30, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 30, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <MotionLink
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor="hover"
      className={`inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-base font-semibold transition-colors duration-[var(--dur-fast)] ${styles[variant]} ${className}`}
    >
      {children}
    </MotionLink>
  );
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
