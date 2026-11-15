"use client";
import { useEffect, useRef, useState } from "react";

const FIRST = "Your fee = $0";
const FINAL = "Nothing.";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Types "Your fee = $0", deletes it, types "Nothing.", then an underline sweeps left to right.
 * Starts when `play` becomes true; calls `onDone` once the underline has drawn.
 * Screen readers always get "Nothing."; reduced motion shows "Nothing." with no animation.
 * Set in the Apple system font (SF Pro on Apple devices, Helvetica/Arial elsewhere).
 */
export default function TypedFee({ play, onDone }: { play: boolean; onDone?: () => void }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState(FINAL);
  const [typing, setTyping] = useState(false);
  const [underline, setUnderline] = useState(true);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const reduce = useRef(false);

  // Hide the word as soon as we are hydrated (it stays visible without JS / with reduced motion).
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce.current) { setText(""); setUnderline(false); }
  }, []);

  useEffect(() => {
    if (!play) return;
    if (reduce.current) { onDoneRef.current?.(); return; }
    let cancelled = false;

    const run = async () => {
      setTyping(true);
      await wait(400);
      for (let i = 1; i <= FIRST.length && !cancelled; i++) { setText(FIRST.slice(0, i)); await wait(75); }
      await wait(1100);
      for (let i = FIRST.length - 1; i >= 0 && !cancelled; i--) { setText(FIRST.slice(0, i)); await wait(40); }
      await wait(350);
      for (let i = 1; i <= FINAL.length && !cancelled; i++) { setText(FINAL.slice(0, i)); await wait(95); }
      await wait(250);
      if (cancelled) return;
      setTyping(false);
      setUnderline(true);
      await wait(1400); // let the underline sweep finish
      if (!cancelled) onDoneRef.current?.();
    };
    run();
    return () => { cancelled = true; };
  }, [play]);

  return (
    <p
      ref={ref}
      className="whitespace-nowrap text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-none tracking-[-0.025em]"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <span className="sr-only">{FINAL}</span>
      <span aria-hidden="true">
        <span className="relative inline-block">
          {text || "\u200b"}
          <span
            className="absolute -bottom-[0.12em] left-0 h-[0.07em] w-full origin-left bg-current"
            style={{
              transform: `scaleX(${underline && text === FINAL ? 1 : 0})`,
              transition: underline ? "transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
          />
        </span>
        <span className={`ml-[0.04em] inline-block h-[0.9em] w-[0.06em] translate-y-[0.1em] bg-current ${typing ? "animate-pulse" : "opacity-0"}`} />
      </span>
    </p>
  );
}
