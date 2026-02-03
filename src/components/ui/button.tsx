import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-200 ease-snappy focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary border border-transparent hover:border-border":
                            variant === "primary",
                        "border border-input bg-transparent hover:bg-primary hover:text-primary-foreground":
                            variant === "secondary",
                        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
                        "h-10 px-8 py-2": size === "default",
                        "h-8 px-4 text-xs": size === "sm",
                        "h-12 px-10 text-base": size === "lg",
                        "h-9 w-9": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
