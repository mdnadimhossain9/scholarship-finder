import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import ScholarshipList from "./components/ScholarshipList";
import scholarships from "./data/scholarships";

// Helper: get unique sorted country values from data
function getCountries(data) {
  return [...new Set(data.map((s) => s.country))].sort();
}

function App() {
  // --- State ---
  const [activeTab, setActiveTab] = useState("all"); // "all" | "saved"
  const [query, setQuery] = useState("");             // search text
  const [filterCountry, setFilterCountry] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [sortOrder, setSortOrder] = useState("nearest"); // "nearest" | "farthest"

  // Load saved IDs from localStorage (persists across refreshes)
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem("savedScholarships");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage in sync whenever savedIds changes
  useEffect(() => {
    localStorage.setItem("savedScholarships", JSON.stringify(savedIds));
  }, [savedIds]);

  // Toggle save/unsave a scholarship by id
  function handleToggleSave(id) {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // --- Filtering & Sorting ---
  const countries = getCountries(scholarships);

  let displayed = scholarships
    // Tab filter
    .filter((s) => (activeTab === "saved" ? savedIds.includes(s.id) : true))
    // Search by name
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    // Country filter
    .filter((s) => (filterCountry ? s.country === filterCountry : true))
    // Level filter
    .filter((s) => (filterLevel ? s.level === filterLevel : true));

  // Sort by deadline
  displayed = displayed.sort((a, b) => {
    const diff = new Date(a.deadline) - new Date(b.deadline);
    return sortOrder === "nearest" ? diff : -diff;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* App header with tabs */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Search & Filters — hidden on saved tab to keep it simple */}
        {activeTab === "all" && (
          <div className="flex flex-col gap-4 mb-8">
            <SearchBar query={query} setQuery={setQuery} />
            <Filters
              countries={countries}
              filterCountry={filterCountry}
              setFilterCountry={setFilterCountry}
              filterLevel={filterLevel}
              setFilterLevel={setFilterLevel}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        )}

        {/* Result count */}
        <p className="text-sm text-gray-400 mb-4">
          {displayed.length} scholarship{displayed.length !== 1 ? "s" : ""} found
        </p>

        {/* Scholarship cards grid */}
        <ScholarshipList
          scholarships={displayed}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-5 text-center text-sm text-gray-400">
        <p>
          ⚠️ Always check the{" "}
          <span className="font-semibold text-gray-500">official website</span>{" "}
          for the latest deadline.
        </p>
        <p className="mt-1 text-xs text-gray-300">
          © {new Date().getFullYear()} Scholarship Finder
        </p>
      </footer>
    </div>
  );
}

export default App;
