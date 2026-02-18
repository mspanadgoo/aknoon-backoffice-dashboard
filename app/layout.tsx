import "./globals.css";
import { AppProviders } from "./providers";
import { Vazirmatn } from "next/font/google";
import type { Metadata } from "next";

const APP_ICON_VERSION = "v1";

export const metadata: Metadata = {
  title: {
    default: "Aknoon Backoffice Dashboard",
    template: "%s | Aknoon Backoffice Dashboard",
  },
  description:
    "Aknoon backoffice dashboard for managing orders, products, categories, and bank accounts.",
  icons: {
    icon: [
      {
        url: `/favicon-16x16.png?${APP_ICON_VERSION}`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: `/favicon-32x32.png?${APP_ICON_VERSION}`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `/favicon-48x48.png?${APP_ICON_VERSION}`,
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: `/favicon-192x192.png?${APP_ICON_VERSION}`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: `/favicon-512x512.png?${APP_ICON_VERSION}`,
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: `/favicon.ico?${APP_ICON_VERSION}`,
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: `/apple-touch-icon.png?${APP_ICON_VERSION}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: `/favicon.ico?${APP_ICON_VERSION}`,
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Aknoon Backoffice Dashboard",
    description:
      "Aknoon backoffice dashboard for managing orders, products, categories, and bank accounts.",
    images: ["/og-image.svg"],
    type: "website",
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aknoon Backoffice Dashboard",
    description:
      "Aknoon backoffice dashboard for managing orders, products, categories, and bank accounts.",
    images: ["/og-image.svg"],
  },
  other: {
    "msapplication-TileColor": "#0f172a",
    "msapplication-TileImage": `/mstile-150x150.png?${APP_ICON_VERSION}`,
    "theme-color": "#0f172a",
  },
};

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
