import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function GlassCard({ className, glow, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 rounded-xl transition-all duration-300",
        glow && "glow-purple",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
