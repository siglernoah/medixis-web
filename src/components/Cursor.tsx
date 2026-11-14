"use client";
import { useEffect, useRef } from "react";

// Desktop-only follower ring. The native cursor stays visible (accessibility).
// Not rendered on touch / coarse pointers or with reduced motion.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;

    let tx = -100, ty = -100, cx = -100, cy = -100, scale = 1, ts = 1, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target as HTMLElement | null;
      ts = t?.closest("a, button, [data-cursor='hover'], input, select, textarea, label") ? 1.8 : 1;
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };
    const loop = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; scale += (ts - scale) * 0.15;
      el.style.transform = `translate3d(${cx - 16}px, ${cy - 16}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-8 w-8 rounded-full border border-turquoise opacity-0 transition-opacity duration-300 [@media(pointer:fine)]:block"
    />
  );
}
