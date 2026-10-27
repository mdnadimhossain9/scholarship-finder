import ScholarshipCard from "./ScholarshipCard";
import Icon from "./Icons";

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden
                    border border-slate-100 dark:border-slate-700">
      <div className="h-1.5 skeleton" />
      <div className="p-5 flex flex-col gap-3">
        <div className="skeleton h-4 rounded-full w-3/4" />
        <div className="skeleton h-4 rounded-full w-1/2" />
        <div className="flex gap-2">
          <div className="skeleton h-5 rounded-full w-16" />
          <div className="skeleton h-5 rounded-full w-16" />
        </div>
        <div className="skeleton h-3 rounded-full w-2/3" />
        <div className="skeleton h-3 rounded-full w-1/3" />
        <div className="flex gap-2 mt-2">
          <div className="skeleton h-10 rounded-xl flex-1" />
          <div className="skeleton h-10 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}

function ScholarshipList({ scholarships, savedIds, onToggleSave, onQuickView, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (scholarships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center mb-4 animate-float">
          <Icon.Search className="w-8 h-8 text-sky-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
          No scholarships found
        </h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">
          Try adjusting your search terms or removing some filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {scholarships.map((s, i) => (
        <ScholarshipCard key={s.id} scholarship={s}
          isSaved={savedIds.includes(s.id)}
          onToggleSave={onToggleSave}
          onQuickView={onQuickView}
          index={i} />
      ))}
    </div>
  );
}

export default ScholarshipList;
