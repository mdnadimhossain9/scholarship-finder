import { useEffect, useRef, useState } from "react";

// QuickViewModal — animated full-detail overlay
function QuickViewModal({ scholarship, isSaved, onToggleSave, onClose }) {
  // Animate in — visible flips to true after mount via RAF so CSS transition fires
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Lock body scroll and trigger open animation
    document.body.style.overflow = "hidden";
    rafRef.current = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!scholarship) return null;

  const { name, country, level, field, deadline, amount, funded, link } = scholarship;

  // Days left
  const today = new Date(); today.setHours(0,0,0,0);
  const dl    = new Date(deadline); dl.setHours(0,0,0,0);
  const daysLeft = Math.floor((dl - today) / 86400000);

  const levelColors = {
    Bachelor: "bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-300",
    Masters:  "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    PhD:      "bg-pink-100   text-pink-700   dark:bg-pink-900/40   dark:text-pink-300",
  };

  return (
    /* Animated backdrop */
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop
                  transition-all duration-300
                  ${visible ? "bg-black/60" : "bg-black/0 pointer-events-none"}`}
    >
      {/* Modal panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl
                    overflow-hidden transition-all duration-300
                    ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-8"}`}
      >
        {/* Animated sweeping top bar */}
        <div className="h-2 card-bar" />

        {/* Header row */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between gap-3">
          <div className="animate-slide-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{name}</h2>
            <p className="text-sm text-gray-400 mt-0.5">📍 {country}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl leading-none
                       flex-shrink-0 mt-0.5 hover:rotate-90 hover:scale-110 transition-transform duration-200"
          >
            ✕
          </button>
        </div>

        {/* Amount highlight */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20
                        border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 animate-count-up">{amount}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold
            ${funded === "Fully Funded"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
            {funded}
          </span>
        </div>

        {/* Details grid — each row staggered */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          {[
            { icon:"🎓", label:"Study Level",   value:<span className={`px-2 py-0.5 rounded-full text-xs font-bold ${levelColors[level]}`}>{level}</span>, delay:"0.05s" },
            { icon:"📖", label:"Field",          value: field,   delay:"0.10s" },
            { icon:"📅", label:"Deadline",       value: new Date(deadline).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}), delay:"0.15s" },
            { icon:"⏳", label:"Days Remaining", value:
                daysLeft < 0
                  ? <span className="text-red-500 font-bold">Expired</span>
                  : daysLeft <= 7
                  ? <span className="text-orange-500 font-bold">{daysLeft} days ⚡</span>
                  : <span className="text-green-600 font-bold">{daysLeft} days left</span>,
              delay:"0.20s" },
          ].map(({ icon, label, value, delay }) => (
            <div key={label}
                 className="opacity-0 animate-fade-in-up flex flex-col gap-0.5"
                 style={{ animationDelay: delay }}>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{icon} {label}</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{value}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={() => onToggleSave(scholarship.id)}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2
                        hover:scale-105 active:scale-95 transition-all duration-200
                        ${isSaved
                          ? "border-red-400 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600"}`}
          >
            {isSaved ? "❤️ Saved" : "🤍 Save"}
          </button>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[2] py-3 px-6 rounded-xl font-semibold text-sm text-center
                       bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                       hover:from-indigo-500 hover:to-purple-500 hover:scale-105
                       active:scale-95 transition-all duration-200 shadow-md"
          >
            Apply Now →
          </a>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
