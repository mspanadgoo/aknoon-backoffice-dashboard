import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
