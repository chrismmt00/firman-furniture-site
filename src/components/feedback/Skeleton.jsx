import { cn } from "@/lib/cn";

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "bg-bone animate-pulse",
        className
      )}
    />
  );
}
