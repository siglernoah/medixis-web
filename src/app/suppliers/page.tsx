import type { Metadata } from "next";
import PageHeader, { Chapter } from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MailtoForm from "@/components/MailtoForm";
import { Input, SubmitButton, TextArea } from "@/components/Field";

export const metadata: Metadata = {
  title: "For suppliers",
  description: "Medixis brings medical equipment suppliers qualified private-clinic buyers. You pay a commission only on completed deals.",
  alternates: { canonical: "/suppliers/" },
};

const points = [
  { title: "Qualified buyers", body: "We bring you private clinics and hospitals with a real, described need. Not lists, not cold leads." },
  { title: "Commission on completed deals only", body: "You pay Medixis a commission when a deal completes. Nothing before that." },
  { title: "You invoice the clinic", body: "Your commercial relationship is with the clinic. You quote, deliver and invoice them directly." },
  { title: "Fair competition", body: "Clinics choose on fit: price, warranty, service and delivery. Good offers win." },
];

const steps = [
  { title: "Introduce your company", body: "Tell us what you supply and where you deliver." },
  { title: "We assess you", body: "We check your business, regulatory documentation, products and commercial reliability before we match you with any clinic." },
  { title: "Quote on matched requests", body: "When a clinic's request fits what you offer, we ask you to quote. If the clinic chooses you, you invoice them and pay us our commission." },
];

export default function Suppliers() {
  return (
    <>
      <PageHeader
        eyebrow="For suppliers"
        title="Qualified private-clinic buyers. You pay only when a deal completes."
        lead="Medixis matches private clinics and hospitals with vetted suppliers. If your products fit what they need, we put your quote in front of them."
      />

      <section aria-label="What suppliers get" className="pb-[var(--spacing-chapter)]">
        <ul className="container-content grid gap-4 md:grid-cols-2">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.08} className="rounded-[var(--radius-panel)] border border-ink/10 bg-white p-8 md:p-10">
              <h2 className="text-[1.75rem] leading-tight tracking-[var(--tracking-heading)]">{p.title}</h2>
              <p className="mt-3 max-w-md text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <Chapter id="supplier-process" eyebrow="How it works" title="Three steps to your first matched request." tone="mist">
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="border-t border-ink/15 pt-6">
              <span className="text-small font-semibold text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-small text-muted">Commission rates and terms are agreed in writing before you quote on any request.</p>
      </Chapter>

      <section id="supplier-contact" aria-labelledby="supplier-contact-title" className="chapter">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 id="supplier-contact-title" className="text-h2 mt-4">Tell us what you supply.</h2>
            <p className="mt-6 max-w-sm text-muted">We read every message and reply personally.</p>
          </div>
          <MailtoForm subject="Supplier enquiry" className="rounded-[var(--radius-panel)] border border-ink/10 bg-white p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <Input label="Company name" name="Company" required autoComplete="organization" />
              <Input label="Website" name="Website" autoComplete="url" />
              <Input label="Your name" name="Name" required autoComplete="name" />
              <Input label="Email" name="Email" type="email" required autoComplete="email" />
              <Input label="Phone (optional)" name="Phone" type="tel" autoComplete="tel" />
              <Input label="Countries you deliver to" name="Delivery countries" required />
              <TextArea label="What do you supply?" name="Products" required className="md:col-span-2" hint="Product types, brands you carry, and any certifications you hold." />
            </div>
            <div className="mt-8"><SubmitButton>Send enquiry</SubmitButton></div>
          </MailtoForm>
        </div>
      </section>
    </>
  );
}
