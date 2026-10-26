// Header — top nav bar with logo, tabs, and dark mode toggle
function Header({ activeTab, setActiveTab, darkMode, setDarkMode, savedCount }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">🎓</span>
          <span className="font-extrabold text-lg text-indigo-700 dark:text-indigo-400 hidden sm:block tracking-tight">
            ScholarshipFinder
          </span>
        </div>

        {/* Tabs */}
        <nav className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <TabBtn
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            label="All"
            icon="🌐"
          />
          <TabBtn
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
            label={`Saved${savedCount > 0 ? ` (${savedCount})` : ""}`}
            icon="❤️"
          />
        </nav>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
                     text-xl transition-all"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

// Reusable tab button
function TabBtn({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-400 shadow"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      }`}
    >
      {icon} {label}
    </button>
  );
}

export default Header;
