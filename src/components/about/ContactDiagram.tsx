"use client";
import { useEffect, useRef } from "react";

/**
 * Two simple diagrams, drawn left to right when scrolled into view:
 *  1. Without an intermediary: the clinic deals with every party itself.
 *  2. With Medixis: the clinic has one point of contact.
 * Black outlines, Arial. Horizontal on wide screens, top-to-bottom on phones.
 */
const PARTIES = ["Manufacturer", "Supplier", "Distributor", "Logistics*", "Maintenance*"];
const FONT = 'Arial, Helvetica, sans-serif';

type Box = { x: number; y: number; w: number; h: number; label: string; strong?: boolean };

function curve(x1: number, y1: number, x2: number, y2: number, vertical: boolean) {
  if (vertical) { const m = (y2 - y1) / 2; return `M${x1} ${y1} C${x1} ${y1 + m}, ${x2} ${y2 - m}, ${x2} ${y2}`; }
  const m = (x2 - x1) / 2; return `M${x1} ${y1} C${x1 + m} ${y1}, ${x2 - m} ${y2}, ${x2} ${y2}`;
}

function layout(withUs: boolean, vertical: boolean) {
  const boxes: Box[] = [];
  const lines: { d: string; delay: number }[] = [];
  const nodeDelay: number[] = [];
  if (!vertical) {
    // 760 x 260
    const clinic: Box = { x: 10, y: 112, w: 140, h: 40, label: "Your clinic" };
    const parties = PARTIES.map((label, i): Box => ({ x: 600, y: 14 + i * 49, w: 150, h: 36, label }));
    boxes.push(clinic); nodeDelay.push(0);
    if (withUs) {
      const mx: Box = { x: 320, y: 110, w: 150, h: 44, label: "Medixis", strong: true };
      lines.push({ d: curve(clinic.x + clinic.w, 132, mx.x, 132, false), delay: 0.3 });
      boxes.push(mx); nodeDelay.push(0.75);
      parties.forEach((p, i) => { lines.push({ d: curve(mx.x + mx.w, 132, p.x, p.y + p.h / 2, false), delay: 1.05 + i * 0.08 }); boxes.push(p); nodeDelay.push(1.5 + i * 0.08); });
    } else {
      parties.forEach((p, i) => { lines.push({ d: curve(clinic.x + clinic.w, 132, p.x, p.y + p.h / 2, false), delay: 0.3 + i * 0.12 }); boxes.push(p); nodeDelay.push(0.9 + i * 0.12); });
    }
    return { vb: "0 0 760 264", boxes, lines, nodeDelay };
  }
  // 340 x (300 | 380), top to bottom; parties in a 3 + 2 grid
  const bottom = withUs ? 300 : 220;
  const clinic: Box = { x: 110, y: 6, w: 120, h: 40, label: "Your clinic" };
  const grid = [[8, 0], [122, 0], [236, 0], [65, 52], [179, 52]];
  const parties = PARTIES.map((label, i): Box => ({ x: grid[i][0], y: bottom + grid[i][1], w: 96, h: 36, label }));
  boxes.push(clinic); nodeDelay.push(0);
  if (withUs) {
    const mx: Box = { x: 100, y: 136, w: 140, h: 44, label: "Medixis", strong: true };
    lines.push({ d: curve(170, 46, 170, mx.y, true), delay: 0.3 }); boxes.push(mx); nodeDelay.push(0.75);
    parties.forEach((p, i) => { lines.push({ d: curve(170, mx.y + mx.h, p.x + p.w / 2, p.y, true), delay: 1.05 + i * 0.08 }); boxes.push(p); nodeDelay.push(1.5 + i * 0.08); });
  } else {
    parties.forEach((p, i) => { lines.push({ d: curve(170, 46, p.x + p.w / 2, p.y, true), delay: 0.3 + i * 0.12 }); boxes.push(p); nodeDelay.push(0.9 + i * 0.12); });
  }
  return { vb: `0 0 340 ${bottom + 92}`, boxes, lines, nodeDelay };
}

function Diagram({ withUs, vertical, offset }: { withUs: boolean; vertical: boolean; offset: number }) {
  const { vb, boxes, lines, nodeDelay } = layout(withUs, vertical);
  return (
    <svg viewBox={vb} className="h-auto w-full overflow-visible" style={{ fontFamily: FONT }}>
      {lines.map((l, i) => (
        <path key={i} d={l.d} pathLength={1} className="dg-line" fill="none" stroke="#000" strokeWidth={withUs ? 1.5 : 1.25}
          style={{ "--d": `${offset + l.delay}s` } as React.CSSProperties} />
      ))}
      {boxes.map((b, i) => (
        <g key={i} className={`dg-node ${vertical ? "dg-v" : ""}`} style={{ "--d": `${offset + nodeDelay[i]}s` } as React.CSSProperties}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={10} fill={b.strong ? "#000" : "#fff"} stroke="#000" strokeWidth={b.strong ? 2 : 1.5} />
          <text x={b.x + b.w / 2} y={b.y + b.h / 2} textAnchor="middle" dominantBaseline="central"
            fontSize={b.strong ? 17 : vertical ? 12.5 : 14.5} fontWeight={b.strong || i === 0 ? 700 : 400} fill={b.strong ? "#fff" : "#000"}>
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function ContactDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("play"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("play"); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const block = (withUs: boolean, offset: number, title: string, note: string) => (
    <figure className="rounded-[var(--radius-panel)] border border-black/15 bg-white p-5 md:p-8" style={{ fontFamily: FONT }}>
      <figcaption className="mb-5 text-left">
        <span className="block text-[1.05rem] font-bold text-black">{title}</span>
        <span className="block text-[0.95rem] text-black/70">{note}</span>
      </figcaption>
      <div className="hidden md:block"><Diagram withUs={withUs} vertical={false} offset={offset} /></div>
      <div className="mx-auto max-w-[22rem] md:hidden"><Diagram withUs={withUs} vertical offset={offset} /></div>
    </figure>
  );

  return (
    <div ref={ref} className="dg mx-auto mt-16 grid max-w-4xl gap-6">
      {block(false, 0, "Without an intermediary", "The clinic contacts and manages every party itself.")}
      {block(true, 1.6, "With Medixis", "One point of contact. We deal with everyone else.")}
      <p className="text-left text-[0.9rem] text-black/70" style={{ fontFamily: FONT }}>
        * Logistics and maintenance depend on the supplier and how they prefer to handle them.
      </p>
    </div>
  );
}
