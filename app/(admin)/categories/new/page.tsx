import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/ui/back-button";

export default function CategoryNewPage() {
  return (
    <div className="max-w-xl">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">افزودن دسته‌بندی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان</Label>
            <Input id="title" placeholder="عنوان دسته‌بندی" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">اسلاگ</Label>
            <Input id="slug" placeholder="slug" />
          </div>
          <Button>ثبت</Button>
        </CardContent>
      </Card>
    </div>
  );
}
