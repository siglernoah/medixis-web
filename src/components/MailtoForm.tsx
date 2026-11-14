"use client";
import { useState } from "react";
import { site } from "@/lib/site";

/**
 * The site is a static export with no backend yet, so forms compose an email
 * to the Medixis inbox (same approach as the current site). Swap `onSubmit`
 * for a form service or API route when one is chosen.
 */
export default function MailtoForm({ subject, children, className = "" }: { subject: string; children: React.ReactNode; className?: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines: string[] = [];
    const seen = new Set<string>();
    data.forEach((_, key) => {
      if (seen.has(key)) return;
      seen.add(key);
      const val = data.getAll(key).filter((v) => typeof v === "string" && v).join(", ");
      if (val) lines.push(`${key}: ${val}`);
    });
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      <p role="status" className="mt-4 text-small text-muted">
        {sent
          ? `Your email app should now open with the request filled in. If it doesn't, email us directly at ${site.email}.`
          : "Submitting opens your email app with your request filled in, addressed to the Medixis team."}
      </p>
    </form>
  );
}
