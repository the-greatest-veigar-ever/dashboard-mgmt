import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "outline" | "success" | "warning" | "neutral"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80": variant === "default",
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
                    "text-foreground": variant === "outline",
                    // Colored Glassmorphism Variants
                    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 backdrop-blur-md": variant === "success",
                    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400 backdrop-blur-md": variant === "warning",
                    "border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-400 backdrop-blur-md": variant === "neutral",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
