export default function Loading() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-sm text-muted-foreground">
          در حال بارگذاری...
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="h-5 w-40 bg-muted rounded mb-4 animate-pulse" />
          <div className="h-64 bg-muted rounded animate-pulse" />
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="h-5 w-40 bg-muted rounded mb-4 animate-pulse" />
          <div className="h-64 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
