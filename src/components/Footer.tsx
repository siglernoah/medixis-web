import Link from "next/link";
import { site } from "@/lib/site";
import Logo from "./Logo";

const cols = [
  {
    title: "Company",
    links: [
      { href: "/about/", label: "About" },
      { href: "/team/", label: "Team" },
      { href: "/careers/", label: "Careers" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { href: "/services/", label: "Services" },
      { href: "/standards/", label: "Standards" },
      { href: "/partners/", label: "Partner programme" },
      { href: "/contact/", label: "Get a quote" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-mist">
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-small text-muted">{site.description}</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-small font-semibold text-ink">{c.title}</h2>
            <ul className="mt-4 space-y-3 text-small">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted hover:text-ink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="text-small font-semibold text-ink">Contact</h2>
          <ul className="mt-4 space-y-3 text-small text-muted">
            <li><a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a></li>
            <li><a href={`tel:${site.phoneHref}`} className="hover:text-ink">{site.phone}</a></li>
            <li>{site.city}, {site.country}</li>
          </ul>
        </div>
      </div>
      <div className="container-content flex flex-col gap-3 border-t border-line py-6 text-small text-muted md:flex-row md:justify-between">
        <p>© {year} {site.legalName}, {site.legalNote}. All rights reserved.</p>
        <ul className="flex gap-6">
          <li><Link href="/privacy/" className="hover:text-ink">Privacy policy</Link></li>
          <li><a href={site.clientLogin} className="hover:text-ink">Client log in</a></li>
        </ul>
      </div>
    </footer>
  );
}
