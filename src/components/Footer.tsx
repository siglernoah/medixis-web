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

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.25H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.7h-4v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.95 1.3-1.95 2.66V21H9.5V9.75Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="navy on-dark border-t border-white/10">
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-small text-on-dark-muted">{site.description}</p>
          <ul className="mt-6 flex gap-3" aria-label="Medixis on social media">
            {site.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Medixis on ${s.name} (opens in a new tab)`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-[var(--dur-fast)] hover:border-white hover:bg-white hover:text-ink"
                >
                  {s.name === "LinkedIn" ? <LinkedInIcon /> : <InstagramIcon />}
                </a>
              </li>
            ))}
          </ul>
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
