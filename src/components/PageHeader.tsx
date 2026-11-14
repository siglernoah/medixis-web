import Reveal from "./Reveal";

export default function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: string }) {
  return (
    <header className="container-content pb-16 pt-24 md:pb-24 md:pt-36">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="text-h1 mt-5 max-w-[18ch] font-semibold">{title}</h1>
        {lead && <p className="text-lead mt-8 max-w-[38rem] text-body">{lead}</p>}
      </Reveal>
    </header>
  );
}

export function Chapter({
  id, eyebrow, title, children, tone = "white",
}: { id: string; eyebrow?: string; title: React.ReactNode; children?: React.ReactNode; tone?: "white" | "mist" | "ink" }) {
  const bg = tone === "mist" ? "bg-mist" : tone === "ink" ? "on-dark bg-ink text-on-dark-muted" : "";
  return (
    <section aria-labelledby={id} className={`chapter ${bg}`}>
      <div className="container-content">
        <Reveal>
          {eyebrow && <p className={`text-small font-semibold ${tone === "ink" ? "text-accent-on-dark" : "text-accent"}`}>{eyebrow}</p>}
          <h2 id={id} className={`text-h2 mt-4 max-w-[20ch] ${tone === "ink" ? "text-on-dark" : ""}`}>{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
