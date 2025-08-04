import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonLoader() {
  return (
    <div className="table-modern">
      {/* Table Header Skeleton */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64 loading-shimmer" />
          <Skeleton className="h-4 w-32 loading-shimmer" />
        </div>
      </div>

      {/* Table Rows Skeleton */}
      <div className="p-6">
        <div className="space-y-4">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl glass-card">
              {/* Rank */}
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="w-8 h-8 rounded-full loading-shimmer" />
                
                {/* Coin Info */}
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full loading-shimmer" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24 loading-shimmer" />
                    <Skeleton className="h-3 w-16 loading-shimmer" />
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex-1 text-right">
                <Skeleton className="h-6 w-20 ml-auto loading-shimmer" />
              </div>

              {/* 24h Change */}
              <div className="flex-1 text-right">
                <Skeleton className="h-5 w-16 ml-auto loading-shimmer" />
              </div>

              {/* Market Cap */}
              <div className="flex-1 text-right">
                <Skeleton className="h-5 w-24 ml-auto loading-shimmer" />
              </div>

              {/* Volume */}
              <div className="flex-1 text-right">
                <Skeleton className="h-5 w-20 ml-auto loading-shimmer" />
              </div>

              {/* Actions */}
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full loading-shimmer" />
                  <Skeleton className="w-12 h-6 rounded-full loading-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Animation Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          </div>
          <p className="text-foreground/60 font-medium">Loading cryptocurrency data...</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}