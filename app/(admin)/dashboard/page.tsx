export default function DashboardPage() {
  return (
    <div className="p-6 rounded-xl transition-colors duration-300">
      <h2 className="text-2xl font-bold text-primary">
        داشبورد
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-semibold text-primary">
            سفارشات امروز
          </h3>
          <p className="text-3xl font-bold mt-2 text-foreground">
            ۱۲
          </p>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-semibold text-primary">
            مشتریان جدید
          </h3>
          <p className="text-3xl font-bold mt-2 text-foreground">
            ۵
          </p>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-semibold text-primary">
            درآمد امروز
          </h3>
          <p className="text-3xl font-bold mt-2 text-foreground">
            ۳.۲M تومان
          </p>
        </div>
      </div>

      <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm mt-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-primary mb-4">
          محصولات محبوب
        </h3>

        <ul className="space-y-3 text-foreground">
          <li className="flex justify-between">
            <span>کرواسان شکلاتی</span>
            <span className="font-bold">۴۵ فروش</span>
          </li>
          <li className="flex justify-between">
            <span>کوکی گردویی</span>
            <span className="font-bold">۳۲ فروش</span>
          </li>
          <li className="flex justify-between">
            <span>کوکی شکلات چیپسی</span>
            <span className="font-bold">۲۸ فروش</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
