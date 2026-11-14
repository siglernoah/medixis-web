"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { regions, type RegionId } from "@/lib/site";

/**
 * Interactive navy wireframe globe, drawn on one fixed full-viewport canvas (no WebGL).
 *
 * Normal state: the globe is drawn over an in-flow placeholder (so it scrolls with the page), spins
 * slowly, and can be dragged left/right (capped at one turn per 0.5 s). Locations are clickable.
 * Focused state: the camera spins to the chosen region, then zooms until it fills the screen,
 * a little like Google Earth. Closing reverses it. Detailed (50m) borders load on first focus.
 */

type LonLat = [number, number];
type V3 = [number, number, number];
const DEG = Math.PI / 180;
const MAX_SPEED = (2 * Math.PI) / 0.5;   // one rotation per half second (rad/s)
const AUTO_SPEED = 0.09;                 // idle spin (rad/s)
const BASE_TILT = 24 * DEG;
const NAV_H = 64;
const FLY_MS = 2800, BACK_MS = 2000;

// Navy palette
const LINE = "150, 185, 230";
const RIM = "120, 165, 225";

const P = {
  dk: [10.2, 56.16] as LonLat, pl: [21.01, 52.23] as LonLat, lv: [24.11, 56.95] as LonLat,
  ro: [26.1, 44.43] as LonLat, bg: [23.32, 42.7] as LonLat, ma: [-6.83, 34.02] as LonLat, ng: [7.4, 9.08] as LonLat,
};
const EE_CENTER: LonLat = [23.6, 49.8];
const POINTS: { at: LonLat; region: RegionId; label: string; hub?: boolean; small?: boolean; left?: boolean }[] = [
  { at: P.dk, region: "denmark", label: "Denmark · HQ", hub: true, left: true },
  { at: P.pl, region: "eastern-europe", label: "Poland", small: true },
  { at: P.lv, region: "eastern-europe", label: "Latvia", small: true },
  { at: P.ro, region: "eastern-europe", label: "Romania", small: true },
  { at: P.bg, region: "eastern-europe", label: "Bulgaria", small: true, left: true },
  { at: P.ma, region: "morocco", label: "Morocco" },
  { at: P.ng, region: "nigeria", label: "Nigeria" },
];
const MAIN_LINKS: [LonLat, LonLat][] = [[P.dk, P.pl], [P.dk, P.ma], [P.dk, P.ng], [P.ma, P.ng]];
const MINOR_LINKS: [LonLat, LonLat][] = [[P.lv, P.pl], [P.pl, P.ro], [P.ro, P.bg], [P.pl, P.bg], [P.lv, P.ro]];
const COUNTRY_TO_REGION = new Map<string, RegionId>();
regions.forEach((r) => r.countryIds.forEach((id) => COUNTRY_TO_REGION.set(id, r.id)));

