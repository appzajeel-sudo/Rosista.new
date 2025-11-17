import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent rounded-md relative overflow-hidden", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/30 to-transparent animate-shimmer" />
    </div>
  );
}

export { Skeleton };
