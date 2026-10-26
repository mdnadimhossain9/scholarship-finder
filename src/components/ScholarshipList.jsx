import ScholarshipCard from "./ScholarshipCard";

// Skeleton card shown while loading
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
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

// ScholarshipList — responsive grid with loading state and empty state
function ScholarshipList({ scholarships, savedIds, onToggleSave, onQuickView, loading }) {
  // Show skeletons while loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (scholarships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4 animate-float">🔎</div>
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
          No scholarships found
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
          Try adjusting your search terms or removing some filters to see more results.
        </p>
      </div>
    );
  }

  // Scholarship grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {scholarships.map((s, i) => (
        <ScholarshipCard
          key={s.id}
          scholarship={s}
          isSaved={savedIds.includes(s.id)}
          onToggleSave={onToggleSave}
          onQuickView={onQuickView}
          index={i}
        />
      ))}
    </div>
  );
}

export default ScholarshipList;
