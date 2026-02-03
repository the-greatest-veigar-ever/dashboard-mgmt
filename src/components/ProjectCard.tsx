import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { Github, ExternalLink, Pencil, CalendarIcon, Trash2 } from "lucide-react"
import type { Project } from "@/hooks/useProjects"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
    project: Project
    onUpdate: (project: Project) => void
    onDelete: (id: number) => void
}

export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [editedProject, setEditedProject] = useState<Project>(() => project)

    // Only sync editedProject when dialog opens
    const handleOpen = () => {
        setEditedProject(project)
        setIsOpen(true)
    }

    const handleSave = () => {
        onUpdate(editedProject)
        setIsOpen(false)
    }


    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Completed": return "success"
            case "In Progress": return "warning"
            case "Maintenance": return "neutral"
            default: return "outline"
        }
    }

    return (
        <>
            <Card className="h-full flex flex-col group hover:border-foreground/50 transition-colors duration-300 relative cursor-pointer" onClick={handleOpen}>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleOpen() }} className="h-7 w-7 rounded-full">
                        <Pencil className="h-3 w-3" />
                    </Button>
                </div>

                <CardHeader className="pb-3">
                    <Badge variant={getStatusVariant(project.status)} className="w-fit mb-3 text-[10px]">
                        {project.status}
                    </Badge>

                    <CardTitle className="group-hover:translate-x-1 transition-transform duration-300 ease-snappy text-lg">
                        {project.title}
                    </CardTitle>

                    <CardDescription className="mt-2 line-clamp-2 text-xs">
                        {project.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow pt-0">
                    <span className="text-[11px] text-muted-foreground/60 tracking-wider">
                        {format(new Date(project.createdAt || project.date), "dd - MM - yyyy")}
                    </span>
                </CardContent>

                <CardFooter className="gap-2 pt-4">
                    {project.links.repo && (
                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <Github className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </a>
                    )}
                    {project.links.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </a>
                    )}
                </CardFooter>
            </Card>

            {/* Edit Dialog - Minimal Luxury Style */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
                    <DialogHeader className="px-6 pt-6 pb-4">
                        <DialogTitle className="text-2xl tracking-tight">Edit Project</DialogTitle>
                    </DialogHeader>

                    <div className="px-6 pb-6 space-y-6">
                        {/* Title - Large, prominent input */}
                        <div>
                            <input
                                value={editedProject.title}
                                onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
                                className="w-full bg-transparent text-xl font-heading font-semibold uppercase tracking-tight border-0 border-b border-border focus:border-foreground focus:outline-none py-2 transition-colors"
                                placeholder="Project Title"
                            />
                        </div>

                        {/* Status - Inline pills */}
                        <div className="flex gap-2">
                            {["In Progress", "Completed", "Planned", "Maintenance"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setEditedProject({ ...editedProject, status })}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors",
                                        editedProject.status === status
                                            ? "bg-foreground text-background"
                                            : "bg-muted text-muted-foreground hover:bg-foreground/10"
                                    )}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* Description - Clean textarea */}
                        <div>
                            <textarea
                                className="w-full bg-transparent text-sm border-0 border-b border-border focus:border-foreground focus:outline-none py-2 resize-none min-h-[80px] transition-colors"
                                value={editedProject.description}
                                onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                                placeholder="Project description..."
                            />
                        </div>

                        {/* Dates - Side by side, minimal */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <span className="text-[10px] uppercase text-muted-foreground tracking-widest block mb-2">Created</span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="flex items-center gap-2 text-sm font-mono hover:text-muted-foreground transition-colors">
                                            <CalendarIcon className="h-3.5 w-3.5" />
                                            {editedProject.createdAt ? format(new Date(editedProject.createdAt), "MMM d, yyyy") : "Set date"}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={editedProject.createdAt ? new Date(editedProject.createdAt) : undefined}
                                            onSelect={(date) => date && setEditedProject({ ...editedProject, createdAt: format(date, "yyyy-MM-dd") })}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase text-muted-foreground tracking-widest block mb-2">Updated</span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="flex items-center gap-2 text-sm font-mono hover:text-muted-foreground transition-colors">
                                            <CalendarIcon className="h-3.5 w-3.5" />
                                            {editedProject.updatedAt ? format(new Date(editedProject.updatedAt), "MMM d, yyyy") : "Set date"}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={editedProject.updatedAt ? new Date(editedProject.updatedAt) : undefined}
                                            onSelect={(date) => date && setEditedProject({ ...editedProject, updatedAt: format(date, "yyyy-MM-dd") })}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Tech Stack - Tag-like input */}
                        <div>
                            <span className="text-[10px] uppercase text-muted-foreground tracking-widest block mb-2">Tech Stack</span>
                            <input
                                value={editedProject.techStack.join(", ")}
                                onChange={(e) => setEditedProject({ ...editedProject, techStack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                                className="w-full bg-transparent text-sm border-0 border-b border-border focus:border-foreground focus:outline-none py-1 font-mono transition-colors"
                                placeholder="React, TypeScript, Vite..."
                            />
                        </div>

                        {/* Links - Subtle inputs */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <span className="text-[10px] uppercase text-muted-foreground tracking-widest block mb-2">Repository</span>
                                <input
                                    value={editedProject.links.repo}
                                    onChange={(e) => setEditedProject({ ...editedProject, links: { ...editedProject.links, repo: e.target.value } })}
                                    className="w-full bg-transparent text-xs border-0 border-b border-border focus:border-foreground focus:outline-none py-1 font-mono transition-colors truncate"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div>
                                <span className="text-[10px] uppercase text-muted-foreground tracking-widest block mb-2">Demo</span>
                                <input
                                    value={editedProject.links.demo}
                                    onChange={(e) => setEditedProject({ ...editedProject, links: { ...editedProject.links, demo: e.target.value } })}
                                    className="w-full bg-transparent text-xs border-0 border-b border-border focus:border-foreground focus:outline-none py-1 font-mono transition-colors truncate"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-6 py-4 border-t border-border bg-muted/30 flex justify-between">
                        <Button variant="ghost" onClick={() => { onDelete(project.id); setIsOpen(false) }} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-muted-foreground">
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