const toVec = ([lon, lat]: LonLat): V3 => [
  Math.cos(lat * DEG) * Math.sin(lon * DEG), Math.sin(lat * DEG), Math.cos(lat * DEG) * Math.cos(lon * DEG),
];
const lonLatLine = (coords: LonLat[]) => {
  const out = new Float32Array(coords.length * 3);
  coords.forEach((c, i) => out.set(toVec(c), i * 3));
  return out;
};
function arc(a: LonLat, b: LonLat, lift: number, n = 48) {
  const A = toVec(a), B = toVec(b);
  const w = Math.acos(Math.min(1, Math.max(-1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]))), s = Math.sin(w) || 1;
  const h = Math.min(0.22, w * lift), out = new Float32Array((n + 1) * 3);
  for (let i = 0; i <= n; i++) {
    const t = i / n, k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s, m = 1 + h * Math.sin(Math.PI * t);
    for (let j = 0; j < 3; j++) out[i * 3 + j] = (A[j] * k1 + B[j] * k2) * m;
  }
  return out;
}
function ring(c: LonLat, d: number, n = 64) {
  const C = toVec(c), up: V3 = [0, 1, 0];
  const u = [C[1] * up[2] - C[2] * up[1], C[2] * up[0] - C[0] * up[2], C[0] * up[1] - C[1] * up[0]];
  const ul = Math.hypot(u[0], u[1], u[2]); u[0] /= ul; u[1] /= ul; u[2] /= ul;
  const v = [C[1] * u[2] - C[2] * u[1], C[2] * u[0] - C[0] * u[2], C[0] * u[1] - C[1] * u[0]];
  const out = new Float32Array((n + 1) * 3);
  for (let i = 0; i <= n; i++) {
    const th = (i / n) * Math.PI * 2;
    for (let j = 0; j < 3; j++) out[i * 3 + j] = C[j] * Math.cos(d) + (u[j] * Math.cos(th) + v[j] * Math.sin(th)) * Math.sin(d);
  }
  return out;
}
// Ray-casting point-in-polygon on lon/lat rings (good enough to keep waves off land).
function inRing(lon: number, lat: number, r: LonLat[]) {
  let inside = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i], [xj, yj] = r[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const seg = (t: number, a: number, b: number) => ease(Math.min(1, Math.max(0, (t - a) / (b - a))));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const wrapPi = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

type View = { cx: number; cy: number; R: number; yaw: number; tilt: number };
type Country = { line: Float32Array; region?: RegionId };

async function loadCountries(res: "110m" | "50m") {
  const [world, topo] = await Promise.all([
    res === "110m" ? import("world-atlas/countries-110m.json") : import("world-atlas/countries-50m.json"),
    import("topojson-client"),
  ]);
  const t = ((world as { default?: unknown }).default ?? world) as TopoJSON.Topology;
  const fc = topo.feature(t, t.objects.countries) as unknown as GeoJSON.FeatureCollection;
  const list: Country[] = [], raw: LonLat[][] = [];
  for (const f of fc.features) {
    const region = COUNTRY_TO_REGION.get(String(f.id));
    const g = f.geometry;
    const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
    for (const poly of polys) for (const r of poly) { list.push({ line: lonLatLine(r as LonLat[]), region }); raw.push(r as LonLat[]); }
  }
  return { list, raw };
}

export default function Globe({
  selected, onSelect, className = "",
}: { selected: RegionId | null; onSelect: (id: RegionId) => void; className?: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const api = useRef<{ focus: (id: RegionId | null) => void } | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = cvs.current!, box = holder.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- static geometry
    const grat: Float32Array[] = [];
    for (let lat = -75; lat <= 75; lat += 15) { const p: LonLat[] = []; for (let lon = -180; lon <= 180; lon += 3) p.push([lon, lat]); grat.push(lonLatLine(p)); }
    for (let lon = -180; lon < 180; lon += 15) { const p: LonLat[] = []; for (let lat = -90; lat <= 90; lat += 3) p.push([lon, lat]); grat.push(lonLatLine(p)); }
    const mainArcs = MAIN_LINKS.map(([a, b]) => arc(a, b, 0.16));
    const minorArcs = MINOR_LINKS.map(([a, b]) => arc(a, b, 0.05, 20));
    const eeRing = ring(EE_CENTER, 9.5 * DEG);
    const eeLabelAt = toVec([EE_CENTER[0] + 13, EE_CENTER[1] + 3]);
    const pointVecs = POINTS.map((p) => toVec(p.at));
    let countries: Country[] = [];
    let waves: { lon: number; lat: number; ph: number }[] = [];
    let detailLoading = false;

    // ---------- view state
    let vw = window.innerWidth, vh = window.innerHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
    const view: View = { cx: 0, cy: 0, R: 0, yaw: -16 * DEG, tilt: BASE_TILT };
    let mode: "normal" | "flying" | "focused" | "returning" = "normal";
    let focusId: RegionId | null = null;
    let from: View = { ...view }, to: View = { ...view }, t0 = 0, dur = 1;
    let vel = reduce ? 0 : AUTO_SPEED;
    let dragging = false, downX = 0, lastX = 0, lastT = 0, dragVel = 0, moved = 0;
    let raf = 0, running = false, visible = false, prev = performance.now(), clock = 0;
    let ca = 1, sa = 0, ct = 1, st = 0;
    const tmp: V3 = [0, 0, 0];
    let regionPaths: { id: RegionId; path: Path2D }[] = [];

    const homeView = (): View => {
      const r = box.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, R: r.width * 0.4, yaw: view.yaw, tilt: BASE_TILT };
    };
    const focusView = (id: RegionId): View => {
      const reg = regions.find((x) => x.id === id)!;
      const stageH = vh - NAV_H, s = Math.min(vw, stageH);
      const wide = vw >= 1024;
      // Leave room for the info panel: on wide screens the region sits right of centre.
      const cx = wide ? vw * 0.62 : vw / 2, cy = wide ? NAV_H + stageH / 2 : NAV_H + stageH * 0.36;
      const R = (s * (wide ? 0.36 : 0.3)) / Math.sin(reg.radius * DEG);
      const yaw = view.yaw + wrapPi(-reg.center[0] * DEG - view.yaw);
      return { cx, cy, R, yaw, tilt: reg.center[1] * DEG };
    };

    const pr = (x: number, y: number, z: number, o: V3) => {
      const x1 = x * ca + z * sa, z1 = z * ca - x * sa;
      const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
      o[0] = view.cx + x1 * view.R; o[1] = view.cy - y2 * view.R; o[2] = z2;
      return o;
    };
    const polyline = (pts: Float32Array, front: Path2D, back: Path2D | null, lifted = false) => {
      let pf = false, pb = false;
      const R2 = view.R * view.R;
      for (let i = 0; i < pts.length; i += 3) {
        pr(pts[i], pts[i + 1], pts[i + 2], tmp);
        const dx = tmp[0] - view.cx, dy = tmp[1] - view.cy;
        if (tmp[2] >= 0 || (lifted && dx * dx + dy * dy > R2)) {
          if (pf) front.lineTo(tmp[0], tmp[1]); else front.moveTo(tmp[0], tmp[1]);
          pf = true; pb = false;
        } else if (back) {
          if (pb) back.lineTo(tmp[0], tmp[1]); else back.moveTo(tmp[0], tmp[1]);
          pb = true; pf = false;
        } else { pf = false; }
      }
    };

    const resize = () => {
      vw = window.innerWidth; vh = window.innerHeight; dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = vw * dpr; canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`; canvas.style.height = `${vh}px`;
      if (mode === "focused" && focusId) Object.assign(view, focusView(focusId));
      draw();
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (mode === "normal" && !visible) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ca = Math.cos(view.yaw); sa = Math.sin(view.yaw); ct = Math.cos(view.tilt); st = Math.sin(view.tilt);
      const { cx, cy, R } = view;
      const home = homeView().R || R;
      const zoom = R / home;                                  // 1 at rest, large when focused
      const farFade = Math.max(0, Math.min(1, (2.2 - zoom) / 1.2)); // hide the far side as we zoom in

      // halo
      if (farFade > 0) {
        const halo = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.22);
        halo.addColorStop(0, `rgba(${RIM}, ${0.22 * farFade})`); halo.addColorStop(1, `rgba(${RIM}, 0)`);
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2); ctx.fill();
      }

      // far side first, then the navy body over it, so it reads as seen through the globe
      if (farFade > 0) {
        const gB = new Path2D(), cB = new Path2D();
        for (const g of grat) polyline(g, new Path2D(), gB);
        for (const c of countries) polyline(c.line, new Path2D(), cB);
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = `rgba(${LINE}, ${0.1 * farFade})`; ctx.stroke(gB);
        ctx.strokeStyle = `rgba(${LINE}, ${0.22 * farFade})`; ctx.stroke(cB);
      }
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.05, cx, cy, R);
      body.addColorStop(0, "rgba(24, 56, 104, 0.78)");
      body.addColorStop(0.7, "rgba(12, 32, 64, 0.82)");
      body.addColorStop(1, "rgba(10, 26, 52, 0.9)");
      ctx.fillStyle = body; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      if (farFade > 0) { ctx.strokeStyle = `rgba(${RIM}, ${0.6 * farFade})`; ctx.lineWidth = 1.2; ctx.stroke(); }

      // graticule (front)
      const gF = new Path2D();
      for (const g of grat) polyline(g, gF, null);
      ctx.lineWidth = 0.6; ctx.strokeStyle = `rgba(${LINE}, 0.12)`; ctx.stroke(gF);

      // faint ocean waves
      if (waves.length) {
        const wF = new Path2D();
        const pts = new Float32Array(9 * 3);
        for (const w of waves) {
          for (let k = 0; k < 9; k++) {
            const u = k / 8 - 0.5;
            const v = toVec([w.lon + u * 7, w.lat + 0.45 * Math.sin(u * Math.PI * 3 + clock * 0.8 + w.ph)]);
            pts[k * 3] = v[0]; pts[k * 3 + 1] = v[1]; pts[k * 3 + 2] = v[2];
          }
          polyline(pts, wF, null);
        }
        ctx.lineWidth = 0.8; ctx.lineCap = "round"; ctx.strokeStyle = `rgba(${LINE}, 0.11)`; ctx.stroke(wF);
      }

      // countries (front); Medixis countries filled, selected region brightest
      const cF = new Path2D();
      const ours = new Map<RegionId, Path2D>();
      for (const c of countries) {
        if (c.region) { if (!ours.has(c.region)) ours.set(c.region, new Path2D()); polyline(c.line, ours.get(c.region)!, null); }
        else polyline(c.line, cF, null);
      }
      ctx.lineJoin = "round";
      ctx.lineWidth = zoom > 3 ? 1 : 0.8; ctx.strokeStyle = `rgba(${LINE}, 0.7)`; ctx.stroke(cF);
      regionPaths = [];
      ours.forEach((path, id) => {
        const sel = focusId === id && mode !== "normal";
        ctx.fillStyle = `rgba(255, 255, 255, ${sel ? 0.2 : 0.12})`; ctx.fill(path);
        ctx.lineWidth = sel ? 1.8 : 1.1; ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"; ctx.stroke(path);
        regionPaths.push({ id, path });
      });

      // Eastern Europe ring (only at globe scale)
      if (zoom < 2.5) {
        const rF = new Path2D(); polyline(eeRing, rF, null);
        ctx.setLineDash([3, 4]); ctx.lineWidth = 1.2; ctx.strokeStyle = `rgba(255, 255, 255, ${0.7 * farFade})`; ctx.stroke(rF); ctx.setLineDash([]);
      }

      // links
      const mF = new Path2D(), mB = new Path2D(), nF = new Path2D(), nB = new Path2D();
      for (const a of mainArcs) polyline(a, mF, mB, true);
      for (const a of minorArcs) polyline(a, nF, nB, true);
      ctx.lineCap = "round";
      ctx.lineWidth = 1; ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * farFade})`; ctx.stroke(mB); ctx.stroke(nB);
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)"; ctx.shadowBlur = 6;
      ctx.lineWidth = 1.6; ctx.strokeStyle = "rgba(255, 255, 255, 0.92)"; ctx.stroke(mF);
      ctx.lineWidth = 0.9; ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"; ctx.stroke(nF);
      if (!reduce) {
        mainArcs.forEach((a, k) => {
          const n = a.length / 3 - 1, i = Math.round(((clock * 0.22 + k * 0.27) % 1) * n) * 3;
          pr(a[i], a[i + 1], a[i + 2], tmp);
          const dx = tmp[0] - cx, dy = tmp[1] - cy;
          if (tmp[2] >= 0 || dx * dx + dy * dy > R * R) { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(tmp[0], tmp[1], 2, 0, Math.PI * 2); ctx.fill(); }
        });
      }
      ctx.shadowBlur = 0;

      // points + labels
      const fs = Math.max(11, Math.min(15, Math.round(vw / 110)));
      ctx.textBaseline = "middle";
      POINTS.forEach((p, k) => {
        const v = pointVecs[k]; pr(v[0], v[1], v[2], tmp);
        if (tmp[2] < 0) {
          if (farFade > 0) { ctx.fillStyle = `rgba(255, 255, 255, ${0.18 * farFade})`; ctx.beginPath(); ctx.arc(tmp[0], tmp[1], 2, 0, Math.PI * 2); ctx.fill(); }
          return;
        }
        const r = p.hub ? 4.5 : p.small ? 2.6 : 3.6;
        const g = ctx.createRadialGradient(tmp[0], tmp[1], 0, tmp[0], tmp[1], r * 4);
        g.addColorStop(0, "rgba(255, 255, 255, 0.55)"); g.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(tmp[0], tmp[1], r * 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(tmp[0], tmp[1], r, 0, Math.PI * 2); ctx.fill();
        if (p.hub && !reduce) {
          const ph = (clock * 0.6) % 1;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * (1 - ph)})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(tmp[0], tmp[1], r + ph * 14, 0, Math.PI * 2); ctx.stroke();
        }
        // Small country labels only once zoomed into their region; main labels at globe scale.
        const showLabel = p.small ? zoom > 2.5 && focusId === p.region : tmp[2] > 0.15;
        if (showLabel) {
          ctx.font = `500 ${p.small ? fs : fs}px "IBM Plex Sans", system-ui, sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, tmp[2] * 2)})`;
          ctx.textAlign = p.left ? "right" : "left";
          ctx.fillText(p.label, p.left ? tmp[0] - r - 7 : tmp[0] + r + 7, tmp[1]);
          ctx.textAlign = "left";
        }
      });
      if (zoom < 2.5) {
        pr(eeLabelAt[0], eeLabelAt[1], eeLabelAt[2], tmp);
        if (tmp[2] > 0.15) {
          ctx.font = `500 ${fs}px "IBM Plex Sans", system-ui, sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, tmp[2] * 2) * farFade})`;
          ctx.fillText("Eastern Europe", tmp[0], tmp[1]);
        }
      }
    };

    // ---------- animation loop
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now; clock += dt;
      if (mode === "normal") {
        if (!dragging) {
          vel += ((reduce ? 0 : AUTO_SPEED) - vel) * (1 - Math.exp(-dt * 1.2));
          view.yaw += vel * dt;
        }
        const h = homeView(); view.cx = h.cx; view.cy = h.cy; view.R = h.R; view.tilt = BASE_TILT;
      } else if (mode === "flying" || mode === "returning") {
        const t = Math.min(1, (now - t0) / dur);
        if (mode === "returning") { const h = homeView(); to.cx = h.cx; to.cy = h.cy; to.R = h.R; }
        // Flying: spin and travel first, then zoom. Returning: zoom out first, then travel back.
        const turn = mode === "flying" ? seg(t, 0, 0.55) : seg(t, 0.35, 1);
        const zoomT = mode === "flying" ? seg(t, 0.4, 1) : seg(t, 0, 0.6);
        view.yaw = lerp(from.yaw, to.yaw, turn);
        view.tilt = lerp(from.tilt, to.tilt, turn);
        view.cx = lerp(from.cx, to.cx, turn);
        view.cy = lerp(from.cy, to.cy, turn);
        view.R = Math.exp(lerp(Math.log(from.R), Math.log(to.R), zoomT));
        if (t >= 1) {
          if (mode === "flying") mode = "focused";
          else { mode = "normal"; focusId = null; vel = reduce ? 0 : AUTO_SPEED * 0.5; }
        }
      }
      draw();
      if (visible || mode !== "normal") raf = requestAnimationFrame(frame); else { running = false; draw(); }
    };
    const start = () => { if (!running) { running = true; prev = performance.now(); raf = requestAnimationFrame(frame); } };

    const focus = (id: RegionId | null) => {
      if (id && !detailLoading) {
        detailLoading = true;
        loadCountries("50m").then(({ list }) => { countries = list; }).catch(() => {});
      }
      if (id) {
        focusId = id; from = { ...view }; to = focusView(id);
        mode = reduce ? "focused" : "flying"; t0 = performance.now(); dur = FLY_MS;
        if (reduce) Object.assign(view, to);
      } else if (mode !== "normal") {
        from = { ...view }; to = { ...homeView(), yaw: view.yaw };
        mode = reduce ? "normal" : "returning"; t0 = performance.now(); dur = BACK_MS;
        if (reduce) Object.assign(view, homeView());
        if (reduce) focusId = null; // otherwise kept highlighted until the camera is home
      }
      start();
    };
    api.current = { focus };

    // ---------- pointer: drag to spin, click to select
    const hit = (x: number, y: number): RegionId | null => {
      let best: RegionId | null = null, bestD = 22 * 22;
      POINTS.forEach((p, k) => {
        const v = pointVecs[k]; pr(v[0], v[1], v[2], tmp);
        if (tmp[2] < 0) return;
        const d = (tmp[0] - x) ** 2 + (tmp[1] - y) ** 2;
        if (d < bestD) { bestD = d; best = p.region; }
      });
      if (best) return best;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const r of regionPaths) if (ctx.isPointInPath(r.path, x * dpr, y * dpr)) return r.id;
      return null;
    };
    const down = (e: PointerEvent) => {
      if (mode !== "normal") return;
      dragging = true; downX = lastX = e.clientX; lastT = e.timeStamp; dragVel = 0; moved = 0;
      box.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) {
        if (mode === "normal") box.style.cursor = hit(e.clientX, e.clientY) ? "pointer" : "grab";
        return;
      }
      const dt = Math.max(1, e.timeStamp - lastT) / 1000;
      let d = (e.clientX - lastX) / view.R;
      const cap = MAX_SPEED * dt; d = Math.max(-cap, Math.min(cap, d));
      view.yaw += d; dragVel = dragVel * 0.6 + (d / dt) * 0.4; moved = Math.max(moved, Math.abs(e.clientX - downX));
      lastX = e.clientX; lastT = e.timeStamp; box.style.cursor = "grabbing";
      if (!running) draw();
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false; box.style.cursor = "grab";
      if (moved < 6) { const id = hit(e.clientX, e.clientY); if (id) { onSelectRef.current(id); return; } }
      if (e.timeStamp - lastT > 80) dragVel = 0;
      vel = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, dragVel));
      start();
    };
    box.addEventListener("pointerdown", down);
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerup", up);
    box.addEventListener("pointercancel", up);

    // ---------- data + visibility
    let loaded = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !loaded) {
        loaded = true;
        loadCountries("110m").then(({ list, raw }) => {
          if (!countries.length) countries = list;
          // Wave marks on a loose grid over open water, kept a few degrees away from any coast.
          const w: { lon: number; lat: number; ph: number }[] = [];
          for (let lat = -55; lat <= 60; lat += 10) {
            for (let lon = -180 + ((lat / 10) % 2 ? 9 : 0); lon < 180; lon += 18) {
              const probes: LonLat[] = [[lon, lat], [lon - 5, lat], [lon + 5, lat], [lon, lat - 3.5], [lon, lat + 3.5]];
              if (probes.every(([x, y]) => !raw.some((r) => inRing(x, y, r)))) w.push({ lon, lat, ph: (lon * 7 + lat * 3) % 6.28 });
            }
          }
          waves = w;
          draw();
        });
      }
      if (visible) start(); else if (mode === "normal") draw();
    }, { rootMargin: "200px" });
    io.observe(box);
    const onScroll = () => { if (!running && visible) draw(); };
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll);
      box.removeEventListener("pointerdown", down); box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerup", up); box.removeEventListener("pointercancel", up);
    };
  }, [mounted]);

  useEffect(() => { api.current?.focus(selected); }, [selected]);

  return (
    <>
      <div
        ref={holder}
        role="img"
        aria-label="Globe showing where Medixis operates: Denmark (headquarters in Aarhus), Eastern Europe (Poland, Romania, Bulgaria and Latvia), Morocco and Nigeria. Use the list of locations to open each region."
        className={`relative aspect-square w-full cursor-grab touch-pan-y select-none ${className}`}
      />
      {mounted && createPortal(
        <canvas ref={cvs} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45]" />,
        document.body,
      )}
    </>
  );
}
