export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800">داشبورد</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-amber-700">
            سفارشات امروز
          </h3>
          <p className="text-3xl font-bold mt-2">۱۲</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-amber-700">مشتریان جدید</h3>
          <p className="text-3xl font-bold mt-2">۵</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-amber-700">درآمد امروز</h3>
          <p className="text-3xl font-bold mt-2">۳.۲M تومان</p>
        </div>
      </div>

      {/* Popular products */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-amber-700 mb-4">
          محصولات محبوب
        </h3>
        <ul className="space-y-3">
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
