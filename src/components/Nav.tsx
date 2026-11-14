"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";
import NavSpotlight from "./NavSpotlight";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [anchors] = useState(() => [ctaRef, menuRef]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`on-dark sticky top-0 z-50 overflow-x-clip border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-[var(--dur-fast)] ${
        scrolled ? "border-white/10 bg-ink/95" : "border-transparent bg-ink"
      }`}
    >
      <NavSpotlight anchors={anchors} />
      <nav aria-label="Main" data-theme="dark" className="container-content relative flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex min-h-11 items-center" aria-label="Medixis home">
          <Logo dark />
        </Link>

        <ul className="hidden items-center gap-8 text-[0.9375rem] lg:flex">
          {nav.map((item) => {
            const active = !item.href.includes("#") && pathname?.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors duration-[var(--dur-fast)] hover:text-white ${active ? "text-white" : "text-on-dark-muted"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          <a href={site.clientLogin} className="text-[0.9375rem] text-on-dark-muted hover:text-white">
            Client log in
          </a>
          <Link
            ref={ctaRef}
            href="/contact/"
            className="rounded-full border border-white px-5 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-[var(--dur-fast)] hover:bg-white hover:text-ink"
          >
            Request quotes
          </Link>
        </div>

        <button
          ref={menuRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className="text-white">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="relative border-t border-white/10 bg-ink lg:hidden">
        <ul className="container-content flex flex-col py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block py-3 text-2xl font-semibold tracking-tight text-white">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-6">
            <Link href="/contact/" className="rounded-full border border-white px-5 py-3 font-semibold text-white">
              Request quotes
            </Link>
            <a href={site.clientLogin} className="rounded-full border border-white/25 px-5 py-3 text-white">
              Client log in
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
