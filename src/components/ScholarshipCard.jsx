import { useRef, useState, useCallback } from "react";

/* ── Days remaining helper ── */
function getDaysLeft(deadline) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(deadline);
  d.setHours(0, 0, 0, 0);
  return Math.floor((d - today) / (1000 * 60 * 60 * 24));
}

/* ── Status badge — with pulse ring when closing soon ── */
function StatusBadge({ daysLeft }) {
  if (daysLeft < 0)
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-bold
                       bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400
                       border border-red-200 dark:border-red-800">
        ❌ Expired
      </span>
    );
  if (daysLeft <= 7)
    return (
      <span className="pulse-ring px-2 py-0.5 rounded-full text-xs font-bold
                       bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400
                       border border-orange-200 dark:border-orange-800">
        ⚡ Closing soon
      </span>
    );
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-bold
                     bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400
                     border border-green-200 dark:border-green-800">
      ✅ Open
    </span>
  );
}

/* ── Ripple button — shows a wave on click ── */
function RippleButton({ onClick, href, className, children }) {
  const btnRef = useRef(null);

  function createRipple(e) {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;

    const wave = document.createElement("span");
    wave.className = "ripple-wave";
    wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(wave);
    wave.addEventListener("animationend", () => wave.remove());
  }

  if (href) {
    return (
      <a ref={btnRef} href={href} target="_blank" rel="noopener noreferrer"
         onClick={createRipple} className={`ripple-btn ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button ref={btnRef} onClick={(e) => { createRipple(e); onClick?.(e); }}
            className={`ripple-btn ${className}`}>
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════
   ScholarshipCard
══════════════════════════════════════════ */
function ScholarshipCard({ scholarship, isSaved, onToggleSave, onQuickView, index }) {
  const { name, country, level, field, deadline, amount, funded } = scholarship;
  const daysLeft = getDaysLeft(deadline);
  const cardRef  = useRef(null);
  const [heartBurst, setHeartBurst] = useState(false);

  /* ── 3-D tilt on mouse move ── */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const rotX = ((e.clientY - cy) / (rect.height / 2)) * -7;
    const rotY = ((e.clientX - cx) / (rect.width  / 2)) *  7;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }, []);

  /* ── Heart burst animation on save ── */
  function handleSave(id) {
    setHeartBurst(true);
    onToggleSave(id);
    setTimeout(() => setHeartBurst(false), 400);
  }

  /* Level & funded badge colours */
  const levelColors = {
    Bachelor: "bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-300",
    Masters:  "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    PhD:      "bg-pink-100   text-pink-700   dark:bg-pink-900/40   dark:text-pink-300",
  };
  const fundedColor = funded === "Fully Funded"
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
    : "bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-400";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-3d opacity-0 animate-fade-in-up card-${Math.min(index + 1, 12)}
                  group relative bg-white dark:bg-gray-800 rounded-2xl
                  shadow-md hover:shadow-2xl
                  flex flex-col overflow-hidden
                  border border-gray-100 dark:border-gray-700`}
    >
      {/* Sweeping gradient top bar */}
      <div className="card-bar h-1.5" />

      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl" />

      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Name + save heart */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white leading-snug line-clamp-2
                         group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {name}
          </h2>
          <button
            onClick={() => handleSave(scholarship.id)}
            title={isSaved ? "Remove from saved" : "Save"}
            className={`text-xl flex-shrink-0 ${heartBurst ? "heart-burst" : ""}
                        transition-transform duration-150 hover:scale-125
                        ${isSaved ? "text-red-500" : "text-gray-300 dark:text-gray-600 hover:text-red-400"}`}
          >
            {isSaved ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Award amount */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400
                           group-hover:scale-105 transition-transform duration-200 inline-block">
            {amount}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${fundedColor}`}>
            {funded}
          </span>
        </div>

        {/* Country • Level • Field chips */}
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700
                           px-2 py-0.5 rounded-full flex items-center gap-1
                           hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors cursor-default">
            📍 {country}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelColors[level] || ""}`}>
            {level}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700
                           px-2 py-0.5 rounded-full flex items-center gap-1
                           hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors cursor-default">
            📖 {field}
          </span>
        </div>

        {/* Deadline */}
        <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
          <span>📅</span>
          Deadline:{" "}
          <span className="font-semibold text-gray-600 dark:text-gray-300">
            {new Date(deadline).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" })}
          </span>
        </div>

        {/* Status badge + countdown */}
        <div className="flex items-center gap-2">
          <StatusBadge daysLeft={daysLeft} />
          {daysLeft >= 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {daysLeft === 0 ? "⚠️ Today!" : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
            </span>
          )}
        </div>

        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex gap-2 mt-1">
          <RippleButton
            onClick={() => onQuickView(scholarship)}
            className="flex-1 py-2.5 rounded-xl border-2 border-indigo-200 dark:border-indigo-800
                       text-indigo-600 dark:text-indigo-400 text-sm font-semibold
                       hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                       hover:border-indigo-400 transition-all duration-200"
          >
            Quick View
          </RippleButton>
          <RippleButton
            href={scholarship.link}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white text-sm font-semibold text-center
                       hover:from-indigo-500 hover:to-purple-500
                       active:scale-95 transition-all duration-200 shadow-sm"
          >
            Apply →
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipCard;
