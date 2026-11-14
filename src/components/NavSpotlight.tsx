"use client";
import { useEffect, useRef } from "react";

/**
 * A soft turquoise spotlight that stems from the nav's "Request quotes" button.
 * The light itself never moves: its mask stays centred on the button. When the cursor
 * enters the glow (from its faintest edge inwards) the bright core leans toward the
 * cursor, like a beam being aimed. It fades out as the page scrolls past the header.
 * Decorative only: aria-hidden and pointer-events: none, so it never blocks clicks.
 */
export default function NavSpotlight({ anchors }: { anchors: React.RefObject<HTMLElement | null>[] }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let ox = 0, oy = 0, R = 600;           // origin (button centre, relative to header) and radius
    let tx = 0, ty = 0, cx = 0, cy = 0;     // hotspot offset target / current, in px from origin
    let raf = 0, running = false;

    const place = () => {
      const anchor = anchors.map((a) => a.current).find((n) => n && n.offsetParent !== null);
      const header = node.parentElement;
      if (!anchor || !header) return;
      const a = anchor.getBoundingClientRect(), h = header.getBoundingClientRect();
      ox = a.left + a.width / 2 - h.left;
      oy = a.top + a.height / 2 - h.top;
      R = Math.min(700, Math.max(360, window.innerWidth * 0.5));
      node.style.setProperty("--r", `${R}px`);
      node.style.left = `${ox - R}px`;
      node.style.top = `${oy - R}px`;
      node.style.width = node.style.height = `${2 * R}px`;
      paint();
    };

    const paint = () => {
      const x = R + cx, y = R + cy;
      node.style.setProperty("--hx", `${x}px`);
      node.style.setProperty("--hy", `${y}px`);
    };

    const fade = () => {
      const o = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.55));
      node.style.opacity = String(o);
    };

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      paint();
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };

    const onMove = (e: PointerEvent) => {
      const header = node.parentElement!.getBoundingClientRect();
      const dx = e.clientX - (header.left + ox);
      const dy = e.clientY - (header.top + oy);
      const d = Math.hypot(dx, dy);
      if (d < R * 0.88 && Number(node.style.opacity || 1) > 0.05) {
        // Lean toward the cursor; stronger the closer it is to the visible edge of the light.
        const k = 0.42;
        tx = dx * k; ty = dy * k;
      } else { tx = 0; ty = R * 0.12; }
      kick();
    };

    ty = cy = R * 0.12; // resting: slightly below the button, as if shining down from it
    place(); fade();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", fade, { passive: true });
    if (!reduce && fine) window.addEventListener("pointermove", onMove, { passive: true });
    document.fonts?.ready.then(place);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", fade);
      window.removeEventListener("pointermove", onMove);
    };
  }, [anchors]);

  return (
    <div
      ref={el}
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        background:
          "radial-gradient(circle var(--r, 600px) at var(--hx, 50%) var(--hy, 56%), rgb(0 166 188 / 0.4) 0%, rgb(0 166 188 / 0.17) 32%, rgb(0 166 188 / 0.05) 62%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(circle var(--r, 600px) at 50% 50%, #000 0%, rgb(0 0 0 / 0.75) 40%, transparent 88%)",
        maskImage: "radial-gradient(circle var(--r, 600px) at 50% 50%, #000 0%, rgb(0 0 0 / 0.75) 40%, transparent 88%)",
      }}
    />
  );
}
