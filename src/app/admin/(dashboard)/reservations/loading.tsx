import { Skeleton } from "@/components/ui/skeleton";

// Pastikan ada 'export default' di sini
export default function ReservationsLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Skeleton */}
      <div className="flex justify-between items-center border-b border-zinc-200 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* List Skeleton */}
      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border border-zinc-100 rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between bg-white">
            
            <div className="flex-1 space-y-3">
              <div className="flex gap-3">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex gap-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}