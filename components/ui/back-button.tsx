 "use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton({
  className,
  label = "بازگشت",
}: {
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  return (
    <div className={cn("w-full mb-3", className)}>
      <Button
        onClick={() => router.back()}
        className="gap-2 rounded-full px-4 py-2 bg-secondary text-secondary-foreground hover:bg-accent/10"
      >
        <ChevronRight className="size-5" />
        <span>{label}</span>
      </Button>
    </div>
  );
}
