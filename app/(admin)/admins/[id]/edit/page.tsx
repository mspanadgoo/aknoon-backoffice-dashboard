import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminEditPage() {
  return (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">ویرایش ادمین</CardTitle>
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
          <Button>ذخیره</Button>
        </CardContent>
      </Card>
    </div>
  );
}
