import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MailtoForm from "@/components/MailtoForm";
import { Input, Select, SubmitButton, TextArea } from "@/components/Field";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request quotes",
  description: "Request vetted medical equipment quotes for your private clinic or hospital. Free for clinics: suppliers pay Medixis, not you. No obligation.",
  alternates: { canonical: "/contact/" },
};

const promises = [
  "Free for clinics. Suppliers pay us, not you.",
  "We do the supplier legwork.",
  "You see vetted options and make the final choice.",
  "The supplier invoices you directly.",
];

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Request quotes"
        title="Tell us what your clinic needs."
        lead="We find suppliers that fit, vet them and collect their quotes. You compare and choose. There's no fee and no obligation."
      />

      <section aria-label="Quote request" className="pb-[var(--spacing-chapter)]">
        <div className="container-content grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          <MailtoForm subject="Quote request" className="rounded-[var(--radius-panel)] bg-mist p-6 md:p-10">
            <fieldset className="grid gap-6 md:grid-cols-2">
              <legend className="sr-only">Your details and request</legend>
              <Input label="Your name" name="Name" required autoComplete="name" />
              <Input label="Clinic name" name="Clinic" required autoComplete="organization" />
              <Input label="Country" name="Country" required autoComplete="country-name" />
              <Input label="Email" name="Email" type="email" required autoComplete="email" />
              <Input label="Phone (optional)" name="Phone" type="tel" autoComplete="tel" />
              <Select label="Timeline" name="Timeline" required options={["ASAP", "Within 3 months", "Later", "Just exploring"]} />
              <TextArea
                label="What equipment do you need?"
                name="Equipment needed"
                required
                className="md:col-span-2"
                hint="Include quantities and any specifications. If you already have a quote, mention it. You can attach it to the email."
              />
              <Input label="Who referred you? (optional)" name="Referred by" className="md:col-span-2" />
            </fieldset>
            <div className="mt-8"><SubmitButton>Request quotes</SubmitButton></div>
          </MailtoForm>

          <aside aria-label="What to expect and contact details" className="space-y-10">
            <div>
              <h2 className="text-small font-semibold text-muted">What to expect</h2>
              <ul className="mt-4 space-y-3">
                {promises.map((p) => (
                  <li key={p} className="flex gap-3 text-ink">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-small font-semibold text-muted">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-2 block text-xl font-semibold text-ink hover:text-accent">{site.email}</a>
            </div>
            <div>
              <h2 className="text-small font-semibold text-muted">Phone</h2>
              <a href={`tel:${site.phoneHref}`} className="mt-2 block text-xl font-semibold text-ink hover:text-accent">{site.phone}</a>
            </div>
            <div>
              <h2 className="text-small font-semibold text-muted">Headquarters</h2>
              <p className="mt-2 text-xl font-semibold text-ink">{site.city}, {site.country}</p>
            </div>
            <div className="border-t border-line pt-8">
              <h2 className="text-small font-semibold text-muted">Existing clients</h2>
              <a href={site.clientLogin} className="mt-2 inline-block font-semibold text-accent hover:text-accent-strong">Log in to the client portal →</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
