export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-sm text-muted-foreground">در حال بارگذاری ادمین‌ها...</span>
      </div>
      <div className="rounded-xl border bg-card p-4 space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
