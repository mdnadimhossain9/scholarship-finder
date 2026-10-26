// HeroSection — animated banner with stats and a tagline
function HeroSection({ totalCount, countriesCount }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 px-4">
      {/* Decorative blurred blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Floating emoji */}
        <div className="animate-float inline-block text-5xl mb-4">🎓</div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
          Fund Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
            Future
          </span>
        </h2>
        <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
          Browse verified scholarships from around the world. Filter by country, level, and deadline — all in one place.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 text-white">
          <StatPill icon="📚" value={totalCount} label="Scholarships" />
          <StatPill icon="🌍" value={countriesCount} label="Countries" />
          <StatPill icon="💰" value="100%" label="Free to Apply" />
          <StatPill icon="✅" value="All" label="Verified Links" />
        </div>
      </div>
    </section>
  );
}

// Small stat pill used inside the hero
function StatPill({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 min-w-24 border border-white/20">
      <span className="text-xl">{icon}</span>
      <span className="text-2xl font-extrabold leading-tight">{value}</span>
      <span className="text-xs text-indigo-200">{label}</span>
    </div>
  );
}

export default HeroSection;
