"use client";
import { MotionConfig } from "framer-motion";

// Honors prefers-reduced-motion for every Framer Motion animation on the site.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
