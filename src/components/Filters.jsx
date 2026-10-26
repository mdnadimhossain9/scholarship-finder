// Filters — dropdowns for country, level, field, and sort order
function Filters({ countries, filterCountry, setFilterCountry, filterLevel, setFilterLevel, filterField, setFilterField, sortOrder, setSortOrder }) {
  const selectClass = `
    flex-1 min-w-36 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
    bg-white dark:bg-gray-800 shadow-sm text-gray-700 dark:text-gray-200
    focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm
  `;

  return (
    <div className="flex flex-wrap gap-3">
      {/* Country filter */}
      <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className={selectClass}>
        <option value="">🌍 All Countries</option>
        {countries.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Level filter */}
      <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className={selectClass}>
        <option value="">🎓 All Levels</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Masters">Masters</option>
        <option value="PhD">PhD</option>
      </select>

      {/* Field filter */}
      <select value={filterField} onChange={(e) => setFilterField(e.target.value)} className={selectClass}>
        <option value="">📖 All Fields</option>
        <option value="All Fields">All Fields</option>
        <option value="Research">Research</option>
        <option value="Science & Arts">Science &amp; Arts</option>
        <option value="Economics">Economics</option>
      </select>

      {/* Sort by deadline */}
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={selectClass}>
        <option value="nearest">📅 Nearest Deadline</option>
        <option value="farthest">📅 Farthest Deadline</option>
      </select>
    </div>
  );
}

export default Filters;
