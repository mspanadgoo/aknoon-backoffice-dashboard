"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BankAccountForm } from "@/app/(admin)/bank-accounts/_components/BankAccountForm";
import { useParams, useRouter } from "next/navigation";
import {
  useBankAccount,
  useUpdateBankAccount,
} from "@/api/bank-account/bank-account.hooks";
import {
  CreateBankAccountInput,
  UpdateBankAccountInput,
} from "@/api/bank-account/bank-account.types";

export default function BankAccountEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const { data } = useBankAccount(id);
  const { mutate, isPending } = useUpdateBankAccount(id);
  const handleSubmit = (values: CreateBankAccountInput) =>
    mutate(values as UpdateBankAccountInput, {
      onSuccess: () => router.push("/bank-accounts"),
    });
  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-4">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">ویرایش حساب بانکی</CardTitle>
        </CardHeader>
        <CardContent>
          <BankAccountForm
            mode="edit"
            submitting={isPending}
            onSubmit={handleSubmit}
            initialValues={data ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
