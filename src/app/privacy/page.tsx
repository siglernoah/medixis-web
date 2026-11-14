import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Medixis handles personal data.",
  alternates: { canonical: "/privacy/" },
  robots: { index: false },
};

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" />
      <section className="container-content pb-[var(--spacing-chapter)]">
        <div className="todo max-w-2xl p-6">
          <p className="font-semibold text-ink">Privacy policy to be drafted and published before launch.</p>
          <p className="mt-3 text-muted">
            It should be reviewed by a qualified adviser and cover, at minimum: the data controller ({site.legalName}), what data the quote and partner forms collect, why and on what legal basis, who it is shared with (e.g. suppliers, for quoting), retention periods, international transfers, and how people exercise their GDPR rights.
          </p>
        </div>
      </section>
    </>
  );
}
