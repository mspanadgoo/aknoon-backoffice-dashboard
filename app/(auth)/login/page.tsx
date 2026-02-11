import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "../_components/LoginForm";
import { Footer } from "@/components/ui/footer";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-linear-to-br from-bakery-light to-bakery-accent/20"
      dir="rtl"
    >
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-none rounded-2xl overflow-hidden">
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center">
                <Image src="/favicon.svg" alt="اکنون" width={40} height={40} />
              </div>
              <CardTitle className="text-2xl font-bold text-primary">
                ورود به پنل مدیریت اکنون
              </CardTitle>
            </CardHeader>

            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
