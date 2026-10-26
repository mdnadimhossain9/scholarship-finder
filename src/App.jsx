import { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import FilterChips from "./components/FilterChips";
import ScholarshipList from "./components/ScholarshipList";
import QuickViewModal from "./components/QuickViewModal";
import scholarships from "./data/scholarships";

// Get unique sorted values for a given key
function unique(arr, key) {
  return [...new Set(arr.map((s) => s[key]))].sort();
}

function App() {
  // ── Dark mode (persisted) ──────────────────────────────
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem("darkMode") === "true"; }
    catch { return false; }
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    // Toggle Tailwind dark class on <html>
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ── Tabs ───────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("all"); // "all" | "saved"

  // ── Search & Filters ───────────────────────────────────
  const [query, setQuery]               = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterLevel, setFilterLevel]   = useState("");
  const [filterField, setFilterField]   = useState("");
  const [sortOrder, setSortOrder]       = useState("nearest");

  // ── Saved IDs (localStorage) ───────────────────────────
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem("savedScholarships");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("savedScholarships", JSON.stringify(savedIds));
  }, [savedIds]);

  function handleToggleSave(id) {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // ── Quick View Modal ───────────────────────────────────
  const [modalScholarship, setModalScholarship] = useState(null);

  // ── Simulate initial loading skeleton ─────────────────
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // ── Filter chip clear handler ──────────────────────────
  function clearFilter(key) {
    if (key === "query")   setQuery("");
    if (key === "country") setFilterCountry("");
    if (key === "level")   setFilterLevel("");
    if (key === "field")   setFilterField("");
  }

  // ── Compute displayed scholarships ─────────────────────
  const countries = unique(scholarships, "country");

  let displayed = scholarships
    .filter((s) => (activeTab === "saved" ? savedIds.includes(s.id) : true))
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    .filter((s) => (filterCountry ? s.country === filterCountry : true))
    .filter((s) => (filterLevel   ? s.level   === filterLevel   : true))
    .filter((s) => (filterField   ? s.field   === filterField   : true));

  // Sort by deadline
  displayed = [...displayed].sort((a, b) => {
    const diff = new Date(a.deadline) - new Date(b.deadline);
    return sortOrder === "nearest" ? diff : -diff;
  });

  // Unique country count for hero stats
  const countryCount = unique(scholarships, "country").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">

      {/* Sticky header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        savedCount={savedIds.length}
      />

      {/* Hero — only on All tab */}
      {activeTab === "all" && (
        <HeroSection totalCount={scholarships.length} countriesCount={countryCount} />
      )}

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">

        {/* Saved tab header */}
        {activeTab === "saved" && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">❤️ Saved Scholarships</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {savedIds.length === 0
                ? "You haven't saved any scholarships yet."
                : `You have ${savedIds.length} saved scholarship${savedIds.length !== 1 ? "s" : ""}.`}
            </p>
          </div>
        )}

        {/* Search & Filters — shown only on All tab */}
        {activeTab === "all" && (
          <div className="flex flex-col gap-4 mb-6">
            <SearchBar query={query} setQuery={setQuery} />
            <Filters
              countries={countries}
              filterCountry={filterCountry}
              setFilterCountry={setFilterCountry}
              filterLevel={filterLevel}
              setFilterLevel={setFilterLevel}
              filterField={filterField}
              setFilterField={setFilterField}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
            {/* Active filter chips */}
            <FilterChips
              query={query}
              filterCountry={filterCountry}
              filterLevel={filterLevel}
              filterField={filterField}
              onClear={clearFilter}
            />
          </div>
        )}

        {/* Result count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
            {loading ? "Loading..." : `${displayed.length} scholarship${displayed.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Scholarship grid */}
        <ScholarshipList
          scholarships={displayed}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onQuickView={setModalScholarship}
          loading={loading && activeTab === "all"}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <span className="font-bold text-gray-600 dark:text-gray-300">ScholarshipFinder</span>
          </div>
          <p className="text-center text-xs">
            ⚠️ Always verify deadlines on the{" "}
            <span className="font-semibold text-indigo-500">official website</span>{" "}
            before applying.
          </p>
          <p className="text-xs">© {new Date().getFullYear()} ScholarshipFinder</p>
        </div>
      </footer>

      {/* Quick View Modal — only mounted when a scholarship is selected */}
      {modalScholarship && (
        <QuickViewModal
          scholarship={modalScholarship}
          isSaved={savedIds.includes(modalScholarship.id)}
          onToggleSave={handleToggleSave}
          onClose={() => setModalScholarship(null)}
        />
      )}
    </div>
  );
}

export default App;
