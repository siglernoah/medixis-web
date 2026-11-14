import Link from "next/link";
import { site } from "@/lib/site";
import Logo from "./Logo";

const cols = [
  {
    title: "Company",
    links: [
      { href: "/about/", label: "About" },
      { href: "/team/", label: "Team" },
      { href: "/standards/", label: "Standards" },
      { href: "/careers/", label: "Careers" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { href: "/contact/", label: "Request quotes" },
      { href: "/services/", label: "Services" },
      { href: "/suppliers/", label: "For suppliers" },
      { href: "/partners/", label: "Partner programme" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="navy on-dark border-t border-white/10">
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-small text-on-dark-muted">{site.description}</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-small font-semibold text-white">{c.title}</h2>
            <ul className="mt-4 space-y-3 text-small">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="text-small font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-small text-on-dark-muted">
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li><a href={`tel:${site.phoneHref}`} className="hover:text-white">{site.phone}</a></li>
            <li>{site.city}, {site.country}</li>
          </ul>
        </div>
      </div>
      <div className="container-content flex flex-col gap-3 border-t border-white/10 py-6 text-small text-on-dark-muted md:flex-row md:justify-between">
        <p>© {year} {site.legalName}, {site.legalNote}. All rights reserved.</p>
        <ul className="flex gap-6">
          <li><Link href="/privacy/" className="hover:text-white">Privacy policy</Link></li>
          <li><a href={site.clientLogin} className="hover:text-white">Client log in</a></li>
        </ul>
      </div>
    </footer>
  );
}
