import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      
      {/* Header Skeleton */}
      <div className="flex justify-between items-end border-b border-zinc-200 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" /> {/* Judul */}
          <Skeleton className="h-4 w-48" /> {/* Subjudul */}
        </div>
        <div className="space-y-2 flex flex-col items-end">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri (Request Feed) */}
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-5 w-40 mb-4" /> {/* Judul Section */}
          
          {/* Card Dummy x3 */}
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>

        {/* Kolom Kanan (Stats) */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>

      </div>
    </div>
  );
}