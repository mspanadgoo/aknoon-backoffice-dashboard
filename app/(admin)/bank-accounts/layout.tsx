import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bank Accounts",
};

export default function BankAccountsSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
