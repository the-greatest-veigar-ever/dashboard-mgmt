import { useEffect, useState } from "react"
import { Command } from "cmdk"
import { Calculator, Settings, User, Search, Moon, Sun, Laptop } from "lucide-react"
import { useProjects } from "../hooks/useProjects"

export function CommandMenu() {
    const [open, setOpen] = useState(false)
    const { projects } = useProjects()

    // Toggle with Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    // Theme Tattling Helper
    const setTheme = (theme: 'light' | 'dark' | 'system') => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            root.classList.add(systemTheme)
        } else {
            root.classList.add(theme)
        }
        setOpen(false)
    }

    const navigateTo = (url: string) => {
        if (url) {
            window.open(url, '_blank')
            setOpen(false)
        }
    }

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-popover text-popover-foreground border border-border shadow-2xl rounded-xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200"
            overlayClassName="fixed inset-0 bg-background/80 backdrop-blur-sm z-[99] animate-in fade-in duration-200"
        >
            <div className="flex items-center border-b border-border px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Command.Input
                    placeholder="Type a command or search..."
                    className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 font-sans"
                />
            </div>

            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 font-sans scroll-py-2 custom-scrollbar">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>

                <Command.Group heading="Projects" className="text-xs font-medium text-muted-foreground px-2 py-1.5 uppercase tracking-wider mb-2">
                    {projects.map(project => (
                        <Command.Item
                            key={project.id}
                            onSelect={() => navigateTo(project.links.demo || project.links.repo)}
                            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                        >
                            <Calculator className="mr-2 h-4 w-4" />
                            <span>{project.title}</span>
                            <span className="ml-auto text-xs text-muted-foreground opacity-70">{project.status}</span>
                        </Command.Item>
                    ))}
                </Command.Group>

                <Command.Separator className="-mx-2 h-px bg-border my-2" />

                <Command.Group heading="Theme" className="text-xs font-medium text-muted-foreground px-2 py-1.5 uppercase tracking-wider mb-2">
                    <Command.Item onSelect={() => setTheme('light')} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground transition-colors">
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light Mode</span>
                    </Command.Item>
                    <Command.Item onSelect={() => setTheme('dark')} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground transition-colors">
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark Mode</span>
                    </Command.Item>
                    <Command.Item onSelect={() => setTheme('system')} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground transition-colors">
                        <Laptop className="mr-2 h-4 w-4" />
                        <span>System</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="General" className="text-xs font-medium text-muted-foreground px-2 py-1.5 uppercase tracking-wider mb-2">
                    <Command.Item className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground transition-colors">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">CMD+P</span>
                    </Command.Item>
                    <Command.Item className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground transition-colors">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">CMD+S</span>
                    </Command.Item>
                </Command.Group>
            </Command.List>
        </Command.Dialog>
    )
}
