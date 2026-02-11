export function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div
        className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-3 items-center"
        dir="rtl"
      >
        <div className="flex items-center gap-2 justify-start">
          <span className="font-semibold">اَک‌/‌نونْ</span>
        </div>
        <div className="text-sm text-muted-foreground text-center">
          © 2026 اکنون — تمامی حقوق محفوظ است
        </div>
        <div />
      </div>
    </footer>
  );
}
