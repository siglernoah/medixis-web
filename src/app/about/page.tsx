import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
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

      {/* GROWTH — navy */}
      <section aria-labelledby="growth" className="navy on-dark chapter">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Growing with purpose</p>
            <h2 id="growth" className="text-h2 mt-4 max-w-[16ch]">A distributed team, headquartered in {site.city}.</h2>
            <p className="mt-6 max-w-lg">
              We are building long-term relationships with private clinics, private hospitals and the suppliers who serve them, with one aim: to take sourcing work off clinics so their teams can spend more time on patient care.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY + closing call to action */}
      <section aria-labelledby="story" className="chapter">
        <div className="container-content">
          <StoryHead id="story" eyebrow="Our story" title="More than connecting suppliers and providers." />
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
            <div className="space-y-6 md:col-start-2">
              {story.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}><p className={i === 0 ? "text-lead text-ink" : "text-body"}>{para}</p></Reveal>
              ))}
              <div className="flex flex-wrap gap-3 pt-6">
                <MagneticButton href="/contact/">Request quotes <Arrow /></MagneticButton>
                <MagneticButton href="/team/" variant="secondary">Meet the team</MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
