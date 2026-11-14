import type { Metadata } from "next";
import PageHeader, { Chapter } from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { vetting } from "@/lib/site";

export const metadata: Metadata = {
  title: "Standards",
  description: "Medixis is not a directory. How we assess medical equipment suppliers before matching them to a clinic, and how we handle compliance and data.",
  alternates: { canonical: "/standards/" },
};

export default function Standards() {
  return (
    <>
      <PageHeader
        eyebrow="Standards"
        title="We vet suppliers. We are not a directory."
        lead="A free service is only worth using if the suppliers are good. These are the checks we make before we put a supplier in front of your clinic."
      />

      <section aria-labelledby="vetting" className="pb-[var(--spacing-chapter)]">
        <div className="container-content">
          <h2 id="vetting" className="sr-only">Supplier vetting</h2>
          <ol className="border-t border-ink/15">
            {vetting.map((v, i) => (
              <Reveal as="li" key={v.title} className="grid gap-4 border-b border-ink/15 py-10 md:grid-cols-[6rem_1fr_1.2fr] md:gap-10">
                <span className="text-h2 font-semibold text-accent" aria-hidden="true">0{i + 1}</span>
                <h3 className="text-[1.75rem] leading-tight tracking-[var(--tracking-heading)]">{v.title}</h3>
                <p className="text-body">{v.body}</p>
              </Reveal>
            ))}
          </ol>
          <p className="todo mt-6 inline-block text-small">Descriptions above are drafts — confirm they match your actual vetting process.</p>
        </div>
      </section>

      <Chapter id="compliance" eyebrow="Compliance" title="Regulation we work within." tone="mist">
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[var(--radius-panel)] bg-white p-8 md:p-10">
            <h3 className="text-h3">GDPR</h3>
            <p className="mt-3 text-muted">How we collect, store and process personal data from buyers, suppliers and partners.</p>
            <p className="todo mt-6 inline-block text-small">Compliance status to verify before launch</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[var(--radius-panel)] bg-white p-8 md:p-10">
            <h3 className="text-h3">EU Medical Device Regulation (MDR)</h3>
            <p className="mt-3 text-muted">The applicable requirements for medical devices we help place with healthcare providers in the EU.</p>
            <p className="todo mt-6 inline-block text-small">Compliance status to verify before launch</p>
          </Reveal>
        </div>
        <p className="mt-10 max-w-2xl text-muted">
          Medixis does not currently hold formal certifications. Where suppliers hold certifications relevant to your order, we include them with your quote.
        </p>
        <p className="todo mt-3 inline-block text-small">Confirm the sentence above (especially whether supplier certifications are passed on with quotes).</p>
      </Chapter>

      <Chapter id="data" eyebrow="Data" title="Your information stays yours.">
        <Reveal className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
          <p className="text-lead md:col-start-2">
            We only share the details a supplier needs to quote your request. Read our <a href="/privacy/" className="text-accent underline underline-offset-4">privacy policy</a> for the full picture.
          </p>
        </Reveal>
      </Chapter>
    </>
  );
}
