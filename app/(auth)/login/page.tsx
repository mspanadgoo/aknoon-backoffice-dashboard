import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-orange-100 p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-none rounded-2xl overflow-hidden">
          <div
            className="h-40 w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200')",
            }}
          />

          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-amber-800">
              ورود به پنل مدیریت
            </CardTitle>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
