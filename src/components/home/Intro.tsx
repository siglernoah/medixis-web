import Logo from "@/components/Logo";

/**
 * Homepage intro, 4.5 s. Plays once per browser session on a full page load; skipped for
 * reduced motion, repeat visits in the same session, client-side navigation and when JS is off.
 * Pure CSS after the tiny inline script decides whether to play, so it paints immediately.
 */
const decide = `(function(){try{var h=document.documentElement;
if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('mx-intro')){return;}
sessionStorage.setItem('mx-intro','1');h.classList.add('intro');
setTimeout(function(){h.classList.remove('intro');},4550);}catch(e){}})();`;

export default function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: decide }} />
      <div className="intro-overlay" aria-hidden="true">
        <span className="intro-aurora a1" />
        <span className="intro-aurora a2" />
        <span className="intro-aurora a3" />
        <div className="relative flex flex-col items-center px-6">
          <div className="intro-logo">
            <Logo dark className="h-auto w-[min(80vw,35rem)]" />
          </div>
          <div className="mt-6 flex w-full items-center justify-center gap-4 text-[clamp(0.78rem,1.7vw,1.15rem)] tracking-[0.32em] text-white/85">
            <span className="intro-rule h-px w-10 origin-right bg-turquoise sm:w-16" />
            <span className="intro-tag whitespace-nowrap uppercase">Healthcare supply chain partner</span>
            <span className="intro-rule h-px w-10 origin-left bg-turquoise sm:w-16" />
          </div>
        </div>
      </div>
    </>
  );
}
