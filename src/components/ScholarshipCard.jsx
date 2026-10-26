// ScholarshipCard — displays a single scholarship with status badge, save toggle, and apply link

// Helper: calculate days remaining from today to deadline
function getDaysLeft(deadline) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const diff = deadlineDate - today;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Helper: pick the right badge based on days left
function StatusBadge({ daysLeft }) {
  if (daysLeft < 0) {
    return (
      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
        ❌ Expired
      </span>
    );
  }
  if (daysLeft <= 7) {
    return (
      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600 border border-orange-200">
        ⚡ Closing soon
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-600 border border-green-200">
      ✅ Open
    </span>
  );
}

function ScholarshipCard({ scholarship, isSaved, onToggleSave }) {
  const { name, country, level, deadline, link } = scholarship;
  const daysLeft = getDaysLeft(deadline);

  // Level badge color
  const levelColors = {
    Bachelor: "bg-blue-100 text-blue-700",
    Masters: "bg-purple-100 text-purple-700",
    PhD: "bg-pink-100 text-pink-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100">
      {/* Top accent bar with gradient */}
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Name & save button */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-bold text-gray-800 leading-snug">{name}</h2>
          <button
            onClick={() => onToggleSave(scholarship.id)}
            title={isSaved ? "Remove from saved" : "Save scholarship"}
            className={`text-xl flex-shrink-0 transition-transform duration-150 hover:scale-125 ${
              isSaved ? "text-red-500" : "text-gray-300 hover:text-red-400"
            }`}
          >
            {isSaved ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Country & level */}
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="flex items-center gap-1 text-gray-500">
            📍 {country}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelColors[level] || "bg-gray-100 text-gray-600"}`}>
            {level}
          </span>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📅</span>
          <span>
            Deadline:{" "}
            <span className="font-medium text-gray-700">
              {new Date(deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </span>
        </div>

        {/* Days left & status badge */}
        <div className="flex items-center gap-2">
          <StatusBadge daysLeft={daysLeft} />
          {daysLeft >= 0 && (
            <span className="text-xs text-gray-400">
              {daysLeft === 0 ? "Last day!" : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
            </span>
          )}
        </div>

        {/* Spacer so Apply button stays at bottom */}
        <div className="flex-1" />

        {/* Apply button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block w-full text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150 shadow-sm"
        >
          Apply Now →
        </a>
      </div>
    </div>
  );
}

export default ScholarshipCard;
