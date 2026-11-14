"use client";
import { useEffect, useRef } from "react";

/**
 * Signature hero moment.
 * A slowly rotating 3D field of nodes (facilities + suppliers) that, as the
 * visitor scrolls, connects and converges into the Medixis "X".
 * - Canvas 2D with perspective projection: no WebGL/3D library, ~3 KB.
 * - Starts after idle, pauses off-screen, scales node count to device.
 * - Reduced motion: draws the finished X once, no animation.
 */
type Props = { progressRef: React.RefObject<number> };

const ACCENT = [0, 166, 188]; // logo turquoise
const INK = [190, 205, 222]; // pale blue-grey on navy

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function HeroNetwork({ progressRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) < 4 ||
      // @ts-expect-error — not in all TS DOM libs
      navigator.connection?.saveData === true;
    const small = window.innerWidth < 768;
    const N = lowPower ? 70 : small ? 90 : 150;

    // Build nodes: scattered sphere position -> target on an X
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const nodes = Array.from({ length: N }, (_, i) => {
      // scattered: uniform in a flattened sphere
      const u = rand() * 2 - 1, th = rand() * Math.PI * 2, r = Math.cbrt(rand()) * 1.25;
      const s = Math.sqrt(1 - u * u);
      const sx = r * s * Math.cos(th) * 1.25, sy = r * u, sz = r * s * Math.sin(th);
      // target: alternate between the two diagonals of an X
      const bar = i % 2;
      const t = ((Math.floor(i / 2) + rand() * 0.8) / (N / 2)) * 2 - 1; // evenly along bar
      const w = (rand() * 2 - 1) * 0.08; // across bar (thickness)
      const L = 0.9;
      const dx = bar ? 1 : -1;
      const tx = (t * L + w * dx * -1) * 0.92;
      const ty = t * L * dx + w;
      const tz = (rand() * 2 - 1) * 0.06;
      return { sx, sy, sz, tx, ty, tz, size: 1.2 + rand() * 1.6, phase: rand() * Math.PI * 2 };
    });

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const proj = new Float32Array(N * 3);
    let raf = 0, visible = true, start = performance.now();
    let smooth = reduce ? 1 : 0;

    const draw = (now: number) => {
      const time = (now - start) / 1000;
      const target = reduce ? 1 : Math.min(1, Math.max(0, progressRef.current ?? 0));
      smooth += (target - smooth) * 0.08;
      const p = easeInOut(smooth);

      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w, h) * 0.42;
      const cx = w / 2, cy = h / 2;
      const spin = reduce ? 0 : (1 - p) * (time * 0.12) + (1 - p) * 0.4;
      const tilt = (1 - p) * 0.35;
      const cosY = Math.cos(spin), sinY = Math.sin(spin), cosX = Math.cos(tilt), sinX = Math.sin(tilt);

      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        const drift = reduce ? 0 : (1 - p) * 0.03;
        let x = n.sx + (n.tx - n.sx) * p + Math.sin(time * 0.6 + n.phase) * drift;
        let y = n.sy + (n.ty - n.sy) * p + Math.cos(time * 0.5 + n.phase) * drift;
        let z = n.sz + (n.tz - n.sz) * p;
        // rotate Y then X
        const x1 = x * cosY + z * sinY, z1 = -x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX;
        const persp = 3 / (3 + z2);
        proj[i * 3] = cx + x1 * scale * persp;
        proj[i * 3 + 1] = cy + y1 * scale * persp;
        proj[i * 3 + 2] = persp;
        x = x1; y = y1; z = z2;
      }

      // connections
      const maxD = scale * (0.32 - p * 0.14);
      const maxD2 = maxD * maxD;
      const cr = Math.round(INK[0] + (ACCENT[0] - INK[0]) * p);
      const cg = Math.round(INK[1] + (ACCENT[1] - INK[1]) * p);
      const cb = Math.round(INK[2] + (ACCENT[2] - INK[2]) * p);
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        const ax = proj[i * 3], ay = proj[i * 3 + 1];
        for (let j = i + 1; j < N; j++) {
          const dx = proj[j * 3] - ax, dy = proj[j * 3 + 1] - ay;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const a = (1 - d2 / maxD2) * (0.14 + p * 0.22);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(proj[j * 3], proj[j * 3 + 1]);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (let i = 0; i < N; i++) {
        const persp = proj[i * 3 + 2];
        const a = Math.min(1, 0.35 + (persp - 0.7) * 1.2) * (0.55 + p * 0.45);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(proj[i * 3], proj[i * 3 + 1], nodes[i].size * persp, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    });

    // Defer start until the browser is idle (protects LCP / TBT)
    const begin = () => { start = performance.now(); io.observe(canvas); raf = requestAnimationFrame(draw); };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const handle = idle ? idle(begin, { timeout: 800 }) : window.setTimeout(begin, 200);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      if (!idle) clearTimeout(handle);
    };
  }, [progressRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />;
}
