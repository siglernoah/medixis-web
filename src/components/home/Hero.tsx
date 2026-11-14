"use client";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import MagneticButton, { Arrow } from "../MagneticButton";
import HeroNetwork from "./HeroNetwork";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduce = useReducedMotion();
  const scrollYProgress = useMotionValue(0);

  // Progress through the pinned hero: 0 at top, 1 when the sticky stage releases.
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const navH = 64;
      const r = el.getBoundingClientRect();
      const total = r.height - (window.innerHeight - navH);
      const v = total > 0 ? Math.min(1, Math.max(0, (navH - r.top) / total)) : 1;
      scrollYProgress.set(v);
      progress.current = Math.min(1, v / 0.7);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [scrollYProgress]);

  // Text choreography: intro recedes fully before the outro line arrives.
  const introOpacity = useTransform(scrollYProgress, [0.08, 0.28], [1, 0]);
  const introY = useTransform(scrollYProgress, [0.08, 0.28], [0, -48]);
  const outroOpacity = useTransform(scrollYProgress, [0.34, 0.56], [0, 1]);
  const outroY = useTransform(scrollYProgress, [0.34, 0.56], [48, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className={`on-dark relative bg-ink ${reduce ? "" : "h-[230vh]"}`}>
      <div className={`${reduce ? "" : "sticky top-16"} flex h-[calc(100svh-4rem)] min-h-[560px] items-center overflow-hidden`}>
        {/* network canvas */}
        <div className="absolute inset-0 opacity-50 md:opacity-100 lg:left-[38%]">
          <HeroNetwork progressRef={progress} />
        </div>

        <div className="container-content relative grid">
          {/* Intro */}
          <motion.div style={reduce ? undefined : { opacity: introOpacity, y: introY }} className="col-start-1 row-start-1 max-w-[46rem]">
            <p className="rise text-small font-semibold text-turquoise" style={{ "--d": "0.1s" } as React.CSSProperties}>For private clinics and hospitals</p>
            <h1 id="hero-title" className="rise mt-5 text-[clamp(2.75rem,6vw,6rem)] leading-[1.04] tracking-[-0.01em] text-white" style={{ "--d": "0.2s" } as React.CSSProperties}>
              Better equipment quotes.
              <br />
              <span>Free for clinics.</span>
            </h1>
            <p className="rise mt-8 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-snug text-white" style={{ "--d": "0.3s" } as React.CSSProperties}>
              Suppliers pay us, not you.
            </p>
            <p className="rise text-lead mt-4 max-w-[34rem] text-on-dark-muted" style={{ "--d": "0.38s" } as React.CSSProperties}>
              Tell us what your clinic needs. We find and vet suppliers, collect their quotes, and you choose. No fee and no obligation.
            </p>
            <div className="rise mt-10 flex flex-wrap gap-3" style={{ "--d": "0.5s" } as React.CSSProperties}>
              <MagneticButton href="/contact/" variant="light">Request quotes <Arrow /></MagneticButton>
              <MagneticButton href="#how-it-works" variant="ghost">How it works</MagneticButton>
            </div>
          </motion.div>

          {/* Outro — appears as the network becomes the X */}
          {!reduce && (
            <motion.div style={{ opacity: outroOpacity, y: outroY }} className="col-start-1 row-start-1 self-center" aria-hidden="true">
              <p className="text-h1 max-w-[18ch] font-serif text-white">
                We do the legwork.
                <br />
                <span>You make the choice.</span>
              </p>
            </motion.div>
          )}
        </div>

        {!reduce && (
          <motion.div style={{ opacity: hintOpacity }} aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-small text-on-dark-muted md:flex">
            Scroll
            <span className="h-10 w-px bg-gradient-to-b from-on-dark-muted to-transparent" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
