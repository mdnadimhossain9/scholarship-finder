// QuickViewModal — full detail overlay when user clicks "Quick View"
function QuickViewModal({ scholarship, isSaved, onToggleSave, onClose }) {
  if (!scholarship) return null;

  const { name, country, level, field, deadline, amount, funded, link } = scholarship;

  // Calculate days left
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const daysLeft = Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24));

  const levelColors = {
    Bachelor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Masters:  "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    PhD:      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 modal-backdrop"
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}  // prevent closing when clicking inside
      >
        {/* Gradient top bar */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{name}</h2>
            <p className="text-sm text-gray-400 mt-0.5">📍 {country}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl leading-none flex-shrink-0 mt-0.5"
          >
            ✕
          </button>
        </div>

        {/* Details grid */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          <Detail icon="💰" label="Award Amount" value={amount} accent />
          <Detail icon="🎓" label="Study Level" value={<span className={`px-2 py-0.5 rounded-full text-xs font-bold ${levelColors[level]}`}>{level}</span>} />
          <Detail icon="📖" label="Field of Study" value={field} />
          <Detail icon="✨" label="Funding Type" value={funded} />
          <Detail
            icon="📅"
            label="Deadline"
            value={new Date(deadline).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })}
          />
          <Detail
            icon="⏳"
            label="Days Remaining"
            value={
              daysLeft < 0
                ? <span className="text-red-500 font-bold">Expired</span>
                : daysLeft <= 7
                ? <span className="text-orange-500 font-bold">{daysLeft} days left ⚡</span>
                : <span className="text-green-600 font-bold">{daysLeft} days left</span>
            }
          />
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={() => onToggleSave(scholarship.id)}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all ${
              isSaved
                ? "border-red-400 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600"
            }`}
          >
            {isSaved ? "❤️ Saved" : "🤍 Save"}
          </button>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-2 flex-grow-[2] py-3 px-6 rounded-xl font-semibold text-sm text-center
                       bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90
                       active:scale-95 transition-all shadow-md"
          >
            Apply Now →
          </a>
        </div>
      </div>
    </div>
  );
}

// Small detail row used inside the modal
function Detail({ icon, label, value, accent }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{icon} {label}</span>
      <span className={`text-sm font-semibold ${accent ? "text-indigo-600 dark:text-indigo-400 text-base" : "text-gray-800 dark:text-gray-200"}`}>
        {value}
      </span>
    </div>
  );
}

export default QuickViewModal;
