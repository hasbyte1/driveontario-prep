import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sublabel?: string;
  variant?: "default" | "primary" | "success";
  className?: string;
}

export const StatCard = ({ 
  icon, 
  label, 
  value, 
  sublabel, 
  variant = "default",
  className 
}: StatCardProps) => {
  const variantStyles = {
    default: "border-border",
    primary: "border-primary/20 bg-gradient-to-br from-primary/5 to-transparent",
    success: "border-success/20 bg-gradient-to-br from-success/5 to-transparent",
  };
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md",
      variantStyles[variant],
      className
    )}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className={cn(
            "flex-shrink-0 rounded-lg p-1.5 sm:p-2",
            variant === "primary" && "bg-primary/10 text-primary",
            variant === "success" && "bg-success/10 text-success",
            variant === "default" && "bg-muted text-foreground"
          )}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
            <p className="text-xl sm:text-2xl font-bold mt-0.5 sm:mt-1">{value}</p>
            {sublabel && (
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{sublabel}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
