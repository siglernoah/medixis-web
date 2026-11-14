import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import MagneticButton, { Arrow } from "@/components/MagneticButton";
import { audiences, categories, faqs, vetting } from "@/lib/site";

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

export default function Home() {
  const fitCriteria = ["Price", "Warranty", "Service", "Delivery"];
  return (
    <>
      <Hero />

      {/* 2 — HOW IT WORKS */}
      <Process />

      {/* 3 — WHY IT'S FREE (transparency) */}
      <section aria-labelledby="free" className="on-dark chapter bg-ink text-on-dark-muted">
        <div className="container-content">
          <Reveal>
            <p className="text-small font-semibold text-accent-on-dark">How we get paid</p>
            <h2 id="free" className="text-h2 mt-4 max-w-[18ch] text-on-dark">Why it&rsquo;s free for clinics.</h2>
            <p className="text-lead mt-8 max-w-[40rem]">
              We&rsquo;d rather you hear it from us: suppliers pay Medixis a commission on completed purchases. That is what lets us do the supplier legwork for free, and it is why we&rsquo;re open about it.
            </p>
          </Reveal>

          <ol className="mt-16 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3">
            {freePoints.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06}>
                <span className="text-small font-semibold text-accent-on-dark" aria-hidden="true">0{i + 1}</span>
                <h3 className="mt-3 text-[1.5rem] leading-tight tracking-[var(--tracking-heading)] text-on-dark">{p.title}</h3>
                <p className="mt-3">{p.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16 flex flex-wrap items-center gap-3 border-t border-white/15 pt-10">
            <span className="mr-2 text-small text-on-dark">We compare on</span>
            {fitCriteria.map((c) => (
              <span key={c} className="rounded-full border border-white/25 px-4 py-2 text-small text-on-dark">{c}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 4 — WHO WE HELP */}
      <section aria-labelledby="who" className="chapter">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Who we help</p>
            <h2 id="who" className="text-h2 mt-4 max-w-[18ch]">Built for private clinics and hospitals.</h2>
          </Reveal>
          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.08} className="flex min-h-[240px] flex-col justify-between rounded-[var(--radius-panel)] bg-mist p-8 md:p-10">
                <span className="text-small font-semibold text-accent" aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3 className="text-[1.75rem] leading-tight tracking-[var(--tracking-heading)]">{a.title}</h3>
                  <p className="mt-3 max-w-md text-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-muted">We don&rsquo;t take part in public tenders or government procurement.</p>
        </div>
      </section>

      {/* 5 — WHAT WE CAN SOURCE */}
      <section aria-labelledby="source" className="chapter bg-mist">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">What we can source</p>
            <h2 id="source" className="text-h2 mt-4 max-w-[14ch]">Large equipment and everyday items.</h2>
            <p className="mt-6 max-w-md text-muted">
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

      {/* 6 — SUPPLIER TRUST */}
      <section aria-labelledby="trust" className="chapter">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Vetted suppliers</p>
              <h2 id="trust" className="text-h2 mt-4 max-w-[14ch]">Not a directory.</h2>
              <p className="mt-6 max-w-md text-muted">
                We assess suppliers before we put them in front of you, and match them to what your clinic actually needs.
              </p>
              <div className="mt-8"><TextLink href="/standards/">How we vet suppliers</TextLink></div>
            </Reveal>
            <ol className="divide-y divide-ink/15 border-y border-ink/15">
              {vetting.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.04} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                  <span className="text-small font-semibold text-accent" aria-hidden="true">0{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{v.title}</h3>
                    <p className="mt-1 text-[1rem] text-muted">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* PLACEHOLDERS ONLY — replace with real supplier logos and confirmed certifications. Never add unconfirmed names or marks. */}
          <div className="mt-20">
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
      <section aria-labelledby="faq" className="chapter bg-mist">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 id="faq" className="text-h2 mt-4 max-w-[12ch]">Plain answers.</h2>
          </Reveal>
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

      {/* 8 — FINAL CTA */}
      <section aria-labelledby="cta" className="chapter">
        <div className="container-content text-center">
          <Reveal>
            <h2 id="cta" className="text-display mx-auto max-w-[12ch] font-semibold text-ink">Request quotes.</h2>
            <p className="text-lead mx-auto mt-8 max-w-xl">
              Tell us what your clinic needs. It&rsquo;s free, there&rsquo;s no obligation, and you make the final choice.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <MagneticButton href="/contact/">Request quotes <Arrow /></MagneticButton>
              <MagneticButton href="/suppliers/" variant="secondary">I&rsquo;m a supplier</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
