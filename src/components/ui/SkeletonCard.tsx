export default function SkeletonCard() {
  return (
    <div className="animate-pulse group flex flex-col bg-card rounded-xl overflow-hidden border border-white/5">
      <div className="relative aspect-square sm:aspect-[2/3] bg-white/5 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
        <div className="h-3 bg-white/10 rounded w-1/2"></div>
        <div className="pt-2 flex items-center gap-2">
          <div className="h-8 w-8 bg-white/10 rounded-full"></div>
          <div className="h-8 flex-1 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
