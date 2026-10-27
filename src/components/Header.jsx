import { useState, useEffect } from "react";
import Icon from "./Icons";

function Header({ activeTab, setActiveTab, darkMode, setDarkMode, savedCount }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300
                  bg-white/90 dark:bg-slate-900/90 backdrop-blur-md
                  border-b border-slate-200 dark:border-slate-700
                  ${scrolled ? "shadow-lg shadow-sky-100/50 dark:shadow-sky-900/20" : "shadow-sm"}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-default">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600
                          flex items-center justify-center shadow-sm
                          group-hover:scale-110 transition-transform duration-200">
            <Icon.GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg text-sky-700 dark:text-sky-400 hidden sm:block tracking-tight">
            ScholarshipFinder
          </span>
        </div>

        {/* Tabs */}
        <nav className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          <TabBtn active={activeTab === "all"}   onClick={() => setActiveTab("all")}
                  label="All" icon={<Icon.Globe className="w-4 h-4" />} />
          <TabBtn active={activeTab === "saved"} onClick={() => setActiveTab("saved")}
                  label={savedCount > 0 ? `Saved (${savedCount})` : "Saved"}
                  icon={<Icon.Heart filled={savedCount > 0} className="w-4 h-4" />} />
        </nav>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          title={darkMode ? "Light mode" : "Dark mode"}
          className="w-10 h-10 flex items-center justify-center rounded-xl
                     border border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-800
                     hover:bg-sky-50 dark:hover:bg-sky-900/30
                     hover:border-sky-300 dark:hover:border-sky-600
                     hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <span className="inline-block transition-transform duration-500"
                style={{ transform: darkMode ? "rotate(180deg)" : "rotate(0deg)" }}>
            {darkMode
              ? <Icon.Sun   className="w-5 h-5 text-amber-400" />
              : <Icon.Moon  className="w-5 h-5 text-slate-500" />}
          </span>
        </button>
      </div>
    </header>
  );
}

function TabBtn({ active, onClick, label, icon }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold
                  transition-all duration-200
                  ${active
                    ? "bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50"}`}>
      {icon}{label}
    </button>
  );
}

export default Header;
