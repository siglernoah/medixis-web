import type { Metadata } from "next";
import PageHeader, { Chapter } from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MailtoForm from "@/components/MailtoForm";
import { Input, Select, SubmitButton, TextArea } from "@/components/Field";
import { categories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner programme",
  description: "Earn commission by introducing healthcare providers or medical equipment suppliers to Medixis. No cost to join.",
  alternates: { canonical: "/partners/" },
};

const paths = [
  { title: "Client sourcing", body: "Introduce private clinics or private hospitals that need medical equipment. Earn commission when their contract closes." },
  { title: "Supplier sourcing", body: "Introduce medical equipment suppliers looking for new healthcare buyers. Earn commission when they sign." },
];
const why = [
  { title: "No cost to join", body: "No fee, no subscription and no minimum number of referrals." },
  { title: "Commission-only", body: "You earn when a deal closes — and so do we. Our incentives stay aligned." },
  { title: "Transparent tracking", body: "A monthly pipeline report shows the status of every introduction." },
  { title: "No cap on earnings", body: "Close more deals in a year and your effective rate rises with you." },
];
const tiers = [
  { tier: "Standard", deals: "1–2", bonus: "Base rate" },
  { tier: "Silver", deals: "3–5", bonus: "+0.15% on all deals" },
  { tier: "Gold", deals: "6–10", bonus: "+0.30% on all deals" },
  { tier: "Platinum", deals: "11+", bonus: "+0.50% on all deals" },
];
const regions = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania & Australia"];
const categoryNames = categories.map((c) => c.title);

export default function Partners() {
  return (
    <>
      <PageHeader
        eyebrow="Partner programme"
        title="Become a Medixis partner."
        lead="Earn commission by connecting Medixis with the right people — private clinics and hospitals looking for equipment, or suppliers looking for new buyers."
      />

      <section aria-label="Partner paths" className="pb-[var(--spacing-chapter)]">
        <ul className="container-content grid gap-6 md:grid-cols-2">
          {paths.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className={`rounded-[var(--radius-panel)] p-8 md:p-12 ${i ? "on-dark bg-ink text-on-dark-muted" : "bg-mist"}`}>
              <h2 className={`text-[2rem] leading-tight tracking-[var(--tracking-heading)] ${i ? "text-on-dark" : ""}`}>{p.title}</h2>
              <p className="mt-4 max-w-md">{p.body}</p>
              <a href="#apply" className={`mt-10 inline-flex min-h-11 items-center font-semibold ${i ? "text-accent-on-dark" : "text-accent"}`}>Apply for this path →</a>
            </Reveal>
          ))}
        </ul>
      </section>

      <Chapter id="why" eyebrow="Why partner with us" title="Simple terms, aligned incentives." tone="mist">
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.06} className="border-t border-ink/15 pt-6">
              <h3 className="text-xl">{w.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{w.body}</p>
            </Reveal>
          ))}
        </ul>
      </Chapter>

      <Chapter id="tiers" eyebrow="Commission tiers" title="The more you close, the more you earn.">
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left">
            <caption className="sr-only">Partner commission tiers by deals closed in one year</caption>
            <thead>
              <tr className="border-b border-ink/15 text-small text-muted">
                <th scope="col" className="py-4 font-semibold">Tier</th>
                <th scope="col" className="py-4 font-semibold">Deals closed (1 year)</th>
                <th scope="col" className="py-4 font-semibold">Bonus</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.tier} className="border-b border-ink/15">
                  <th scope="row" className="py-6 text-xl font-semibold text-ink">{t.tier}</th>
                  <td className="py-6">{t.deals}</td>
                  <td className="py-6 font-semibold text-accent">{t.bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-2xl text-small text-muted">Illustrative structure — exact rates, deal definitions and payment terms are confirmed in your signed Partner Agreement.</p>
      </Chapter>

      <section id="apply" aria-labelledby="apply-title" className="chapter bg-mist">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">Apply</p>
            <h2 id="apply-title" className="text-h2 mt-4">Start your application.</h2>
            <p className="mt-6 max-w-sm text-muted">We review every application personally and reach out to schedule a short interview, typically within a few days.</p>
          </div>
          <MailtoForm subject="Partner application" className="rounded-[var(--radius-panel)] bg-white p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <Select label="Path" name="Path" required options={["Client sourcing", "Supplier sourcing"]} />
              <Select label="Region of focus" name="Region" required options={regions} />
              <fieldset className="md:col-span-2">
                <legend className="text-small font-semibold text-ink">Equipment categories</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {categoryNames.map((c) => (
                    <label key={c} className="flex min-h-11 items-center gap-3 rounded-[var(--radius-card)] border border-ink/15 px-4 text-[1rem]">
                      <input type="checkbox" name="Categories" value={c} className="h-5 w-5 accent-[var(--color-accent)]" />
                      {c}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Input label="Full name" name="Name" required autoComplete="name" />
              <Input label="Email" name="Email" type="email" required autoComplete="email" />
              <Input label="Phone" name="Phone" type="tel" autoComplete="tel" />
              <Input label="Relevant experience (years)" name="Experience (years)" type="number" />
              <TextArea label="A little about you" name="About" className="md:col-span-2" hint="Please attach your CV to the email that opens." />
            </div>
            <div className="mt-8"><SubmitButton>Submit application</SubmitButton></div>
          </MailtoForm>
        </div>
      </section>
    </>
  );
}
