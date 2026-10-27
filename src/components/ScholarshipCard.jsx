import { useRef, useState, useCallback } from "react";
import Icon from "./Icons";

function getDaysLeft(deadline) {
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(deadline); d.setHours(0,0,0,0);
  return Math.floor((d - today) / (1000 * 60 * 60 * 24));
}

function StatusBadge({ daysLeft }) {
  if (daysLeft < 0)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold
                       bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400
                       border border-red-200 dark:border-red-800">
        <Icon.X className="w-3 h-3" /> Expired
      </span>
    );
  if (daysLeft <= 7)
    return (
      <span className="pulse-ring inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold
                       bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400
                       border border-orange-200 dark:border-orange-800">
        <Icon.Lightning className="w-3 h-3" /> Closing soon
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold
                     bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400
                     border border-emerald-200 dark:border-emerald-800">
      <Icon.Check className="w-3 h-3" /> Open
    </span>
  );
}

/* ── Ripple button ── */
function RippleButton({ onClick, href, className, children }) {
  const ref = useRef(null);
  function createRipple(e) {
    const btn = ref.current; if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const wave = document.createElement("span");
    wave.className = "ripple-wave";
    wave.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    btn.appendChild(wave);
    wave.addEventListener("animationend", () => wave.remove());
  }
  if (href)
    return <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
               onClick={createRipple} className={`ripple-btn ${className}`}>{children}</a>;
  return <button ref={ref} onClick={(e) => { createRipple(e); onClick?.(e); }}
                 className={`ripple-btn ${className}`}>{children}</button>;
}

/* ══════════════════════════════════════════
   ScholarshipCard
══════════════════════════════════════════ */
function ScholarshipCard({ scholarship, isSaved, onToggleSave, onQuickView, index }) {
  const { name, country, level, field, deadline, amount, funded } = scholarship;
  const daysLeft = getDaysLeft(deadline);
  const cardRef  = useRef(null);
  const [heartBurst, setHeartBurst] = useState(false);

  /* 3-D tilt */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current; if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top  - rect.height/2) / (rect.height/2)) * -6;
    const rotY = ((e.clientX - rect.left - rect.width /2) / (rect.width /2)) *  6;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }, []);

  function handleSave(id) {
    setHeartBurst(true); onToggleSave(id);
    setTimeout(() => setHeartBurst(false), 400);
  }

  const levelColors = {
    Bachelor: "bg-sky-100   text-sky-700   dark:bg-sky-900/40   dark:text-sky-300",
    Masters:  "bg-cyan-100  text-cyan-700  dark:bg-cyan-900/40  dark:text-cyan-300",
    PhD:      "bg-blue-100  text-blue-700  dark:bg-blue-900/40  dark:text-blue-300",
  };
  const fundedColor = funded === "Fully Funded"
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
    : "bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-400";

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
         className={`card-3d opacity-0 animate-fade-in-up card-${Math.min(index+1,12)}
                     group relative bg-white dark:bg-slate-800 rounded-2xl
                     shadow-md hover:shadow-2xl hover:shadow-sky-100/50 dark:hover:shadow-sky-900/20
                     flex flex-col overflow-hidden border border-slate-100 dark:border-slate-700`}>

      {/* Sweeping top bar */}
      <div className="card-bar h-1.5" />

      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-br from-sky-50/30 to-transparent pointer-events-none rounded-2xl" />

      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Name + save */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white leading-snug line-clamp-2
                         group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors duration-200">
            {name}
          </h2>
          <button onClick={() => handleSave(scholarship.id)}
                  title={isSaved ? "Remove from saved" : "Save"}
                  className={`flex-shrink-0 transition-transform duration-150 hover:scale-125
                              ${heartBurst ? "heart-burst" : ""}
                              ${isSaved ? "text-rose-500" : "text-slate-300 dark:text-slate-600 hover:text-rose-400"}`}>
            <Icon.Heart filled={isSaved} className="w-5 h-5" />
          </button>
        </div>

        {/* Award amount */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-sky-700 dark:text-sky-400
                           group-hover:scale-105 transition-transform duration-200 inline-block">
            {amount}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${fundedColor}`}>
            {funded}
          </span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400
                           bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full
                           hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors cursor-default">
            <Icon.MapPin className="w-3 h-3" />{country}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelColors[level]||""}`}>
            {level}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400
                           bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full
                           hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors cursor-default">
            <Icon.BookOpen className="w-3 h-3" />{field}
          </span>
        </div>

        {/* Deadline */}
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <Icon.Calendar className="w-3.5 h-3.5" />
          Deadline:{" "}
          <span className="font-semibold text-slate-600 dark:text-slate-300">
            {new Date(deadline).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <StatusBadge daysLeft={daysLeft} />
          {daysLeft >= 0 && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {daysLeft === 0 ? "Today!" : `${daysLeft} day${daysLeft!==1?"s":""} left`}
            </span>
          )}
        </div>

        <div className="flex-1" />

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          <RippleButton onClick={() => onQuickView(scholarship)}
            className="flex-1 py-2.5 rounded-xl border-2 border-sky-200 dark:border-sky-800
                       text-sky-700 dark:text-sky-400 text-sm font-semibold
                       hover:bg-sky-50 dark:hover:bg-sky-900/30
                       hover:border-sky-400 transition-all duration-200">
            Quick View
          </RippleButton>
          <RippleButton href={scholarship.link}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 rounded-xl
                       bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-sm font-semibold
                       hover:from-sky-500 hover:to-cyan-500 active:scale-95
                       transition-all duration-200 shadow-sm">
            Apply <Icon.ArrowRight className="w-3.5 h-3.5" />
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipCard;
