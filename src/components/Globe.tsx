"use client";
import { useEffect, useRef } from "react";

/**
 * Interactive wireframe globe (canvas 2D, no WebGL).
 * - Transparent blue sphere, graticule with node dots, every country outline (front and faint back side).
 * - Medixis locations as white points joined by white great-circle arcs; Eastern Europe as a region ring
 *   with smaller links between Poland, Romania, Bulgaria and Latvia.
 * - Spins slowly on its own; drag left/right to spin it. Spin speed is capped at one turn per 0.5 s.
 * Map data (world-atlas, Natural Earth 110m) loads only when the globe is about to scroll into view.
 */

type LonLat = [number, number];
const DEG = Math.PI / 180;
const MAX_SPEED = (2 * Math.PI) / 0.5; // one full rotation per half second, in rad/s
const AUTO_SPEED = 0.09;               // gentle idle spin, rad/s (about 70 s per turn)
const TILT = 24 * DEG;                 // look slightly down onto the northern hemisphere

const BLUE = "78, 160, 255";           // Medixis-blue line colour (rgb)
const OUR_COUNTRY_IDS = new Set(["208", "616", "642", "100", "428", "504", "566"]);

const P = {
  dk: [10.2, 56.16] as LonLat,  // Aarhus
  pl: [21.01, 52.23] as LonLat, // Warsaw
  lv: [24.11, 56.95] as LonLat, // Riga
  ro: [26.1, 44.43] as LonLat,  // Bucharest
  bg: [23.32, 42.7] as LonLat,  // Sofia
  ma: [-6.83, 34.02] as LonLat, // Rabat
  ng: [7.4, 9.08] as LonLat,    // Abuja
};
const EE_CENTER: LonLat = [23.6, 49.8];
const POINTS: { at: LonLat; label?: string; hub?: boolean; small?: boolean; left?: boolean }[] = [
  { at: P.dk, label: "Denmark · HQ", hub: true, left: true },
  { at: P.pl, small: true }, { at: P.lv, small: true }, { at: P.ro, small: true }, { at: P.bg, small: true },
  { at: P.ma, label: "Morocco" },
  { at: P.ng, label: "Nigeria" },
];
const MAIN_LINKS: [LonLat, LonLat][] = [[P.dk, P.pl], [P.dk, P.ma], [P.dk, P.ng], [P.ma, P.ng]];
const MINOR_LINKS: [LonLat, LonLat][] = [[P.lv, P.pl], [P.pl, P.ro], [P.ro, P.bg], [P.pl, P.bg], [P.lv, P.ro]];

const toVec = ([lon, lat]: LonLat): [number, number, number] => [
  Math.cos(lat * DEG) * Math.sin(lon * DEG),
  Math.sin(lat * DEG),
  Math.cos(lat * DEG) * Math.cos(lon * DEG),
];

