import type { Metadata } from "next";
import PageHeader, { Chapter } from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Opportunities to work with Medixis as an international affiliate or business-development partner.",
  alternates: { canonical: "/careers/" },
};

const roles = [
  { title: "International affiliates", body: "Represent Medixis in your region and introduce private clinics and hospitals that need equipment." },
  { title: "Business-development partners", body: "Help us grow the supplier network and open new markets." },
];

export default function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Help healthcare get what it needs."
        lead="We have no open employee positions right now. We are, however, looking for people who want to grow with us as affiliates and partners."
      />

      <section aria-label="Opportunities" className="pb-[var(--spacing-chapter)]">
        <ul className="container-content grid gap-6 md:grid-cols-2">
          {roles.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.08} className="flex flex-col justify-between gap-10 rounded-[var(--radius-panel)] border border-ink/10 bg-white p-8 md:p-12">
              <div>
                <h2 className="text-[1.75rem] leading-tight tracking-[var(--tracking-heading)]">{r.title}</h2>
                <p className="mt-3 text-muted">{r.body}</p>
              </div>
              <MagneticButton href="/partners/" variant="secondary" className="self-start">Learn more <Arrow /></MagneticButton>
            </Reveal>
          ))}
        </ul>
      </section>

      <Chapter id="future" title="Not seeing the right fit?" tone="mist">
        <p className="mt-6 max-w-xl text-muted">
          Send a short note about yourself to <a className="text-accent underline underline-offset-4" href={`mailto:${site.email}?subject=Careers`}>{site.email}</a> and we will keep you in mind as Medixis grows.
        </p>
      </Chapter>
    </>
  );
}
