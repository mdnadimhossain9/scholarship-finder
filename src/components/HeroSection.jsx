import { useEffect, useRef, useState, useMemo } from "react";

/* ── Animated count-up number ── */
function CountUp({ target }) {
  const [display, setDisplay] = useState(typeof target === "number" ? 0 : target);
  const isNum = typeof target === "number";

  useEffect(() => {
    if (!isNum) return; // string targets like "100%" show as-is
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [target, isNum]);

  return <span className="animate-count-up">{display}</span>;
}

/* ── Stable random particles — generated once with useMemo ── */
const PARTICLE_COLORS = ["#a5b4fc", "#f9a8d4", "#fde68a", "#6ee7b7"];

function Particles() {
  // useMemo keeps the values stable across re-renders (fixes the purity lint rule)
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left:  `${5  + (i * 5.2)  % 85}%`,
        top:   `${10 + (i * 4.7)  % 75}%`,
        size:  `${4  + (i % 3) * 2}px`,
        delay: `${(i * 0.3) % 5}s`,
        dur:   `${3  + (i % 4)}s`,
        color: PARTICLE_COLORS[i % 4],
      })),
    [] // computed once
  );

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: p.color,
            animationDuration: p.dur,
            animationDelay: p.delay,
            opacity: 0.7,
          }}
        />
      ))}
    </>
  );
}

/* ── Typewriter headline ── */
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
        timerRef.current = setTimeout(() => setDeleting(true), 1600);
        return;
      } else if (deleting && text.length > 0) {
        setText(text.slice(0, -1));
      } else if (deleting && text.length === 0) {
        // Move to next word via state updater (not direct setState in effect body)
        setDeleting(false);
        setWordIdx((i) => (i + 1) % WORDS.length);
        return;
      }
      timerRef.current = setTimeout(tick, deleting ? 55 : 90);
    }

    timerRef.current = setTimeout(tick, deleting ? 55 : 90);
    return () => clearTimeout(timerRef.current);
  }, [text, deleting, wordIdx]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
      {text}
      <span className="typewriter-cursor" style={{ height: "0.85em" }} />
    </span>
  );
}

/* ── Stat pill with staggered fade and count-up ── */
function StatPill({ icon, value, label, delay = "0s" }) {
  return (
    <div
      className="opacity-0 animate-fade-in-up flex flex-col items-center
                 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 min-w-28
                 border border-white/20 hover:bg-white/20 hover:scale-105
                 transition-all duration-300 cursor-default"
      style={{ animationDelay: delay }}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-2xl font-extrabold leading-tight text-white">
        <CountUp target={value} />
      </span>
      <span className="text-xs text-indigo-200 mt-0.5">{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   HeroSection
══════════════════════════════════════════ */
function HeroSection({ totalCount, countriesCount }) {
  return (
    <section className="relative overflow-hidden hero-gradient py-20 px-4">

      {/* Floating particles */}
      <Particles />

      {/* Orbiting blobs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="orbit-blob w-10 h-10 rounded-full bg-indigo-400/30 blur-xl" />
        <div className="orbit-blob-reverse w-8 h-8 rounded-full bg-pink-400/30 blur-xl" />
      </div>

      {/* Decorative corner blurs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-600/20  rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]
                      bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">

        {/* Floating emoji */}
        <div className="animate-float inline-block text-6xl mb-5 drop-shadow-xl">🎓</div>

        {/* Trust badge */}
        <div className="opacity-0 animate-fade-in-up mb-4" style={{ animationDelay: "0.1s" }}>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90
                           border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">
            ✨ Verified &amp; Updated Scholarships
          </span>
        </div>

        {/* Headline with typewriter */}
        <h2
          className="opacity-0 animate-fade-in-up text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-4"
          style={{ animationDelay: "0.2s" }}
        >
          Fund Your <TypewriterWord />
        </h2>

        {/* Subtitle */}
        <p
          className="opacity-0 animate-fade-in-up text-indigo-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ animationDelay: "0.35s" }}
        >
          Browse <strong className="text-white">{totalCount} verified scholarships</strong> from{" "}
          <strong className="text-white">{countriesCount} countries</strong>.
          Filter, save, and apply — all free.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-4 text-white">
          <StatPill icon="📚" value={totalCount}    label="Scholarships"  delay="0.45s" />
          <StatPill icon="🌍" value={countriesCount} label="Countries"     delay="0.55s" />
          <StatPill icon="💰" value="100%"           label="Free to Apply" delay="0.65s" />
          <StatPill icon="✅" value="All"            label="Verified"      delay="0.75s" />
        </div>

        {/* Scroll hint */}
        <div
          className="opacity-0 animate-fade-in-up mt-10 flex flex-col items-center gap-1 text-white/40 text-xs"
          style={{ animationDelay: "0.9s" }}
        >
          <span>scroll to explore</span>
          <span className="animate-bounce text-lg">↓</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
