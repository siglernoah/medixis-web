import Link from "next/link";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { audiences, mission, site, stats, team, vetting } from "@/lib/site";

function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-2 font-semibold ${dark ? "text-accent-on-dark" : "text-accent hover:text-accent-strong"}`}>
      {children}
      <span className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-premium)] group-hover:translate-x-1"><Arrow /></span>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* MISSION — one idea */}
      <section aria-labelledby="mission" className="chapter">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Our mission</p>
            <h2 id="mission" className="text-h1 mt-6 max-w-[20ch]">{mission.statement}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
            <p className="text-lead text-body md:col-start-2">
              {mission.why} Medixis gives hospitals, clinics and care homes one point of contact — from sourcing and quotations to procurement and delivery.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section aria-labelledby="what" className="pb-[var(--spacing-chapter)]">
        <div className="container-content">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Who we serve</p>
              <h2 id="what" className="text-h2 mt-4 max-w-[18ch]">Built for the facilities that care for patients.</h2>
            </div>
            <TextLink href="/services/">Explore services</TextLink>
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.06} className="flex min-h-[260px] flex-col justify-between rounded-[var(--radius-panel)] bg-mist p-7">
                <span className="text-small font-semibold text-accent" aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3 className="text-[1.375rem] leading-tight tracking-[var(--tracking-heading)]">{a.title}</h3>
                  <p className="mt-3 text-[1rem] text-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Process />

      {/* EVIDENCE — dark chapter */}
      <section aria-labelledby="evidence" className="on-dark chapter bg-ink text-on-dark-muted">
        <div className="container-content">
          <Reveal>
            <p className="text-small font-semibold text-accent-on-dark">How we work</p>
            <h2 id="evidence" className="text-h2 mt-4 max-w-[20ch] text-on-dark">Built on verification, not volume.</h2>
          </Reveal>

          <dl className="mt-16 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <dt className="sr-only">Typical quote turnaround</dt>
              <dd className="text-h2 whitespace-nowrap font-semibold text-on-dark"><CountUp to={24} suffix="h" /></dd>
              <dd className="mt-3">Typical quote turnaround</dd>
            </Reveal>
            <Reveal delay={0.06}>
              <dt className="sr-only">Countries</dt>
              <dd className="text-h2 whitespace-nowrap font-semibold text-on-dark"><CountUp to={stats.countries} /></dd>
              <dd className="mt-3">Countries where our team works</dd>
            </Reveal>
            <Reveal delay={0.12}>
              <dt className="sr-only">Team</dt>
              <dd className="text-h2 whitespace-nowrap font-semibold text-on-dark"><CountUp to={stats.teamSize} /></dd>
              <dd className="mt-3">People across our team</dd>
            </Reveal>
            <Reveal delay={0.18}>
              <dt className="sr-only">Sourcing reach</dt>
              <dd className="text-h2 whitespace-nowrap font-semibold text-on-dark">EU + global</dd>
              <dd className="mt-3">Vetted sourcing network</dd>
            </Reveal>
          </dl>

          <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal>
              <h3 className="text-[1.75rem] leading-tight tracking-[var(--tracking-heading)] text-on-dark">Every supplier is checked on five points before we quote them.</h3>
              <div className="mt-8"><TextLink href="/standards/" dark>Read our standards</TextLink></div>
            </Reveal>
            <ol className="divide-y divide-white/15 border-y border-white/15">
              {vetting.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                  <span className="text-small font-semibold text-accent-on-dark" aria-hidden="true">0{i + 1}</span>
                  <div>
                    <h4 className="font-semibold text-on-dark">{v.title}</h4>
                    <p className="mt-1 text-[1rem]">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal className="mt-20 flex flex-wrap items-center gap-3 border-t border-white/15 pt-10 text-small">
            <span className="mr-2 text-on-dark">Compliance</span>
            <span className="rounded-full border border-white/25 px-4 py-2">GDPR <span className="todo ml-1">status to verify</span></span>
            <span className="rounded-full border border-white/25 px-4 py-2">EU MDR — applicable requirements <span className="todo ml-1">status to verify</span></span>
          </Reveal>
        </div>
      </section>

      {/* PEOPLE */}
      <section aria-labelledby="people" className="chapter">
        <div className="container-content grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">People</p>
            <h2 id="people" className="text-h2 mt-4 max-w-[14ch]">The people behind your orders.</h2>
            <p className="mt-6 max-w-md text-body">
              Every request is handled by one dedicated coordinator, backed by a founder-led team of {stats.teamSize} across {stats.countries} countries.
            </p>
            <ul className="mt-10 flex -space-x-3" aria-label="Leadership team">
              {team.map((p) => (
                <li key={p.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={p.name} width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full border-2 border-white object-cover object-top" />
                </li>
              ))}
            </ul>
            <div className="mt-8"><TextLink href="/team/">Meet the team</TextLink></div>
          </Reveal>
          <Reveal delay={0.1} className="aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] lg:aspect-[5/6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/team-meeting.webp" alt="The Medixis team in a strategy meeting" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* PARTNERS */}
      <section aria-labelledby="partners" className="bg-mist">
        <div className="container-content flex flex-col gap-8 py-20 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <h2 id="partners" className="text-[1.75rem] leading-tight tracking-[var(--tracking-heading)] md:text-[2.25rem]">Connect. Collaborate. Create impact.</h2>
            <p className="mt-3 max-w-xl text-muted">Our international partners introduce healthcare facilities and suppliers in their markets. Commission-only, no cost to join.</p>
          </Reveal>
          <Reveal delay={0.1}><TextLink href="/partners/">Become a partner</TextLink></Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section aria-labelledby="contact" className="chapter">
        <div className="container-content text-center">
          <Reveal>
            <h2 id="contact" className="text-display mx-auto max-w-[12ch] font-semibold text-ink">Tell us what you need.</h2>
            <p className="text-lead mx-auto mt-8 max-w-xl">No request is left unanswered. A member of the Medixis team replies with pricing and availability, usually within one business day.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <MagneticButton href="/contact/">Get a quote <Arrow /></MagneticButton>
              <MagneticButton href={`mailto:${site.email}`} variant="secondary">Email us</MagneticButton>
            </div>
            <p className="mt-10 text-small text-muted">{site.phone} · Headquartered in {site.city}, {site.country}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
