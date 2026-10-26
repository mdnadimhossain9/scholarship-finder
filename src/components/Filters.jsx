// Filters — dropdowns for country, level, and sort order
function Filters({ countries, filterCountry, setFilterCountry, filterLevel, setFilterLevel, sortOrder, setSortOrder }) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Country filter */}
      <select
        value={filterCountry}
        onChange={(e) => setFilterCountry(e.target.value)}
        className="flex-1 min-w-36 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        <option value="">🌍 All Countries</option>
        {countries.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Level filter */}
      <select
        value={filterLevel}
        onChange={(e) => setFilterLevel(e.target.value)}
        className="flex-1 min-w-36 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        <option value="">🎓 All Levels</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Masters">Masters</option>
        <option value="PhD">PhD</option>
      </select>

      {/* Sort by deadline */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="flex-1 min-w-36 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        <option value="nearest">📅 Deadline: Nearest First</option>
        <option value="farthest">📅 Deadline: Farthest First</option>
      </select>
    </div>
  );
}

export default Filters;
