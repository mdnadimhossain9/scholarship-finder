// Header — displays the app title and nav tabs
function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* App name */}
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          🎓 Scholarship Finder
        </h1>
        <p className="text-indigo-200 text-sm mt-1">
          Discover opportunities around the world
        </p>

        {/* Navigation tabs */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === "all"
                ? "bg-white text-indigo-700 shadow"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            All Scholarships
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === "saved"
                ? "bg-white text-indigo-700 shadow"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            ❤️ Saved
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
