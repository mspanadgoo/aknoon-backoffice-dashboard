export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card p-4">
        <div className="h-6 w-36 bg-muted rounded mb-3 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <div className="h-6 w-48 bg-muted rounded mb-3 animate-pulse" />
        <div className="h-48 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
