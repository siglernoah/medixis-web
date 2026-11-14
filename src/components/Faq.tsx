// Native <details> accordion: keyboard and screen-reader accessible without JS.
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-ink/15">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-ink/15">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[clamp(1.125rem,1.6vw,1.5rem)] font-semibold leading-snug tracking-[var(--tracking-heading)] text-ink hover:text-accent [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-turquoise transition-colors duration-[var(--dur-fast)] group-open:bg-turquoise group-open:text-ink"><span className="relative h-4 w-4">
              <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-current transition-transform duration-[var(--dur-fast)] group-open:scale-y-0" /></span>
            </span>
          </summary>
          <p className="max-w-3xl pb-7 text-body">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
