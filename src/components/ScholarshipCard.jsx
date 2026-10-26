// ScholarshipCard — individual scholarship card with badge, award, days left, quick-view, and save

// Helper: days remaining from today to deadline
function getDaysLeft(deadline) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(deadline);
  d.setHours(0, 0, 0, 0);
  return Math.floor((d - today) / (1000 * 60 * 60 * 24));
}

// Status badge — Expired / Closing soon / Open
function StatusBadge({ daysLeft }) {
  if (daysLeft < 0)
    return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-800">❌ Expired</span>;
  if (daysLeft <= 7)
    return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 border border-orange-200 dark:border-orange-800">⚡ Closing soon</span>;
  return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800">✅ Open</span>;
}

function ScholarshipCard({ scholarship, isSaved, onToggleSave, onQuickView, index }) {
  const { name, country, level, field, deadline, amount, funded } = scholarship;
  const daysLeft = getDaysLeft(deadline);

  // Level badge color
  const levelColors = {
    Bachelor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Masters:  "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    PhD:      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  };

  // Funded badge color
  const fundedColor = funded === "Fully Funded"
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
    : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400";

  return (
    <div
      className={`opacity-0 animate-fade-in-up card-${Math.min(index + 1, 12)} group relative bg-white dark:bg-gray-800
                  rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300
                  flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700`}
    >
      {/* Top gradient accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Top row: name + save button */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white leading-snug line-clamp-2">
            {name}
          </h2>
          <button
            onClick={() => onToggleSave(scholarship.id)}
            title={isSaved ? "Remove from saved" : "Save"}
            className={`text-xl flex-shrink-0 transition-transform duration-150 hover:scale-125 ${
              isSaved ? "text-red-500" : "text-gray-300 dark:text-gray-600 hover:text-red-400"
            }`}
          >
            {isSaved ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Award amount — highlighted */}
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{amount}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${fundedColor}`}>
            {funded}
          </span>
        </div>

        {/* Country, Level, Field */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
            📍 {country}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelColors[level] || ""}`}>
            {level}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
            📖 {field}
          </span>
        </div>

        {/* Deadline */}
        <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
          <span>📅</span>
          <span>
            Deadline:{" "}
            <span className="font-semibold text-gray-600 dark:text-gray-300">
              {new Date(deadline).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" })}
            </span>
          </span>
        </div>

        {/* Status badge + days left */}
        <div className="flex items-center gap-2">
          <StatusBadge daysLeft={daysLeft} />
          {daysLeft >= 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {daysLeft === 0 ? "Today!" : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex gap-2 mt-1">
          {/* Quick View */}
          <button
            onClick={() => onQuickView(scholarship)}
            className="flex-1 py-2.5 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400
                       text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
          >
            Quick View
          </button>
          {/* Apply */}
          <a
            href={scholarship.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                       text-sm font-semibold text-center hover:opacity-90 active:scale-95 transition-all shadow-sm"
          >
            Apply →
          </a>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipCard;
