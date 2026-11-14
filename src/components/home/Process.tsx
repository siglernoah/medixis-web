"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/lib/site";

/**
 * Second "wow" moment: on desktop the section pins and the four steps
 * travel horizontally with scroll. Mobile / reduced motion: a calm vertical list.
 */
// A flat line with two ECG-style beats, drawn in a 1000×60 box.
const HB_W = 1000, HB_H = 60;
const beat = (x: number) =>
  `H${x} l14 -5 l12 5 h14 l7 9 l13 -46 l13 52 l8 -15 h16 l18 -7 l16 7`;
const HEARTBEAT = `M0 30 ${beat(250)} ${beat(640)} H${HB_W}`;

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const pulse = useRef<SVGPathElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const line = pulse.current!;
    const len = line.getTotalLength();
    // Draw the heartbeat up to progress p (0..1) and park the dot at its tip.
    const draw = (p: number) => {
      line.style.strokeDashoffset = String(1 - p);
      const svg = line.ownerSVGElement!;
      const pt = line.getPointAtLength(len * p);
      const box = svg.getBoundingClientRect();
      if (dot.current) {
        dot.current.style.transform = `translate(${(pt.x / HB_W) * box.width}px, ${(pt.y / HB_H) * box.height}px)`;
        dot.current.style.opacity = p > 0.001 && p < 0.999 ? "1" : "0";
      }
    };
    const state = { p: 0 };
    mm.add("(prefers-reduced-motion: reduce)", () => draw(1));
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      draw(0);
      gsap.to(state, {
        p: 1, ease: "none", onUpdate: () => draw(state.p),
        scrollTrigger: { trigger: section.current, start: "top 75%", end: "bottom 40%", scrub: 0.6 },
      });
    });
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - el.clientWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top+=64",
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.to(el, { x: () => -distance(), ease: "none" }, 0);
      draw(0);
      state.p = 0;
      tl.to(state, { p: 1, ease: "none", onUpdate: () => draw(state.p) }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="how-it-works" aria-labelledby="process-title" className="overflow-hidden bg-white lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:justify-center">
      <div className="container-content pt-[var(--spacing-chapter)] lg:pt-0">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="process-title" className="text-h2 mt-4 max-w-[16ch]">Three simple steps.</h2>
          </div>
          <p className="max-w-sm text-muted">No account, no fee, no obligation. The supplier invoices you directly, and Medixis never sends you a bill.</p>
        </div>
        {/* Heartbeat progress line: draws (and un-draws) through two pulses as you scroll */}
        <div className="relative mt-12 h-14 w-full" aria-hidden="true">
          <svg viewBox={`0 0 ${HB_W} ${HB_H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <path d={HEARTBEAT} fill="none" stroke="var(--color-line)" strokeWidth="1.5" strokeLinejoin="round" />
            <path
              ref={pulse}
              d={HEARTBEAT}
              pathLength={1}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
             
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
            />
          </svg>
          <span ref={dot} className="absolute -left-[5px] -top-[5px] h-2.5 w-2.5 rounded-full bg-accent opacity-0 shadow-[0_0_0_6px_rgb(0_114_133/0.15)]" />
        </div>
      </div>

      <ol
        ref={track}
        className="container-content mt-12 grid gap-4 pb-[var(--spacing-chapter)] lg:flex lg:max-w-none lg:gap-6 lg:pb-0 lg:pl-[max(2rem,calc((100vw-75rem)/2+2rem))] lg:pr-[30vw]"
      >
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex flex-col justify-between rounded-[var(--radius-panel)] border border-ink/10 bg-white p-8 md:p-10 lg:h-[52svh] lg:min-h-[380px] lg:w-[min(36rem,42vw)] lg:shrink-0"
          >
            <span className="text-outline font-serif text-[clamp(5.5rem,11vw,10rem)] font-normal leading-[0.85] text-ink" aria-hidden="true">{s.n}</span>
            <div className="mt-10">
              <h3 className="text-[1.75rem] leading-tight tracking-[var(--tracking-heading)]">
                <span className="sr-only">Step {s.n}: </span>{s.title}
              </h3>
              <p className="mt-4 max-w-[30rem] text-body">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
