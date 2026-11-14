// Accessible form field primitives: visible labels, 48px targets, clear focus.
const base =
  "mt-2 block w-full rounded-[var(--radius-card)] border border-ink/20 bg-white px-4 py-3 text-base text-ink transition-colors duration-[var(--dur-fast)] hover:border-ink/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

type Common = { label: string; name: string; required?: boolean; className?: string; hint?: string };

export function Input({ label, name, required, className = "", hint, type = "text", autoComplete }: Common & { type?: string; autoComplete?: string }) {
  return (
    <label className={`block text-small font-semibold text-ink ${className}`}>
      {label}{required && <span className="text-muted font-normal"> (required)</span>}
      <input name={name} type={type} required={required} autoComplete={autoComplete} className={base} />
      {hint && <span className="mt-1 block font-normal text-muted">{hint}</span>}
    </label>
  );
}

export function Select({ label, name, required, className = "", options }: Common & { options: string[] }) {
  return (
    <label className={`block text-small font-semibold text-ink ${className}`}>
      {label}{required && <span className="text-muted font-normal"> (required)</span>}
      <select name={name} required={required} defaultValue="" className={base}>
        <option value="" disabled>Select one</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function TextArea({ label, name, required, className = "", hint }: Common) {
  return (
    <label className={`block text-small font-semibold text-ink ${className}`}>
      {label}{required && <span className="text-muted font-normal"> (required)</span>}
      <textarea name={name} required={required} rows={5} className={`${base} resize-y`} />
      {hint && <span className="mt-1 block font-normal text-muted">{hint}</span>}
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 font-semibold text-white transition-colors duration-[var(--dur-fast)] hover:bg-accent">
      {children}
    </button>
  );
}
