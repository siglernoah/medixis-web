"use client";
import { useEffect, useRef, useState } from "react";

const FIRST = "Your fee = 0,";
const FINAL = "Nothing.";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Types "Your fee = 0,", deletes it, then types "Nothing." — once, when scrolled into view.
 * Screen readers always get "Nothing."; reduced motion shows "Nothing." with no animation.
 * Set in the Apple system font (SF Pro on Apple devices, Helvetica/Arial elsewhere).
 */
export default function TypedFee() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState(FINAL);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    setText("");

    const run = async () => {
      setTyping(true);
      await wait(400);
      for (let i = 1; i <= FIRST.length && !cancelled; i++) { setText(FIRST.slice(0, i)); await wait(75); }
      await wait(1100);
      for (let i = FIRST.length - 1; i >= 0 && !cancelled; i--) { setText(FIRST.slice(0, i)); await wait(40); }
      await wait(350);
      for (let i = 1; i <= FINAL.length && !cancelled; i++) { setText(FINAL.slice(0, i)); await wait(95); }
      await wait(1400);
      if (!cancelled) setTyping(false);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); run(); }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { cancelled = true; io.disconnect(); };
  }, []);

  return (
    <p
      ref={ref}
      className="whitespace-nowrap text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-none tracking-[-0.025em]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <span className="sr-only">{FINAL}</span>
      <span aria-hidden="true">
        {text || "​"}
        <span className={`ml-[0.04em] inline-block h-[0.9em] w-[0.06em] translate-y-[0.1em] bg-current ${typing ? "animate-pulse" : "opacity-0"}`} />
      </span>
    </p>
  );
}
