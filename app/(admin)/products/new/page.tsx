import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductNewPage() {
  return (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">افزودن محصول</CardTitle>
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
          <Button>ثبت</Button>
        </CardContent>
      </Card>
    </div>
  );
}
