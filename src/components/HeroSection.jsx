import { useEffect, useRef, useState, useMemo } from "react";
import Icon from "./Icons";

/* ── Count-up animation ── */
function CountUp({ target }) {
  const isNum = typeof target === "number";
  const [display, setDisplay] = useState(isNum ? 0 : target);

  useEffect(() => {
    if (!isNum) return;
    let start = 0;
    const duration = 1200, step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [target, isNum]);

  return <span className="animate-count-up">{display}</span>;
}

/* ── Deterministic floating particles ── */
const COLORS = ["#7dd3fc", "#67e8f9", "#bae6fd", "#a5f3fc"];
function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left:  `${5 + (i * 5.9) % 88}%`,
      top:   `${8 + (i * 4.3) % 78}%`,
      size:  `${3 + (i % 4) * 1.5}px`,
      delay: `${(i * 0.35) % 5}s`,
      dur:   `${3 + (i % 4)}s`,
      color: COLORS[i % 4],
    })), []);

  return (
    <>
      {particles.map((p) => (
        <span key={p.id} className="particle"
          style={{ left:p.left, top:p.top, width:p.size, height:p.size,
                   background:p.color, animationDuration:p.dur,
                   animationDelay:p.delay, opacity:0.6 }} />
      ))}
    </>
  );
}

/* ── Typewriter effect ── */
const WORDS = ["Future", "Dreams", "Career", "Journey"];
function TypewriterWord() {
  const [wordIdx, setWordIdx]   = useState(0);
  const [text, setText]         = useState("");
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const word = WORDS[wordIdx];
    function tick() {
      if (!deleting && text.length < word.length) {
        setText(word.slice(0, text.length + 1));
      } else if (!deleting && text.length === word.length) {
        timerRef.current = setTimeout(() => setDeleting(true), 1600); return;
      } else if (deleting && text.length > 0) {
        setText(text.slice(0, -1));
      } else if (deleting && text.length === 0) {
        setDeleting(false); setWordIdx((i) => (i + 1) % WORDS.length); return;
      }
      timerRef.current = setTimeout(tick, deleting ? 55 : 90);
    }
    timerRef.current = setTimeout(tick, deleting ? 55 : 90);
    return () => clearTimeout(timerRef.current);
  }, [text, deleting, wordIdx]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-300">
      {text}<span className="typewriter-cursor" style={{ height:"0.85em" }} />
    </span>
  );
}

/* ── Stat pill ── */
function StatPill({ icon, value, label, delay = "0s" }) {
  return (
    <div className="opacity-0 animate-fade-in-up flex flex-col items-center
                    bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 min-w-28
                    border border-white/20 hover:bg-white/20 hover:scale-105
                    transition-all duration-300 cursor-default"
         style={{ animationDelay: delay }}>
      <div className="w-7 h-7 mb-1 text-sky-200">{icon}</div>
      <span className="text-2xl font-extrabold leading-tight text-white">
        <CountUp target={value} />
      </span>
      <span className="text-xs text-sky-200 mt-0.5">{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   HeroSection
══════════════════════════════════════════ */
function HeroSection({ totalCount, countriesCount }) {
  return (
    <section className="relative overflow-hidden hero-gradient py-20 px-4">
      <Particles />

      {/* Orbiting blobs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="orbit-blob w-10 h-10 rounded-full bg-sky-400/30 blur-xl" />
        <div className="orbit-blob-reverse w-8 h-8 rounded-full bg-cyan-400/30 blur-xl" />
      </div>

      {/* Corner blurs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Floating icon */}
        <div className="animate-float inline-flex items-center justify-center
                        w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm
                        border border-white/20 mb-6 shadow-xl">
          <Icon.GraduationCap className="w-10 h-10 text-white" />
        </div>

        {/* Badge */}
        <div className="opacity-0 animate-fade-in-up mb-4" style={{ animationDelay:"0.1s" }}>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                           text-white/90 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">
            <Icon.Sparkles className="w-4 h-4 text-cyan-300" />
            Verified &amp; Updated Scholarships
          </span>
        </div>

        {/* Headline */}
        <h2 className="opacity-0 animate-fade-in-up text-4xl sm:text-6xl font-extrabold
                       text-white leading-tight mb-4" style={{ animationDelay:"0.2s" }}>
          Fund Your <TypewriterWord />
        </h2>

        {/* Subtitle */}
        <p className="opacity-0 animate-fade-in-up text-sky-200 text-lg mb-10
                      max-w-xl mx-auto leading-relaxed" style={{ animationDelay:"0.35s" }}>
          Browse <strong className="text-white">{totalCount} verified scholarships</strong> from{" "}
          <strong className="text-white">{countriesCount} countries</strong>.
          Filter, save, and apply — all free.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4">
          <StatPill icon={<Icon.BookOpen   className="w-full h-full" />} value={totalCount}    label="Scholarships"  delay="0.45s" />
          <StatPill icon={<Icon.Globe      className="w-full h-full" />} value={countriesCount} label="Countries"     delay="0.55s" />
          <StatPill icon={<Icon.Award      className="w-full h-full" />} value="100%"           label="Free to Apply" delay="0.65s" />
          <StatPill icon={<Icon.Check      className="w-full h-full" />} value="All"            label="Verified"      delay="0.75s" />
        </div>

        {/* Scroll hint */}
        <div className="opacity-0 animate-fade-in-up mt-10 flex flex-col items-center
                        gap-1 text-white/40 text-xs" style={{ animationDelay:"0.9s" }}>
          <span>scroll to explore</span>
          <Icon.ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
