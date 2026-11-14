"use client";
import { motion } from "framer-motion";
import { ease, dur } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

// Fade + 24px rise when scrolled into view. Disabled under reduced motion (MotionConfig).
export default function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: dur.slow, ease, delay }}
    >
      {children}
    </Tag>
  );
}
