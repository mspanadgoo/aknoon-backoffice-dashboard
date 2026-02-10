import "../globals.css";
import { Sidebar } from "./_components/Sidebar";
import { Header } from "./_components/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen h-screen flex bg-bakery-light dark:bg-bakery-dark overflow-hidden transition-colors duration-300"
      dir="rtl"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col h-full">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
