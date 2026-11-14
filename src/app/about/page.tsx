import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import WhereWeWork from "@/components/about/WhereWeWork";
import ContactDiagram from "@/components/about/ContactDiagram";
import Reveal from "@/components/Reveal";
import { asset, mission, threeSides, values, vision, whoWeAre, whyMedixis } from "@/lib/site";

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

      {/* WHO WE ARE — centred, with the with/without diagram */}
      <section aria-labelledby="who-we-are" className="pb-[var(--spacing-chapter)]">
        <div className="container-content">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Who we are</p>
            <h2 id="who-we-are" className="text-h2 mx-auto mt-4 max-w-[20ch]">A sourcing partner that works for the clinic.</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-center">
            <Reveal><p className="text-lead text-ink">{whoWeAre.lead}</p></Reveal>
            {whoWeAre.paragraphs.map((para, i) => (
              <Reveal key={i} delay={0.04 * (i + 1)}><p className="text-body">{para}</p></Reveal>
            ))}
            <p className="todo inline-block text-small">Draft written from the company profile. Add wording from the Medixis LinkedIn posts before launch.</p>
          </div>
          <ContactDiagram />
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

      {/* WHY MEDIXIS — navy */}
      <section aria-labelledby="why" className="chapter navy on-dark">
        <div className="container-content">
          <StoryHead id="why" eyebrow="Why Medixis" title="What working with us is like." />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {whyMedixis.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.05} className="border-t border-ink/15 pt-6">
                <h3 className="text-h3">{w.title}</h3>
                <p className="mt-3 text-muted">{w.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* THREE SIDES — white */}
      <section aria-labelledby="sides" className="chapter">
        <div className="container-content">
          <StoryHead id="sides" eyebrow="How Medixis is built" title="Three sides, one network." />
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {threeSides.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.06} className="flex flex-col justify-between rounded-[var(--radius-panel)] border border-ink/10 p-8">
                <div>
                  <span className="text-small font-semibold text-accent" aria-hidden="true">0{i + 1}</span>
                  <h3 className="mt-4 text-h3">{t.title}</h3>
                  <p className="mt-3 text-muted">{t.body}</p>
                </div>
                <Link href={t.href} className="mt-8 inline-flex min-h-11 items-center font-semibold text-accent hover:text-accent-strong">{t.cta} →</Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <WhereWeWork />
    </>
  );
}
