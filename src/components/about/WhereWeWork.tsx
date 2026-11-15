"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Globe from "@/components/Globe";
import Reveal from "@/components/Reveal";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { regions, site, story, type RegionId } from "@/lib/site";

/**
 * About page: story + where we work. Clicking a region pushes the section's content away while the
 * globe spins to the region and zooms in; the region's write-up then appears beside it.
 */
export default function WhereWeWork() {
  const [selected, setSelected] = useState<RegionId | null>(null);
  const [panelOn, setPanelOn] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const region = regions.find((r) => r.id === selected) ?? null;
  const open = selected !== null;

  const select = useCallback((id: RegionId) => {
    opener.current = document.activeElement as HTMLElement;
    setSelected(id);
  }, []);
  const close = useCallback(() => setSelected(null), []);

  // Panel appears once the camera has mostly arrived; scroll is locked while a region is open.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!open) { setPanelOn(false); document.documentElement.style.overflow = ""; opener.current?.focus?.(); return; }
    document.documentElement.style.overflow = "hidden";
    setPanelOn(false);
    const t = window.setTimeout(() => { setPanelOn(true); heading.current?.focus(); }, reduce ? 0 : 2300);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open, selected, close]);
  useEffect(() => () => { document.documentElement.style.overflow = ""; }, []);

  // Content is pushed out of the way while a region is open.
  const away = (dx: number, dy: number, delay = 0) => ({
    transform: open ? `translate(${dx}px, ${dy}px)` : "none",
    opacity: open ? 0 : 1,
    transition: `transform 900ms cubic-bezier(0.22,1,0.36,1) ${open ? delay : 600 - delay}ms, opacity 700ms ease ${open ? delay : 700 - delay}ms`,
    pointerEvents: open ? ("none" as const) : undefined,
  });

  return (
    <section aria-labelledby="story" className="chapter navy on-dark relative overflow-hidden">
      <div className="container-content" inert={open}>
        <div style={away(0, -90)}>
          <Reveal>
            <p className="eyebrow">Our story · Where we work</p>
            <h2 id="story" className="text-h2 mt-4 max-w-[20ch]">More than connecting suppliers and providers.</h2>
          </Reveal>
        </div>
        <div className="mt-12 grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <div className="md:sticky md:top-24">
            <Globe selected={selected} onSelect={select} className="mx-auto max-w-[36rem]" />
            <p className="mt-2 text-center text-small text-muted" style={away(0, 40)} aria-hidden="true">Drag to spin · click a region</p>
            <ul className="mt-8 grid gap-2 border-t border-ink/15 pt-6 sm:grid-cols-2" aria-label="Where Medixis operates" style={away(-60, 60, 80)}>
              {regions.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => select(r.id)}
                    className="group flex w-full gap-3 rounded-[var(--radius-card)] p-2 text-left transition-colors hover:bg-white/5"
                  >
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <span className="text-[1rem]">
                      <span className="font-semibold text-white">{r.name}</span>
                      <span className="ml-1 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                      <br /><span className="text-muted">{r.detail}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6" style={away(140, 0, 40)}>
            <Reveal>
              <p className="text-lead text-ink">
                We work as a distributed team, headquartered in {site.city}, with operations across Eastern Europe, Morocco and Nigeria.
              </p>
            </Reveal>
            {story.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}><p className="text-body">{para}</p></Reveal>
            ))}
            <Reveal>
              <p className="text-body">Wherever we work, the aim is the same: to take sourcing work off clinics so their teams can spend more time on patient care.</p>
            </Reveal>
            <div className="flex flex-wrap gap-3 pt-6">
              <MagneticButton href="/contact/" variant="light">Request quotes <Arrow /></MagneticButton>
              <MagneticButton href="/team/" variant="ghost">Meet the team</MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen stage behind the globe while a region is open */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[44] bg-ink transition-opacity duration-1000"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={close}
      />

      {/* Region write-up */}
      {region && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="region-title"
          className="fixed inset-x-0 bottom-0 z-[46] p-4 lg:inset-y-0 lg:left-0 lg:right-auto lg:flex lg:w-[min(32rem,42vw)] lg:items-center lg:p-10 lg:pt-24"
          style={{
            opacity: panelOn ? 1 : 0,
            transform: panelOn ? "none" : "translateY(24px)",
            transition: "opacity 600ms ease, transform 800ms cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: panelOn ? "auto" : "none",
          }}
        >
          <div className="on-dark max-h-[55svh] overflow-y-auto rounded-[var(--radius-panel)] border border-white/10 bg-ink/95 p-6 text-on-dark-muted shadow-[0_20px_60px_rgba(8,23,41,0.35)] backdrop-blur-md lg:max-h-[80svh] lg:p-8">
            <p className="eyebrow">Where we work</p>
            <h3 id="region-title" ref={heading} tabIndex={-1} className="mt-3 text-[clamp(2rem,3.4vw,3rem)] leading-tight text-white outline-none">{region.name}</h3>
            <div className="mt-5 space-y-4 text-[1rem] leading-relaxed">
              {region.text.map((t, i) => <p key={i}>{t}</p>)}
            </div>
            <div className="mt-6 border-t border-white/15 pt-5">
              <h4 className="text-small font-semibold text-white">Sources</h4>
              <ul className="mt-3 space-y-3 text-small">
                {region.sources.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-turquoise underline decoration-turquoise/40 underline-offset-4 hover:decoration-turquoise">
                      {src.label}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <span className="block text-on-dark-muted">{src.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/15 pt-5" aria-label="Other regions">
              {regions.filter((r) => r.id !== region.id).map((r) => (
                <button key={r.id} type="button" onClick={() => setSelected(r.id)} className="rounded-full border border-white/20 px-4 py-2 text-small text-white hover:border-white/60">
                  {r.name}
                </button>
              ))}
            </div>
            <button type="button" onClick={close} className="on-light mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 font-semibold text-ink hover:bg-white/85">
              <span aria-hidden="true">←</span> Back to the globe
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
