import Icon from "./Icons";

// FilterChips — active filters shown as removable pills
function FilterChips({ query, filterCountry, filterLevel, filterField, onClear }) {
  const chips = [
    query         && { key: "query",   label: `"${query}"`,      icon: <Icon.Search    className="w-3 h-3" />, onRemove: () => onClear("query") },
    filterCountry && { key: "country", label: filterCountry,     icon: <Icon.MapPin    className="w-3 h-3" />, onRemove: () => onClear("country") },
    filterLevel   && { key: "level",   label: filterLevel,       icon: <Icon.GraduationCap className="w-3 h-3" />, onRemove: () => onClear("level") },
    filterField   && { key: "field",   label: filterField,       icon: <Icon.BookOpen  className="w-3 h-3" />, onRemove: () => onClear("field") },
  ].filter(Boolean);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center animate-slide-down">
      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Active filters:</span>
      {chips.map((chip) => (
        <button key={chip.key} onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                     bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300
                     border border-sky-200 dark:border-sky-700
                     hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors">
          {chip.icon}
          {chip.label}
          <Icon.X className="w-2.5 h-2.5 text-sky-400 hover:text-sky-700 dark:hover:text-white" />
        </button>
      ))}
      <button onClick={() => ["query","country","level","field"].forEach(k => onClear(k))}
        className="text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 underline transition-colors ml-1">
        Clear all
      </button>
    </div>
  );
}

export default FilterChips;
