import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/ui/back-button";

export default function ProductEditPage() {
  return (
    <div className="max-w-xl">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">ویرایش محصول</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان</Label>
            <Input id="title" placeholder="عنوان محصول" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">کد</Label>
            <Input id="sku" placeholder="SKU" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">قیمت</Label>
            <Input id="price" type="number" placeholder="قیمت" />
          </div>
          <Button>ذخیره</Button>
        </CardContent>
      </Card>
    </div>
  );
}
