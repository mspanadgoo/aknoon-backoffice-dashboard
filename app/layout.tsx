import "./globals.css";
import { Vazirmatn } from "next/font/google";
import { AppProviders } from "./providers";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-vazirmatn",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans bg-gray-50">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
