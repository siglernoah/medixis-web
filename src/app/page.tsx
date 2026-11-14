import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Process from "@/components/home/Process";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import SplitFree from "@/components/home/SplitFree";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import StartRequest from "@/components/home/StartRequest";
import { audiences, categories, equipmentTypes, faqs, vetting } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Medixis — Better equipment quotes. Free for clinics." },
  description:
    "Vetted medical equipment quotes for private clinics and hospitals, fast and free. Suppliers pay Medixis a commission, not you, and you always make the final choice.",
  alternates: { canonical: "/" },
};

function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-2 font-semibold ${dark ? "text-accent-on-dark" : "text-accent hover:text-accent-strong"}`}>
      {children}
      <span className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-premium)] group-hover:translate-x-1"><Arrow /></span>
    </Link>
  );
}

const freePoints = [
  { title: "Suppliers pay us, not you", body: "When a purchase is completed, the supplier pays Medixis a commission. Clinics never pay us anything." },
  { title: "Options chosen on fit", body: "We put forward options based on what suits your clinic: price, warranty, service and delivery." },
  { title: "You make the final decision", body: "You compare the quotes and choose. If ours don’t beat what you already have, you’ve lost nothing." },
];

const proofPoints = [
  "Suppliers checked for registration and certifications",
  "Side-by-side quote comparison",
  "One named contact, reply within 1 working day",
];

export default function Home() {
  const fitCriteria = ["Price", "Warranty", "Service", "Delivery"];
  return (
    <>
      <Intro />
      <Hero />

      {/* 2 — HOW IT WORKS */}
      <Process />

      {/* 3 — WHY IT'S FREE (transparency): split-screen moment, then the detail on navy */}
      <section aria-labelledby="free" className="navy on-dark">
        <div className="container-content pt-[var(--spacing-chapter)] pb-16">
          <Reveal>
            <p className="eyebrow">How we get paid</p>
            <h2 id="free" className="text-h1 mt-4 max-w-[16ch] text-white">Why it&rsquo;s free for clinics.</h2>
          </Reveal>
        </div>
        <SplitFree />
        <div className="container-content pb-[var(--spacing-chapter)] pt-20">
          <Reveal>
            <p className="text-lead max-w-[42rem] text-white">
              We&rsquo;d rather you hear it from us: suppliers pay Medixis a commission on completed purchases. We&rsquo;re open about it because it&rsquo;s what makes the service work.
            </p>
          </Reveal>
          <ol className="mt-16 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3">
            {freePoints.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06}>
                <span className="eyebrow" aria-hidden="true">0{i + 1}</span>
                <h3 className="mt-4 text-[1.5rem] leading-tight tracking-[var(--tracking-heading)] text-white">{p.title}</h3>
                <p className="mt-3">{p.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 flex flex-wrap items-center gap-3">
            <span className="mr-2 text-small text-white">We compare on</span>
            {fitCriteria.map((c) => (
              <span key={c} className="rounded-full border border-white/25 px-5 py-2 text-small font-semibold text-white">{c}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 4 — WHO WE HELP: kinetic type */}
      <section aria-labelledby="who" className="chapter">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Who we help</p>
            <h2 id="who" className="sr-only">Who we help</h2>
          </Reveal>
          <ul className="mt-10 border-t border-ink/15">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.08} className="group grid gap-4 border-b border-ink/15 py-10 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
                <p className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-[var(--tracking-display)] text-ink transition-opacity duration-[var(--dur-base)] group-hover:opacity-70">{a.title}.</p>
                <p className="max-w-md text-muted">{a.body}</p>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.16} className="grid gap-4 border-b border-ink/15 py-10 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
              <p className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-[var(--tracking-display)] text-ink/25">
                <span className="sr-only">Not </span><span className="line-through decoration-[0.06em]">Public tenders.</span>
              </p>
              <p className="max-w-md text-muted">We don&rsquo;t take part in public tenders or government procurement.</p>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* 5 — WHAT WE CAN SOURCE: marquee + list */}
      <section aria-labelledby="source" className="navy on-dark overflow-hidden pt-[var(--spacing-chapter)]">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">What we can source</p>
            <h2 id="source" className="text-h2 mt-4 max-w-[18ch]">Large equipment and everyday items.</h2>
          </Reveal>
        </div>
        <div aria-hidden="true" className="mt-14 flex w-max marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {categories.map((c) => (
                <span key={c.title} className="flex items-center whitespace-nowrap font-serif text-[clamp(3rem,7vw,6.5rem)] tracking-[var(--tracking-display)]">
                  <span className="text-outline text-white/45">{c.title}</span>
                  <span className="mx-10 inline-block h-3 w-3 rounded-full bg-white/30" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="container-content grid gap-12 pb-[var(--spacing-chapter)] pt-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="max-w-md text-lead text-body">
              We also handle consumables and smaller items, not only large equipment. If you can&rsquo;t see what you need, ask anyway.
            </p>
            <div className="mt-8"><TextLink href="/services/">More about our services</TextLink></div>
          </Reveal>
          <ul className="border-t border-ink/15">
            {categories.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.04} className="grid gap-1 border-b border-ink/15 py-6 sm:grid-cols-[1fr_1.3fr] sm:gap-8">
                <h3 className="text-xl">{c.title}</h3>
                <p className="text-[1rem] text-muted">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — SUPPLIER TRUST: sticky heading, scrolling checks */}
      <section aria-labelledby="trust" className="chapter">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <Reveal className="lg:sticky lg:top-32">
                <p className="eyebrow">Vetted suppliers</p>
                <h2 id="trust" className="mt-4 text-[clamp(3rem,6vw,5.5rem)] leading-[0.98] tracking-[var(--tracking-display)]">Not a directory.</h2>
                <p className="mt-6 max-w-md text-muted">
                  We assess suppliers before we put them in front of you, and match them to what your clinic actually needs.
                </p>
                <div className="mt-8"><TextLink href="/standards/">How we vet suppliers</TextLink></div>
              </Reveal>
            </div>
            <ol className="space-y-4">
              {vetting.map((v, i) => (
                <Reveal as="li" key={v.title} delay={0.04} className="group rounded-[var(--radius-panel)] border border-ink/10 p-8 transition-colors duration-[var(--dur-base)] hover:border-transparent hover:bg-ink md:p-10">
                  <span className="text-outline font-serif text-[4rem] leading-none text-ink transition-colors duration-[var(--dur-base)] group-hover:text-white" aria-hidden="true">0{i + 1}</span>
                  <h3 className="mt-6 text-[1.5rem] leading-tight tracking-[var(--tracking-heading)] transition-colors duration-[var(--dur-base)] group-hover:text-white">{v.title}</h3>
                  <p className="mt-2 text-muted transition-colors duration-[var(--dur-base)] group-hover:text-on-dark-muted">{v.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* PLACEHOLDERS ONLY — replace with real supplier logos and confirmed certifications. Never add unconfirmed names or marks. */}
          <div className="mt-24">
            <h3 className="text-small font-semibold text-muted">Suppliers and certifications</h3>
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Placeholders for supplier logos and certifications">
              {["Supplier logo", "Supplier logo", "Supplier logo", "Supplier logo"].map((t, i) => (
                <li key={i} className="todo flex h-24 items-center justify-center text-center text-small">{t} placeholder</li>
              ))}
              {["CE marking placeholder", "ISO certification placeholder"].map((t) => (
                <li key={t} className="todo col-span-1 flex h-24 items-center justify-center text-center text-small md:col-span-2">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section aria-labelledby="faq" className="chapter navy on-dark">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <Reveal className="lg:sticky lg:top-32">
              <p className="eyebrow">Questions</p>
              <h2 id="faq" className="text-h1 mt-4 max-w-[10ch]">Plain answers.</h2>
            </Reveal>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      {/*
        FUTURE CASE STUDY — hidden until Medixis has a completed deal it may describe.
        Only publish with the clinic's written permission and real, verifiable details.

      <section aria-labelledby="case" className="chapter">
        <div className="container-content">
          <p className="eyebrow">Case study</p>
          <h2 id="case" className="text-h2 mt-4">[Clinic name / type, with permission]</h2>
          <p className="mt-6 max-w-2xl">[What they needed, what we sourced, what they chose and why.]</p>
        </div>
      </section>
      */}

      {/* 8 — CLOSING: value proposition + quick request */}
      <section aria-labelledby="cta" className="py-[clamp(4.5rem,9vw,7.5rem)]">
        <div className="container-content">
          <div className="grid items-start gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Serving private clinics in Europe and Africa.</p>
              <h2 id="cta" className="mt-5 max-w-[22ch] text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] tracking-[var(--tracking-heading)] text-ink">
                Medical equipment for private clinics, sourced and compared for you.
              </h2>
              <p className="text-lead mt-6 max-w-[36rem] text-body">
                Tell us what you need. We find vetted suppliers, compare quotes, and you choose. Free for clinics &mdash; suppliers pay us only when a deal closes.
              </p>
              <ul className="mt-8 space-y-3" aria-label="What you get">
                {proofPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-ink">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="10" cy="10" r="8.5" strokeWidth="1.5" />
                      <path d="M6.5 10.2l2.4 2.4 4.6-5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <MagneticButton href="/contact/" className="w-full justify-center sm:w-auto">Request quotes <Arrow /></MagneticButton>
                <MagneticButton href="/suppliers/" variant="secondary" className="w-full justify-center sm:w-auto">I&rsquo;m a supplier</MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <StartRequest />
            </Reveal>
          </div>
          <ul className="mt-14 flex flex-wrap gap-2" aria-label="Equipment we source">
            {equipmentTypes.filter((t) => t !== "Other").map((t) => (
              <li key={t} className="rounded-full border border-ink/15 px-4 py-2 text-small text-body">{t}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
