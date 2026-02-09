import "../globals.css";
import { Sidebar } from "./_components/Sidebar";
import { Header } from "./_components/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-amber-50" dir="rtl">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
