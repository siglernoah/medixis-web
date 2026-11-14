"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-[var(--dur-fast)] ${
        scrolled ? "border-line bg-white/75" : "border-transparent bg-white/60"
      }`}
    >
      <nav aria-label="Main" className="container-content flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex min-h-11 items-center" aria-label="Medixis home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 text-[0.9375rem] lg:flex">
          {nav.map((item) => {
            const active = !item.href.includes("#") && pathname?.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors duration-[var(--dur-fast)] hover:text-ink ${active ? "text-ink" : "text-body"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          <a href={site.clientLogin} className="text-[0.9375rem] text-body hover:text-ink">
            Client log in
          </a>
          <Link
            href="/contact/"
            className="rounded-full bg-ink px-5 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-[var(--dur-fast)] hover:bg-accent"
          >
            Request quotes
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className="text-ink">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <ul className="container-content flex flex-col py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block py-3 text-2xl font-semibold tracking-tight text-ink">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-4 flex flex-wrap gap-3 border-t border-line pt-6">
            <Link href="/contact/" className="rounded-full bg-ink px-5 py-3 font-semibold text-white">
              Request quotes
            </Link>
            <a href={site.clientLogin} className="rounded-full border border-line px-5 py-3 text-ink">
              Client log in
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
