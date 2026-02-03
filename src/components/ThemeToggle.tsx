import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        // Check initial preference
        const isDark = document.documentElement.classList.contains("dark") ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)

        if (isDark) {
            setTheme("dark")
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 hover:bg-muted"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
