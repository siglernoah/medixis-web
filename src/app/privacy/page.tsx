import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { asset } from "@/lib/site";
import { privacyMeta, privacySections, type Block } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Medixis Group LLC collects, uses, shares and protects personal data, and how to exercise your rights under the GDPR.",
  alternates: { canonical: "/privacy/" },
};

/** Shows [bracketed] text as a "still to confirm" placeholder, without the brackets. */
function T({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith("[") ? <span key={i} className="todo" title="To complete before launch">{part.slice(1, -1)}</span> : part,
      )}
    </>
  );
}

/** Bold the clause number ("1.1", "(a)") and a short lead-in label ("Controller.") if present. */
function Para({ text }: { text: string }) {
  const m = text.match(/^(\d+\.\d+)\s+(?:([A-Z][A-Za-z -]{2,40}\.)\s+)?(.*)$/s);
  if (!m) return <p><T text={text} /></p>;
  return (
    <p>
      <span className="mr-2 font-semibold text-ink">{m[1]}</span>
      {m[2] && <strong className="font-semibold text-ink">{m[2]} </strong>}
      <T text={m[3]} />
    </p>
  );
}

function BlockView({ b }: { b: Block }) {
  if ("p" in b) return <Para text={b.p} />;
  if ("list" in b) {
    return (
      <ul className="space-y-2 pl-1">
        {b.list.map((item) => {
          const m = item.match(/^(\([a-z]\))\s+(.*)$/s);
          return (
            <li key={item} className="grid grid-cols-[2rem_1fr]">
              <span className="font-semibold text-ink">{m?.[1]}</span>
              <span><T text={m?.[2] ?? item} /></span>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-ink/10">
      <table className="w-full min-w-[32rem] text-left text-[1rem]">
        <thead className="bg-mist">
          <tr>
            {b.table.head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold text-ink">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {b.table.rows.map(([a, c]) => (
            <tr key={a} className="border-t border-ink/10 align-top">
              <th scope="row" className="w-[38%] px-4 py-3 font-semibold text-ink">{a}</th>
              <td className="px-4 py-3"><T text={c} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lead="How Medixis Group LLC collects, uses, shares and protects personal data, and the rights you have over it."
      />

      <section aria-label="Privacy policy" className="pb-[var(--spacing-chapter)]">
        <div className="container-content grid grid-cols-1 gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          {/* Contents + download */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-small text-muted">
              Medixis Group LLC · Version {privacyMeta.version}{privacyMeta.effective && <> · Effective {privacyMeta.effective}</>}
            </p>
            <a
              href={asset("/medixis-privacy-policy.pdf")}
              download
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-5 font-semibold text-ink hover:border-ink/40"
            >
              Download PDF <span className="text-muted">(78 KB)</span>
            </a>
            <nav aria-label="Contents" className="mt-8 hidden lg:block">
              <p className="text-small font-semibold text-ink">Contents</p>
              <ol className="mt-3 space-y-1.5 text-small">
                {privacySections.map((s) => (
                  <li key={s.n}><a href={`#s${s.n}`} className="text-muted hover:text-ink">{s.n}. {s.title}</a></li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-3xl">
            {privacySections.map((s) => (
              <section key={s.n} id={`s${s.n}`} aria-labelledby={`s${s.n}-t`} className="scroll-mt-24 border-t border-ink/10 py-10 first:border-t-0 first:pt-0">
                <h2 id={`s${s.n}-t`} className="text-[1.5rem] leading-tight">{s.n}. {s.title}</h2>
                <div className="mt-5 space-y-4 text-[1rem] leading-relaxed text-body">
                  {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
