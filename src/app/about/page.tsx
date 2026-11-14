import type { Metadata } from "next";
import PageHeader, { Chapter } from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { mission, site, stats, story, values, vision } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Medixis simplifies medical procurement for healthcare facilities. Our mission, vision, values and story.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Medixis"
        title="Healthcare supply chains can work better."
        lead="Healthcare providers shouldn't have to manage multiple suppliers, compare countless quotations and coordinate procurement alone. We exist so they don't have to."
      />

      <div className="container-content">
        <Reveal className="aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] md:aspect-[16/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/team-meeting.webp" alt="The Medixis team discussing company strategy around a meeting table" className="h-full w-full object-cover object-[50%_40%]" />
        </Reveal>
      </div>

      {/* Mission & vision */}
      <section aria-label="Mission and vision" className="chapter">
        <div className="container-content grid gap-16 md:grid-cols-2 md:gap-12">
          {[
            { label: "Our mission", ...mission },
            { label: "Our vision", ...vision },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="border-t border-ink/15 pt-8">
              <h2 className="eyebrow">{m.label}</h2>
              <p className="mt-6 text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.12] tracking-[var(--tracking-heading)] text-ink">{m.statement}</p>
              <p className="mt-6 max-w-md text-muted">{m.why}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Chapter id="values" eyebrow="Our values" title="What we stand for." tone="mist">
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.06} className="border-t-2 border-accent pt-6">
              <h3 className="text-h3 tracking-[var(--tracking-heading)]">{v.title}</h3>
              <p className="mt-3 text-muted">{v.body}</p>
            </Reveal>
          ))}
        </ul>
      </Chapter>

      <Chapter id="story" eyebrow="Our story" title="More than connecting suppliers and providers.">
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
          <div className="space-y-6 md:col-start-2">
            {story.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}><p className={i === 0 ? "text-lead text-ink" : "text-body"}>{para}</p></Reveal>
            ))}
          </div>
        </div>
      </Chapter>

      <section aria-labelledby="growth" className="on-dark chapter bg-ink text-on-dark-muted">
        <div className="container-content grid gap-12 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <p className="text-small font-semibold text-accent-on-dark">Growing with purpose</p>
            <h2 id="growth" className="text-h2 mt-4 max-w-[16ch] text-on-dark">A distributed team, headquartered in {site.city}.</h2>
            <p className="mt-6 max-w-lg">
              We are expanding into new markets and building long-term collaborations with hospitals, clinics and elderly care facilities — always with one aim: to reduce the operational burden on our clients so their teams can spend more time on patient care.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-8 border-t border-white/15 pt-8">
              <div><dt>Team members</dt><dd className="text-h1 mt-2 font-semibold text-on-dark">{stats.teamSize}</dd></div>
              <div><dt>Countries</dt><dd className="text-h1 mt-2 font-semibold text-on-dark">{stats.countries}</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="chapter text-center">
        <div className="container-content">
          <h2 className="text-h2 mx-auto max-w-[18ch]">See how we can help your facility.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/contact/">Get a quote <Arrow /></MagneticButton>
            <MagneticButton href="/team/" variant="secondary">Meet the team</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
