import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { stats, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the people behind Medixis.",
  alternates: { canonical: "/team/" },
};

export default function Team() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="The people behind your orders."
        lead={`Medixis is a founder-led team of ${stats.teamSize} across ${stats.countries} countries. When you send a request, you deal directly with the people accountable for it.`}
      />

      <section aria-label="Leadership" className="pb-[var(--spacing-chapter)]">
        <ul className="container-content grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.06}>
              <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-mist">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photo} alt={`Portrait of ${p.name}`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
              </div>
              <h2 className="mt-6 text-[1.375rem] leading-tight tracking-[var(--tracking-heading)]">{p.name}</h2>
              <p className="mt-1 font-semibold text-accent">{p.role}</p>
              <a href={`mailto:${p.email}`} className="mt-2 inline-block text-small text-muted hover:text-ink">{p.email}</a>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="chapter bg-mist">
        <div className="container-content flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-h2 max-w-[16ch]">Want to work with us?</h2>
            <p className="mt-4 max-w-md text-muted">We are building a network of international affiliates and business-development partners.</p>
          </div>
          <MagneticButton href="/careers/">See opportunities <Arrow /></MagneticButton>
        </div>
      </section>
    </>
  );
}
