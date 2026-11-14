"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/lib/site";

/**
 * Second "wow" moment: on desktop the section pins and the four steps
 * travel horizontally with scroll. Mobile / reduced motion: a calm vertical list.
 */
export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
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
      tl.fromTo(bar.current, { scaleX: 0.25 }, { scaleX: 1, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="how-it-works" aria-labelledby="process-title" className="overflow-hidden bg-mist lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:justify-center">
      <div className="container-content pt-[var(--spacing-chapter)] lg:pt-0">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="process-title" className="text-h2 mt-4 max-w-[16ch]">Three simple steps.</h2>
          </div>
          <p className="max-w-sm text-muted">No account, no fee, no obligation. The supplier invoices you directly, and Medixis never sends you a bill.</p>
        </div>
        <div className="mt-12 hidden h-px w-full bg-line lg:block" aria-hidden="true">
          <div ref={bar} className="h-px w-full origin-left bg-accent" />
        </div>
      </div>

      <ol
        ref={track}
        className="container-content mt-12 grid gap-4 pb-[var(--spacing-chapter)] lg:flex lg:max-w-none lg:gap-6 lg:pb-0 lg:pl-[max(2rem,calc((100vw-75rem)/2+2rem))] lg:pr-[30vw]"
      >
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex flex-col justify-between rounded-[var(--radius-panel)] bg-white p-8 md:p-10 lg:h-[52svh] lg:min-h-[380px] lg:w-[min(36rem,42vw)] lg:shrink-0"
          >
            <span className="text-outline text-[clamp(5.5rem,11vw,10rem)] font-semibold leading-[0.85] tracking-[var(--tracking-display)] text-accent" aria-hidden="true">{s.n}</span>
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
