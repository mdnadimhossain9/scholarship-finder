import { useEffect, useRef, useState } from "react";
import Icon from "./Icons";

function QuickViewModal({ scholarship, isSaved, onToggleSave, onClose }) {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    rafRef.current = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const { name, country, level, field, deadline, amount, funded, link } = scholarship;

  const today = new Date(); today.setHours(0,0,0,0);
  const dl    = new Date(deadline); dl.setHours(0,0,0,0);
  const daysLeft = Math.floor((dl - today) / 86400000);

  const levelColors = {
    Bachelor: "bg-sky-100   text-sky-700   dark:bg-sky-900/40   dark:text-sky-300",
    Masters:  "bg-cyan-100  text-cyan-700  dark:bg-cyan-900/40  dark:text-cyan-300",
    PhD:      "bg-blue-100  text-blue-700  dark:bg-blue-900/40  dark:text-blue-300",
  };

  return (
    <div onClick={onClose}
         className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop
                     transition-all duration-300
                     ${visible ? "bg-black/60" : "bg-black/0 pointer-events-none"}`}>
      <div onClick={(e) => e.stopPropagation()}
           className={`relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl
                       overflow-hidden transition-all duration-300
                       ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-8"}`}>

        {/* Top bar */}
        <div className="h-2 card-bar" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800
                        flex items-start justify-between gap-3">
          <div className="animate-slide-left">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">{name}</h2>
            <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-1">
              <Icon.MapPin className="w-3.5 h-3.5" />{country}
            </p>
          </div>
          <button onClick={onClose}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white
                             flex-shrink-0 mt-0.5 hover:rotate-90 hover:scale-110 transition-transform duration-200">
            <Icon.X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount highlight */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-50 to-cyan-50
                        dark:from-sky-900/20 dark:to-cyan-900/20
                        border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <span className="text-3xl font-extrabold text-sky-700 dark:text-sky-400">{amount}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold
            ${funded === "Fully Funded"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
            {funded}
          </span>
        </div>

        {/* Detail grid */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          {[
            { icon: <Icon.GraduationCap className="w-3.5 h-3.5" />, label: "Study Level", delay: "0.05s",
              value: <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${levelColors[level]}`}>{level}</span> },
            { icon: <Icon.BookOpen      className="w-3.5 h-3.5" />, label: "Field",        delay: "0.10s", value: field },
            { icon: <Icon.Calendar      className="w-3.5 h-3.5" />, label: "Deadline",     delay: "0.15s",
              value: new Date(deadline).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}) },
            { icon: <Icon.Clock         className="w-3.5 h-3.5" />, label: "Days Left",    delay: "0.20s",
              value: daysLeft < 0
                ? <span className="text-red-500 font-bold">Expired</span>
                : daysLeft <= 7
                ? <span className="text-orange-500 font-bold">{daysLeft} days ⚡</span>
                : <span className="text-emerald-600 font-bold">{daysLeft} days left</span> },
          ].map(({ icon, label, value, delay }) => (
            <div key={label} className="opacity-0 animate-fade-in-up flex flex-col gap-0.5"
                 style={{ animationDelay: delay }}>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                {icon}{label}
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{value}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={() => onToggleSave(scholarship.id)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl
                              font-semibold text-sm border-2 hover:scale-105 active:scale-95
                              transition-all duration-200
                              ${isSaved
                                ? "border-rose-400 text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20"
                                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-sky-400 hover:text-sky-600"}`}>
            <Icon.Heart filled={isSaved} className="w-4 h-4" />
            {isSaved ? "Saved" : "Save"}
          </button>
          <a href={link} target="_blank" rel="noopener noreferrer"
             className="flex-[2] inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl
                        font-semibold text-sm bg-gradient-to-r from-sky-600 to-cyan-600 text-white
                        hover:from-sky-500 hover:to-cyan-500 hover:scale-105
                        active:scale-95 transition-all duration-200 shadow-md">
            Apply Now <Icon.ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
