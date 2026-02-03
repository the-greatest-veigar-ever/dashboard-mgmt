import { ProjectCard } from "@/components/ProjectCard"
import type { Project } from "@/hooks/useProjects"

interface ProjectGridProps {
    projects: Project[]
    onUpdate: (project: Project) => void
    onDelete: (id: number) => void
}

export function ProjectGrid({ projects, onUpdate, onDelete }: ProjectGridProps) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-muted-foreground uppercase tracking-widest">No projects found</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {projects.map((project) => (
                <div key={project.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${projects.indexOf(project) * 100}ms`, animationFillMode: 'both' }}>
                    <ProjectCard project={project} onUpdate={onUpdate} onDelete={onDelete} />
                </div>
            ))}
        </div>
    )
}
