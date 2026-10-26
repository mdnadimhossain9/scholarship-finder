// SearchBar — controlled input for searching by scholarship name
function SearchBar({ query, setQuery }) {
  return (
    <div className="relative">
      {/* Search icon */}
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search scholarships by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 placeholder-gray-400 transition"
      />
    </div>
  );
}

export default SearchBar;
