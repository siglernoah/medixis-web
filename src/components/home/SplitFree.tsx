"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TypedFee from "./TypedFee";

/**
 * "Why it's free" split screen, played as one sequence when it scrolls into view:
 *  1. Both panels sit in their colours (white / navy) with the text hidden.
 *  2. The white panel's text fades in and "Your fee = $0" → "Nothing." types out.
 *  3. When the underline has drawn, the navy panel's text fades in slowly, line by line, top to bottom.
 * Lines are measured from the real layout, so the order holds at every screen width.
 * Without JS or with reduced motion, everything is simply visible.
 */
const NAVY_BLOCKS = [
  { text: "Who pays us", className: "text-small font-semibold text-turquoise" },
  { text: "Suppliers, when a deal completes.", className: "font-display text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.98] tracking-[var(--tracking-display)] text-white" },
  { text: "A commission on completed purchases. That is how we can do the legwork for you for free.", className: "max-w-sm" },
];
const LINE_GAP = 0.45; // seconds between lines
const FADE = 1.1;      // seconds each line takes to fade in

export default function SplitFree() {
  const root = useRef<HTMLDivElement>(null);
  const navy = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);       // JS is running: hide text until its turn
  const [whiteOn, setWhiteOn] = useState(false);
  const [navyOn, setNavyOn] = useState(false);
  const [lineOf, setLineOf] = useState<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); setWhiteOn(true); }
    }, { threshold: 0.45 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  // Work out which visual line each word sits on (re-measured on resize).
  useLayoutEffect(() => {
    const measure = () => {
      const words = Array.from(navy.current?.querySelectorAll<HTMLElement>("[data-w]") ?? []);
      let line = -1, lastTop = -Infinity, lastBlock = "";
      setLineOf(words.map((w) => {
        const top = w.offsetTop, block = w.dataset.b!;
        if (block !== lastBlock || top > lastTop + 4) { line++; lastTop = top; lastBlock = block; }
        return line;
      }));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const fade = (on: boolean, delay = 0) => armed ? {
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(8px)",
    transition: on ? `opacity 900ms ease ${delay}s, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}s` : "none",
  } : undefined;

  let wordIndex = 0;
  return (
    <div ref={root} className="grid overflow-hidden md:grid-cols-2" aria-label="Who pays">
      <div className="on-light flex min-h-[60svh] flex-col justify-between bg-white p-8 text-ink md:p-14 lg:p-20">
        <p className="text-small font-semibold text-accent" style={fade(whiteOn)}>What clinics pay Medixis</p>
        <TypedFee play={whiteOn} onDone={() => setNavyOn(true)} />
        <p className="max-w-sm font-semibold" style={fade(whiteOn, 0.3)}>No fee, no subscription, no obligation.</p>
      </div>
      <div ref={navy} className="flex min-h-[60svh] flex-col justify-between border border-white/15 p-8 text-on-dark-muted md:p-14 lg:p-20">
        {NAVY_BLOCKS.map((b, bi) => (
          <p key={bi} className={b.className}>
            {b.text.split(" ").map((word, i, all) => {
              const k = wordIndex++;
              const line = lineOf[k] ?? 0;
              return (
                <span key={i}>
                  <span
                    data-w=""
                    data-b={bi}
                    className="inline-block"
                    style={armed ? {
                      opacity: navyOn ? 1 : 0,
                      transform: navyOn ? "none" : "translateY(10px)",
                      transition: navyOn ? `opacity ${FADE}s ease ${line * LINE_GAP}s, transform ${FADE}s cubic-bezier(0.22,1,0.36,1) ${line * LINE_GAP}s` : "none",
                    } : undefined}
                  >
                    {word}
                  </span>
                  {i < all.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
}
