import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  variant?: "primary" | "success" | "warning";
  className?: string;
}

export const ProgressBar = ({ 
  current, 
  total, 
  showLabel = true, 
  variant = "primary",
  className 
}: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);
  
  const variantStyles = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
  };
  
  return (
    <div className={cn("w-full space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
