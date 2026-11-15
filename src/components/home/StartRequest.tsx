"use client";
import MailtoForm from "@/components/MailtoForm";
import { Input, Select, SubmitButton } from "@/components/Field";
import { equipmentTypes } from "@/lib/site";


/**
 * Compact quote-request card for the homepage's closing section.
 *
 * TODO(form backend): the site is a static export with no backend. Like the full form on
 * /contact/, this submits through MailtoForm, which opens the visitor's email app with the
 * answers addressed to site.email. To capture requests without the email app, connect a form
 * service or API endpoint in MailtoForm's onSubmit (one place, used by every form on the site).
 */
export default function StartRequest() {
  return (
    <MailtoForm subject="Quote request (homepage)" className="rounded-[var(--radius-panel)] border border-ink/10 bg-white p-6 md:p-8">
      <h3 id="start-request" className="text-h3">Start a request</h3>
      <div className="mt-6 grid gap-5" role="group" aria-labelledby="start-request">
        <Select label="Equipment type" name="Equipment type" options={equipmentTypes} />
        <Input label="Country" name="Country" autoComplete="country-name" />
        <Input label="Work email" name="Email" type="email" required autoComplete="email" />
      </div>
      <div className="mt-6 [&>button]:w-full [&>button]:justify-center">
        <SubmitButton>Request quotes</SubmitButton>
      </div>
      <p className="mt-3 text-small text-muted">No obligation. We reply within two working days.</p>
    </MailtoForm>
  );
}
