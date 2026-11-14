import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Globe from "@/components/Globe";
import Reveal from "@/components/Reveal";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { asset, mission, site, story, values, vision, whoWeAre } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who Medixis is and what we stand for: a founder-led sourcing partner that finds and vets equipment quotes for private clinics and hospitals, free for clinics.",
  alternates: { canonical: "/about/" },
};

/** Shared "story" layout: eyebrow + heading top-left, text in the right-hand column. */
function StoryHead({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="text-h2 mt-4 max-w-[20ch]">{title}</h2>
    </Reveal>
  );
}

const places = [
  { name: "Denmark", detail: "Headquarters, Aarhus" },
  { name: "Eastern Europe", detail: "Poland, Romania, Bulgaria, Latvia" },
  { name: "Morocco", detail: "North Africa" },
  { name: "Nigeria", detail: "West Africa" },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Medixis"
        title="Healthcare supply chains can work better."
        lead="Clinics shouldn't have to chase suppliers and compare quotes on their own. We do that legwork for free. Suppliers pay us, and the clinic always decides."
      />

      {/* WHO WE ARE — replaces the large photo */}
      <section aria-labelledby="who-we-are" className="pb-[var(--spacing-chapter)]">
        <div className="container-content">
          <StoryHead id="who-we-are" eyebrow="Who we are" title="A sourcing partner that works for the clinic." />
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
            <div className="space-y-6 md:col-start-2">
              <Reveal><p className="text-lead text-ink">{whoWeAre.lead}</p></Reveal>
              {whoWeAre.paragraphs.map((para, i) => (
                <Reveal key={i} delay={0.04 * (i + 1)}><p className="text-body">{para}</p></Reveal>
              ))}
              <p className="todo inline-block text-small">Draft written from the company profile. Add wording from the Medixis LinkedIn posts before launch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES — navy */}
      <section aria-labelledby="values" className="chapter navy on-dark">
        <div className="container-content">
          <StoryHead id="values" eyebrow="Our values" title="What we stand for." />
          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06} className="border-t border-ink/15 pt-6">
                <h3 className="text-h3">{v.title}</h3>
                <p className="mt-3 text-muted">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* MISSION & VISION — photo left, text right, story style */}
      <section aria-labelledby="mission" className="chapter">
        <div className="container-content grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] md:sticky md:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/images/team-meeting.webp")} alt="The Medixis team discussing company strategy around a meeting table" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </Reveal>
          <div>
            <StoryHead id="mission" eyebrow="Our mission & vision" title="Why we do this, and where we're going." />
            <div className="mt-10 space-y-10">
              {[
                { label: "Mission", ...mission },
                { label: "Vision", ...vision },
              ].map((m, i) => (
                <Reveal key={m.label} delay={i * 0.06} className="border-t border-ink/15 pt-6">
                  <h3 className="text-small font-semibold text-muted" style={{ fontFamily: "var(--font-sans)" }}>{m.label}</h3>
                  <p className="text-lead mt-3 text-ink">{m.statement}</p>
                  <p className="mt-3 text-body">{m.why}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY + WHERE WE WORK — navy, with the interactive globe */}
      <section aria-labelledby="story" className="chapter navy on-dark overflow-hidden">
        <div className="container-content">
          <StoryHead id="story" eyebrow="Our story · Where we work" title="More than connecting suppliers and providers." />
          <div className="mt-12 grid items-start gap-12 md:grid-cols-2 md:gap-16">
            <div className="md:sticky md:top-24">
              <Globe className="mx-auto max-w-[36rem]" />
              <p className="mt-2 text-center text-small text-muted" aria-hidden="true">Drag to spin</p>
              <ul className="mt-8 grid gap-4 border-t border-ink/15 pt-6 text-[1rem] sm:grid-cols-2" aria-label="Where Medixis operates">
                {places.map((p) => (
                  <li key={p.name} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <span><span className="font-semibold text-ink">{p.name}</span><br /><span className="text-muted">{p.detail}</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <Reveal>
                <p className="text-lead text-ink">
                  We work as a distributed team, headquartered in {site.city}, with operations across Eastern Europe, Morocco and Nigeria.
                </p>
              </Reveal>
              {story.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}><p className="text-body">{para}</p></Reveal>
              ))}
              <Reveal>
                <p className="text-body">
                  Wherever we work, the aim is the same: to take sourcing work off clinics so their teams can spend more time on patient care.
                </p>
              </Reveal>
              <div className="flex flex-wrap gap-3 pt-6">
                <MagneticButton href="/contact/" variant="light">Request quotes <Arrow /></MagneticButton>
                <MagneticButton href="/team/" variant="ghost">Meet the team</MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
