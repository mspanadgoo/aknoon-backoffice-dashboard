export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-sm text-muted-foreground">در حال بارگذاری محصولات...</span>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <div className="h-6 w-36 bg-muted rounded mb-3 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-4 space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
