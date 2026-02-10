"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function BackButton({
  className,
  label = "بازگشت",
  fullWidth = true,
}: {
  className?: string;
  label?: string;
  fullWidth?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const mainRoutes = new Set([
    "/dashboard",
    "/admins",
    "/categories",
    "/products",
    "/orders",
  ]);
  const hide = mainRoutes.has(pathname);
  return (
    <>
      {!hide && (
        <div
          className={cn(
            fullWidth ? "w-full" : "",
            "sticky top-0 z-30 mb-2",
            className,
          )}
        >
          <Button
            onClick={() => router.back()}
            className="w-8 h-8 p-0 rounded-full bg-card text-foreground border border-border hover:bg-accent/10 shadow-sm"
            aria-label={label}
            title={label}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}
    </>
  );
}
