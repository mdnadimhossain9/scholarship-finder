import { useState, useEffect } from "react";

// Header — sticky frosted nav with scroll shadow and animated dark toggle
function Header({ activeTab, setActiveTab, darkMode, setDarkMode, savedCount }) {
  // Add shadow when page is scrolled
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300
                  bg-white/80 dark:bg-gray-950/80 backdrop-blur-md
                  border-b border-gray-200 dark:border-gray-800
                  ${scrolled ? "shadow-lg shadow-indigo-100/40 dark:shadow-indigo-900/20" : "shadow-sm"}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-default">
          <span className="text-2xl group-hover:animate-bounce-soft inline-block transition-transform">🎓</span>
          <span className="font-extrabold text-lg text-indigo-700 dark:text-indigo-400 hidden sm:block tracking-tight">
            ScholarshipFinder
          </span>
        </div>

        {/* Tabs */}
        <nav className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <TabBtn active={activeTab === "all"}   onClick={() => setActiveTab("all")}   label="All"    icon="🌐" />
          <TabBtn
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
            label={savedCount > 0 ? `Saved (${savedCount})` : "Saved"}
            icon="❤️"
            badge={savedCount}
          />
        </nav>

        {/* Dark mode toggle with rotation animation */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          title={darkMode ? "Light mode" : "Dark mode"}
          className="w-10 h-10 flex items-center justify-center rounded-xl
                     border border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-800
                     hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                     hover:border-indigo-300 dark:hover:border-indigo-600
                     hover:scale-110 active:scale-95
                     transition-all duration-200 text-xl"
          style={{ transformOrigin: "center" }}
        >
          <span
            className="inline-block transition-transform duration-500"
            style={{ transform: darkMode ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            {darkMode ? "☀️" : "🌙"}
          </span>
        </button>
      </div>
    </header>
  );
}

// Animated tab button
function TabBtn({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
                  ${active
                    ? "bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-400 shadow"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
    >
      {icon} {label}
    </button>
  );
}

export default Header;
