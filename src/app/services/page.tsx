import type { Metadata } from "next";
import PageHeader, { Chapter } from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { audiences, categories, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Medical equipment sourcing, supplier matching, itemised quotation, contracting and delivery for hospitals, clinics, care homes and rehabilitation providers.",
  alternates: { canonical: "/services/" },
};

const handled = [
  { title: "Sourcing & supplier matching", body: "We match your specification against our vetted supplier network across the EU and beyond, and shortlist the options that fit." },
  { title: "Itemised quotation", body: "Pricing, specifications and lead times side by side — typically within 24 hours, with payment terms confirmed in writing." },
  { title: "Contracting", body: "Once you approve, we handle contracting with the supplier, so you keep a single commercial relationship." },
  { title: "Delivery & support", body: "Equipment ships directly to your facility with tracking, and we stay involved until it is installed and running." },
];

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="From single items to full departments."
        lead="Whether it's twelve patient monitors for a regional hospital or a complete tender, we source across categories through one coordinator."
      />

      <section aria-labelledby="handled" className="pb-[var(--spacing-chapter)]">
        <div className="container-content">
          <h2 id="handled" className="sr-only">What we handle</h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {handled.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 2) * 0.08} className="flex min-h-[280px] flex-col justify-between rounded-[var(--radius-panel)] bg-mist p-8 md:p-10">
                <span className="text-h2 font-semibold text-accent" aria-hidden="true">0{i + 1}</span>
                <div className="mt-10">
                  <h3 className="text-[1.75rem] leading-tight tracking-[var(--tracking-heading)]">{s.title}</h3>
                  <p className="mt-3 max-w-md text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Chapter id="categories" eyebrow="What we source" title="Equipment categories." tone="mist">
        <ul className="mt-12 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.title} className="border-b border-ink/15 py-7 sm:pr-8">
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{c.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-muted">Can&rsquo;t see what you need? Ask anyway — no request is left unanswered.</p>
      </Chapter>

      <Chapter id="who" eyebrow="Who we serve" title="Built for the facilities that care for patients.">
        <ul className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.06} className="border-t border-ink/15 pt-6">
              <h3 className="text-xl">{a.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{a.body}</p>
            </Reveal>
          ))}
        </ul>
      </Chapter>

      <Chapter id="process" eyebrow="Process" title="Four steps. One coordinator." tone="mist">
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.06} className="border-t border-ink/15 pt-6">
              <span className="text-small font-semibold text-accent">{s.n}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-10 text-small text-muted">Timelines vary with product availability, supplier lead times and delivery requirements.</p>
      </Chapter>

      <section className="chapter bg-ink text-center on-dark">
        <div className="container-content">
          <h2 className="text-h2 mx-auto max-w-[18ch] text-on-dark">Send us your specification.</h2>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact/" variant="light">Get a quote <Arrow /></MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
