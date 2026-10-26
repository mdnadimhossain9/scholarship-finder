import ScholarshipCard from "./ScholarshipCard";

// ScholarshipList — renders a responsive grid of cards or an empty message
function ScholarshipList({ scholarships, savedIds, onToggleSave }) {
  // Show a friendly message when nothing matches
  if (scholarships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <span className="text-5xl mb-4">🔎</span>
        <p className="text-lg font-semibold">No scholarships found</p>
        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    // Responsive grid: 1 col → 2 col → 3 col
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {scholarships.map((s) => (
        <ScholarshipCard
          key={s.id}
          scholarship={s}
          isSaved={savedIds.includes(s.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}

export default ScholarshipList;
