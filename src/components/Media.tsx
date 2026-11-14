// Image slot. Renders the photo when `src` is given; otherwise a labelled
// placeholder describing the photograph that needs to be supplied.
type Props = {
  src?: string;
  alt: string;
  brief: string; // what the photo should show
  className?: string;
  tone?: "light" | "dark";
};

export default function Media({ src, alt, brief, className = "", tone = "light" }: Props) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
  }
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${alt}`}
      className={`relative flex h-full w-full items-end overflow-hidden ${dark ? "bg-[#1a1d22]" : "bg-[#e9ebee]"} ${className}`}
    >
      <svg aria-hidden="true" className={`absolute inset-0 h-full w-full ${dark ? "text-white/[0.05]" : "text-ink/[0.05]"}`}>
        <defs>
          <pattern id="m-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#m-grid)" />
      </svg>
      <div className={`relative m-5 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${dark ? "bg-white/10 text-on-dark" : "bg-white/80 text-body"}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
        Photo needed: {brief}
      </div>
    </div>
  );
}
