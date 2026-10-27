import Icon from "./Icons";

// SearchBar — controlled input with SVG search icon
function SearchBar({ query, setQuery }) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Icon.Search className="w-4 h-4 text-slate-400" />
      </span>
      <input
        type="text"
        placeholder="Search scholarships by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl
                   border border-slate-200 dark:border-slate-700
                   bg-white dark:bg-slate-800 shadow-sm
                   text-slate-700 dark:text-slate-200
                   placeholder-slate-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                   transition-all duration-200"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute inset-y-0 right-4 flex items-center
                     text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <Icon.X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
