// SearchBar — controlled input for searching by scholarship name
function SearchBar({ query, setQuery }) {
  return (
    <div className="relative">
      {/* Search icon */}
      <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none text-lg">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search scholarships by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800 shadow-sm text-gray-700 dark:text-gray-200
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />
      {/* Clear button */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
