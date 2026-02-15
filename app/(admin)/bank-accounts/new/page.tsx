"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BankAccountForm } from "@/app/(admin)/bank-accounts/_components/BankAccountForm";
import { useCreateBankAccount } from "@/api/bank-account/bank-account.hooks";
import { useRouter } from "next/navigation";
import { CreateBankAccountInput } from "@/api/bank-account/bank-account.types";

export default function BankAccountNewPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateBankAccount();
  const handleSubmit = (values: CreateBankAccountInput) =>
    mutate(values, {
      onSuccess: () => router.push("/bank-accounts"),
    });
  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">افزودن حساب بانکی</CardTitle>
        </CardHeader>
        <CardContent>
          <BankAccountForm
            mode="create"
            submitting={isPending}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
