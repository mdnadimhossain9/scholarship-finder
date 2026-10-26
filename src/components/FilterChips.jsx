// FilterChips — shows active filters as removable pill tags
function FilterChips({ query, filterCountry, filterLevel, filterField, onClear }) {
  const chips = [
    query        && { key: "query",   label: `"${query}"`,    onRemove: () => onClear("query") },
    filterCountry && { key: "country", label: `📍 ${filterCountry}`, onRemove: () => onClear("country") },
    filterLevel   && { key: "level",   label: `🎓 ${filterLevel}`,   onRemove: () => onClear("level") },
    filterField   && { key: "field",   label: `📖 ${filterField}`,   onRemove: () => onClear("field") },
  ].filter(Boolean);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center animate-slide-down">
      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Active filters:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
                     bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300
                     border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-200
                     dark:hover:bg-indigo-800 transition-colors"
        >
          {chip.label}
          <span className="ml-1 text-indigo-400 hover:text-indigo-700 dark:hover:text-white font-bold">✕</span>
        </button>
      ))}
      {/* Clear all */}
      <button
        onClick={() => ["query","country","level","field"].forEach(k => onClear(k))}
        className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 underline transition-colors ml-1"
      >
        Clear all
      </button>
    </div>
  );
}

export default FilterChips;
