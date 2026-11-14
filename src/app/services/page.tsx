import type { Metadata } from "next";
import PageHeader, { Chapter } from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { audiences, categories, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Medixis sources and vets medical equipment quotes for private clinics and hospitals, from large equipment to consumables. Free for clinics: suppliers pay us.",
  alternates: { canonical: "/services/" },
};

const handled = [
  { title: "Sourcing", body: "We do the supplier legwork: finding suppliers that can deliver what your clinic has asked for." },
  { title: "Vetting & matching", body: "We assess suppliers and match them to your needs. We are not a directory that leaves the checking to you." },
  { title: "Quotes side by side", body: "You see the options compared on price, warranty, service and delivery, so the differences are clear." },
  { title: "You choose", body: "You make the final decision. The supplier invoices you directly, and Medixis never sends you a bill." },
];

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Equipment sourcing for private clinics, free."
        lead="From a single device to consumables you reorder, we find vetted suppliers and bring you their quotes. Suppliers pay us, not you."
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

      <Chapter id="categories" eyebrow="What we source" title="Large equipment and everyday items." tone="mist">
        <ul className="mt-12 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.title} className="border-b border-ink/15 py-7 sm:pr-8">
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{c.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-muted">We also handle consumables and smaller items, not only large equipment. Can&rsquo;t see what you need? Ask anyway.</p>
      </Chapter>

      <Chapter id="who" eyebrow="Who we serve" title="Built for private clinics and hospitals.">
        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.06} className="border-t border-ink/15 pt-6">
              <h3 className="text-xl">{a.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{a.body}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 text-muted">We don&rsquo;t take part in public tenders or government procurement.</p>
      </Chapter>

      <Chapter id="process" eyebrow="Process" title="Three simple steps." tone="mist">
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.06} className="border-t border-ink/15 pt-6">
              <span className="text-small font-semibold text-accent">{s.n}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-10 text-small text-muted">Timelines depend on product availability and supplier lead times.</p>
      </Chapter>

      <section className="chapter bg-ink text-center on-dark">
        <div className="container-content">
          <h2 className="text-h2 mx-auto max-w-[18ch] text-on-dark">Tell us what your clinic needs.</h2>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact/" variant="light">Request quotes <Arrow /></MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