/** Great-circle arc between a and b as unit vectors, lifted off the surface towards the middle. */
function arc(a: LonLat, b: LonLat, lift: number, n = 48) {
  const A = toVec(a), B = toVec(b);
  const dot = Math.min(1, Math.max(-1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const w = Math.acos(dot), s = Math.sin(w) || 1;
  const h = Math.min(0.22, w * lift);
  const out = new Float32Array((n + 1) * 3);
  for (let i = 0; i <= n; i++) {
    const t = i / n, k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s, m = 1 + h * Math.sin(Math.PI * t);
    out[i * 3] = (A[0] * k1 + B[0] * k2) * m;
    out[i * 3 + 1] = (A[1] * k1 + B[1] * k2) * m;
    out[i * 3 + 2] = (A[2] * k1 + B[2] * k2) * m;
  }
  return out;
}

/** Small circle of angular radius d around c, on the sphere surface. */
function ring(c: LonLat, d: number, n = 64) {
  const C = toVec(c);
  const up: [number, number, number] = Math.abs(C[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
  const u = [C[1] * up[2] - C[2] * up[1], C[2] * up[0] - C[0] * up[2], C[0] * up[1] - C[1] * up[0]];
  const ul = Math.hypot(u[0], u[1], u[2]); u[0] /= ul; u[1] /= ul; u[2] /= ul;
  const v = [C[1] * u[2] - C[2] * u[1], C[2] * u[0] - C[0] * u[2], C[0] * u[1] - C[1] * u[0]];
  const out = new Float32Array((n + 1) * 3);
  for (let i = 0; i <= n; i++) {
    const th = (i / n) * Math.PI * 2, cs = Math.cos(th), sn = Math.sin(th);
    for (let j = 0; j < 3; j++) out[i * 3 + j] = C[j] * Math.cos(d) + (u[j] * cs + v[j] * sn) * Math.sin(d);
  }
  return out;
}

function lonLatLine(coords: LonLat[]) {
  const out = new Float32Array(coords.length * 3);
  coords.forEach((c, i) => out.set(toVec(c), i * 3));
  return out;
}

export default function Globe({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvs.current!, box = wrap.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- static geometry
    const grat: Float32Array[] = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts: LonLat[] = []; for (let lon = -180; lon <= 180; lon += 3) pts.push([lon, lat]); grat.push(lonLatLine(pts));
    }
    for (let lon = -180; lon < 180; lon += 15) {
      const pts: LonLat[] = []; for (let lat = -90; lat <= 90; lat += 3) pts.push([lon, lat]); grat.push(lonLatLine(pts));
    }
    const nodes: LonLat[] = [];
    for (let lat = -75; lat <= 75; lat += 15) for (let lon = -180; lon < 180; lon += 15) nodes.push([lon, lat]);
    const nodeVecs = lonLatLine(nodes);
    const mainArcs = MAIN_LINKS.map(([a, b]) => arc(a, b, 0.16));
    const minorArcs = MINOR_LINKS.map(([a, b]) => arc(a, b, 0.05, 20));
    const eeRing = ring(EE_CENTER, 9.5 * DEG);
    const eeLabelAt = toVec([EE_CENTER[0] + 13, EE_CENTER[1] + 3]);
    const pointVecs = POINTS.map((p) => toVec(p.at));
    let countries: { line: Float32Array; ours: boolean }[] = [];

    // --- state
    let W = 0, R = 0, cx = 0, cy = 0, dpr = 1;
    let angle = -16 * DEG;                      // centre on central Europe / Africa
    let vel = reduce ? 0 : AUTO_SPEED;
    let dragging = false, lastX = 0, lastT = 0, dragVel = 0;
    let raf = 0, running = false, visible = false, prev = performance.now(), clock = 0;
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    let ca = Math.cos(angle), sa = Math.sin(angle);

    // rotate + project a unit vector; returns [sx, sy, z]
    const pr = (x: number, y: number, z: number, o: [number, number, number]) => {
      const x1 = x * ca + z * sa, z1 = z * ca - x * sa;
      const y2 = y * cosT - z1 * sinT, z2 = y * sinT + z1 * cosT;
      o[0] = cx + x1 * R; o[1] = cy - y2 * R; o[2] = z2;
      return o;
    };
    const tmp: [number, number, number] = [0, 0, 0];

    /** Stroke a polyline split into front and back halves. */
    const polyline = (pts: Float32Array, front: Path2D, back: Path2D, lifted = false) => {
      let pf = false, pb = false;
      for (let i = 0; i < pts.length; i += 3) {
        pr(pts[i], pts[i + 1], pts[i + 2], tmp);
        const dx = tmp[0] - cx, dy = tmp[1] - cy;
        const isFront = tmp[2] >= 0 || (lifted && dx * dx + dy * dy > R * R);
        if (isFront) {
          if (pf) front.lineTo(tmp[0], tmp[1]); else front.moveTo(tmp[0], tmp[1]);
          pf = true; pb = false;
        } else {
          if (pb) back.lineTo(tmp[0], tmp[1]); else back.moveTo(tmp[0], tmp[1]);
          pb = true; pf = false;
        }
      }
    };

    const resize = () => {
      W = box.clientWidth; dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = W * dpr; canvas.height = W * dpr;
      canvas.style.width = canvas.style.height = `${W}px`;
      R = W * 0.4; cx = cy = W / 2;
      draw();
    };

    const draw = () => {
      ca = Math.cos(angle); sa = Math.sin(angle);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);

      // atmosphere glow + translucent sphere (about 90% see-through)
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      halo.addColorStop(0, `rgba(${BLUE}, 0.22)`); halo.addColorStop(1, `rgba(${BLUE}, 0)`);
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2); ctx.fill();
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, `rgba(${BLUE}, 0.16)`); body.addColorStop(0.75, `rgba(${BLUE}, 0.08)`); body.addColorStop(1, `rgba(${BLUE}, 0.2)`);
      ctx.fillStyle = body; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${BLUE}, 0.7)`; ctx.lineWidth = 1.2; ctx.stroke();

      // graticule
      const gF = new Path2D(), gB = new Path2D();
      for (const g of grat) polyline(g, gF, gB);
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgba(${BLUE}, 0.08)`; ctx.stroke(gB);
      ctx.strokeStyle = `rgba(${BLUE}, 0.22)`; ctx.stroke(gF);

      // countries
      const cF = new Path2D(), cB = new Path2D(), oF = new Path2D();
      for (const c of countries) polyline(c.line, c.ours ? oF : cF, cB);
      ctx.lineWidth = 0.6; ctx.strokeStyle = `rgba(${BLUE}, 0.16)`; ctx.stroke(cB);
      ctx.lineWidth = 0.8; ctx.strokeStyle = `rgba(150, 205, 255, 0.75)`; ctx.stroke(cF);
      ctx.save(); ctx.fillStyle = "rgba(255, 255, 255, 0.16)"; ctx.fill(oF); ctx.restore();
      ctx.lineWidth = 1.1; ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"; ctx.stroke(oF);

      // graticule nodes (the "Stark" dots)
      ctx.fillStyle = `rgba(${BLUE}, 0.7)`;
      for (let i = 0; i < nodeVecs.length; i += 3) {
        pr(nodeVecs[i], nodeVecs[i + 1], nodeVecs[i + 2], tmp);
        if (tmp[2] > 0.05) { ctx.beginPath(); ctx.arc(tmp[0], tmp[1], 1 + tmp[2] * 0.8, 0, Math.PI * 2); ctx.fill(); }
      }

      // Eastern Europe region ring
      const rF = new Path2D(), rB = new Path2D();
      polyline(eeRing, rF, rB);
      ctx.setLineDash([3, 4]); ctx.lineWidth = 1.2; ctx.strokeStyle = "rgba(255, 255, 255, 0.75)"; ctx.stroke(rF); ctx.setLineDash([]);

      // links
      const mF = new Path2D(), mB = new Path2D(), nF = new Path2D(), nB = new Path2D();
      for (const a of mainArcs) polyline(a, mF, mB, true);
      for (const a of minorArcs) polyline(a, nF, nB, true);
      ctx.lineCap = "round";
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(255, 255, 255, 0.12)"; ctx.stroke(mB); ctx.stroke(nB);
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)"; ctx.shadowBlur = 6;
      ctx.lineWidth = 1.6; ctx.strokeStyle = "rgba(255, 255, 255, 0.95)"; ctx.stroke(mF);
      ctx.lineWidth = 0.9; ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"; ctx.stroke(nF);

      // light pulses travelling along the main links
      if (!reduce) {
        mainArcs.forEach((a, k) => {
          const n = a.length / 3 - 1, t = (clock * 0.22 + k * 0.27) % 1, i = Math.round(t * n) * 3;
          pr(a[i], a[i + 1], a[i + 2], tmp);
          const dx = tmp[0] - cx, dy = tmp[1] - cy;
          if (tmp[2] >= 0 || dx * dx + dy * dy > R * R) {
            ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(tmp[0], tmp[1], 2, 0, Math.PI * 2); ctx.fill();
          }
        });
      }
      ctx.shadowBlur = 0;

      // location points + labels
      ctx.font = `500 ${Math.max(11, Math.round(W / 46))}px "IBM Plex Sans", system-ui, sans-serif`;
      ctx.textBaseline = "middle";
      POINTS.forEach((p, k) => {
        const v = pointVecs[k];
        pr(v[0], v[1], v[2], tmp);
        if (tmp[2] < 0) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.18)"; ctx.beginPath(); ctx.arc(tmp[0], tmp[1], 2, 0, Math.PI * 2); ctx.fill();
          return;
        }
        const r = p.hub ? 4.5 : p.small ? 2.6 : 3.6;
        const glow = ctx.createRadialGradient(tmp[0], tmp[1], 0, tmp[0], tmp[1], r * 4);
        glow.addColorStop(0, "rgba(255, 255, 255, 0.55)"); glow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(tmp[0], tmp[1], r * 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(tmp[0], tmp[1], r, 0, Math.PI * 2); ctx.fill();
        if (p.hub && !reduce) {
          const ph = (clock * 0.6) % 1;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * (1 - ph)})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(tmp[0], tmp[1], r + ph * 14, 0, Math.PI * 2); ctx.stroke();
        }
        if (p.label && tmp[2] > 0.15) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, tmp[2] * 2)})`;
          ctx.textAlign = p.left ? "right" : "left";
          ctx.fillText(p.label, p.left ? tmp[0] - r - 7 : tmp[0] + r + 7, tmp[1]);
          ctx.textAlign = "left";
        }
      });
      pr(eeLabelAt[0], eeLabelAt[1], eeLabelAt[2], tmp);
      if (tmp[2] > 0.15) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, tmp[2] * 2)})`;
        ctx.fillText("Eastern Europe", tmp[0], tmp[1]);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now; clock += dt;
      if (!dragging) {
        const target = reduce ? 0 : AUTO_SPEED;
        vel += (target - vel) * (1 - Math.exp(-dt * 1.2)); // inertia eases back to the idle spin
        angle += vel * dt;
      }
      draw();
      if (visible) raf = requestAnimationFrame(frame); else running = false;
    };
    const start = () => { if (!running) { running = true; prev = performance.now(); raf = requestAnimationFrame(frame); } };

    // --- drag to spin (horizontal only; vertical swipes still scroll the page)
    const down = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastT = e.timeStamp; dragVel = 0;
      canvas.setPointerCapture(e.pointerId); canvas.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dt = Math.max(1, e.timeStamp - lastT) / 1000;
      let d = (e.clientX - lastX) / R;                     // dragging by one radius = one radian
      const cap = MAX_SPEED * dt; d = Math.max(-cap, Math.min(cap, d));
      angle += d; dragVel = dragVel * 0.6 + (d / dt) * 0.4;
      lastX = e.clientX; lastT = e.timeStamp;
      if (!running) draw();
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false; canvas.style.cursor = "grab";
      if (e.timeStamp - lastT > 80) dragVel = 0;          // held still before letting go: no fling
      vel = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, dragVel));
      start();
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    // --- load map data when near the viewport; animate only while visible
    let loaded = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !loaded) {
        loaded = true;
        Promise.all([import("world-atlas/countries-110m.json"), import("topojson-client")]).then(([world, topo]) => {
          const t = (world as unknown as { default: TopoJSON.Topology }).default ?? (world as unknown as TopoJSON.Topology);
          const fc = topo.feature(t, t.objects.countries) as unknown as GeoJSON.FeatureCollection;
          const list: { line: Float32Array; ours: boolean }[] = [];
          for (const f of fc.features) {
            const ours = OUR_COUNTRY_IDS.has(String(f.id));
            const g = f.geometry;
            const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
            for (const poly of polys) for (const ringC of poly) list.push({ line: lonLatLine(ringC as LonLat[]), ours });
          }
          countries = list;
          draw();
        });
      }
      if (visible) start();
    }, { rootMargin: "200px" });
    io.observe(box);

    const ro = new ResizeObserver(resize);
    ro.observe(box);
    resize();

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div ref={wrap} className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={cvs}
        role="img"
        aria-label="Globe showing where Medixis operates: Denmark (headquarters in Aarhus), Eastern Europe (Poland, Romania, Bulgaria and Latvia), Morocco and Nigeria, connected by lines."
        className="absolute inset-0 cursor-grab touch-pan-y select-none"
      />
    </div>
  );
}
