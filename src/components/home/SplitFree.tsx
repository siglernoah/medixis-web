"use client";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";
import TypedFee from "./TypedFee";

// Signature moment #2: the business model as a split screen. Halves slide in from opposite sides.
export default function SplitFree() {
  const side = (from: number) => ({
    initial: { opacity: 0, x: from },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.8, ease },
  });
  return (
    <div className="grid overflow-hidden md:grid-cols-2" aria-label="Who pays">
      <motion.div {...side(-60)} className="on-light flex min-h-[60svh] flex-col justify-between bg-white p-8 text-ink md:p-14 lg:p-20">
        <p className="text-small font-semibold text-accent">What clinics pay Medixis</p>
        <TypedFee />
        <p className="max-w-sm font-semibold">No fee, no subscription, no obligation.</p>
      </motion.div>
      <motion.div {...side(60)} className="flex min-h-[60svh] flex-col justify-between border border-white/15 p-8 text-on-dark-muted md:p-14 lg:p-20">
        <p className="text-small font-semibold text-turquoise">Who pays us</p>
        <p className="font-serif text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.98] tracking-[var(--tracking-display)] text-white">Suppliers, when a deal completes.</p>
        <p className="max-w-sm">A commission on completed purchases. That is how we can do the legwork for you for free.</p>
      </motion.div>
    </div>
  );
}
