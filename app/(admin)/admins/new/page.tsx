import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/ui/back-button";

export default function AdminNewPage() {
  return (
    <div className="max-w-xl">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">افزودن ادمین</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">نام</Label>
            <Input id="name" placeholder="نام" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">نام کاربری</Label>
            <Input id="username" placeholder="نام کاربری" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور</Label>
            <Input id="password" type="password" placeholder="رمز عبور" />
          </div>
          <Button>ثبت</Button>
        </CardContent>
      </Card>
    </div>
  );
}
