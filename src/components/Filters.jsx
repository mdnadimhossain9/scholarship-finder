// Filters — dropdowns for country, level, field, and sort order
function Filters({ countries, filterCountry, setFilterCountry, filterLevel, setFilterLevel, filterField, setFilterField, sortOrder, setSortOrder }) {
  const selectClass = `
    flex-1 min-w-36 px-4 py-3 rounded-xl
    border border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-800 shadow-sm
    text-slate-700 dark:text-slate-200
    focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
    transition-all duration-200 text-sm cursor-pointer
  `;

  return (
    <div className="flex flex-wrap gap-3">
      <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className={selectClass}>
        <option value="">All Countries</option>
        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className={selectClass}>
        <option value="">All Levels</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Masters">Masters</option>
        <option value="PhD">PhD</option>
      </select>

      <select value={filterField} onChange={(e) => setFilterField(e.target.value)} className={selectClass}>
        <option value="">All Fields</option>
        <option value="All Fields">All Fields</option>
        <option value="Research">Research</option>
        <option value="Science & Arts">Science &amp; Arts</option>
        <option value="Economics">Economics</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={selectClass}>
        <option value="nearest">Nearest Deadline</option>
        <option value="farthest">Farthest Deadline</option>
      </select>
    </div>
  );
}

export default Filters;
