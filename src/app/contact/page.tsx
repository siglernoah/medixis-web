import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MailtoForm from "@/components/MailtoForm";
import { Input, Select, SubmitButton, TextArea } from "@/components/Field";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & quotes",
  description: "Request a quote for medical equipment. Medixis replies with pricing and availability, usually within one business day.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Get a quote"
        title="Tell us what your facility needs."
        lead="A member of the Medixis team reviews every request and replies with pricing and availability from our supplier network — usually within one business day."
      />

      <section aria-label="Quote request" className="pb-[var(--spacing-chapter)]">
        <div className="container-content grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          <MailtoForm subject="Quote request" className="rounded-[var(--radius-panel)] bg-mist p-6 md:p-10">
            <fieldset className="grid gap-6 md:grid-cols-2">
              <legend className="sr-only">Your organisation</legend>
              <Input label="Organisation name" name="Organisation" required autoComplete="organization" />
              <Select label="Organisation type" name="Organisation type" required options={["Hospital", "Clinic", "Elderly care home", "Other healthcare provider"]} />
              <Input label="Your name" name="Name" required autoComplete="name" />
              <Input label="Email" name="Email" type="email" required autoComplete="email" />
              <Input label="Phone" name="Phone" type="tel" autoComplete="tel" />
              <Input label="Country / location" name="Location" autoComplete="country-name" />
              <TextArea
                label="Equipment needed"
                name="Equipment"
                required
                className="md:col-span-2"
                hint="Include quantities, timeline and any specifications. You can attach a spec sheet or tender document to the email."
              />
            </fieldset>
            <div className="mt-8"><SubmitButton>Send request</SubmitButton></div>
          </MailtoForm>

          <aside aria-label="Contact details" className="space-y-10">
            <p className="text-muted">We work as a distributed team, so wherever your facility is, we come to you by phone, email or video.</p>
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
