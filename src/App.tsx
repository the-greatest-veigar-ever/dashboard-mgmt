import { useState, useMemo } from 'react'
import { Hero } from "@/components/Hero"
import { ProjectFilter } from "@/components/ProjectFilter"
import { ProjectGrid } from "@/components/ProjectGrid"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useProjects } from "@/hooks/useProjects"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const { projects, updateProject, deleteProject } = useProjects()

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchStatus = filterStatus === "All" || project.status === filterStatus

      return matchSearch && matchStatus
    })
  }, [searchTerm, filterStatus, projects])

  const totalProjects = projects.length
  const completedProjects = projects.filter(p => p.status === "Completed").length

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background p-4 md:p-8 lg:p-12 font-sans overflow-x-hidden transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto relative">
        <div className="absolute top-0 right-0 z-50">
          <ThemeToggle />
        </div>
        <Hero
          totalProjects={totalProjects}
          completedProjects={completedProjects}
        />

        <main className="mt-12">
          <ProjectFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <div className="mt-8">
            <ProjectGrid projects={filteredProjects} onUpdate={updateProject} onDelete={deleteProject} />
          </div>
        </main>

        <footer className="py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
          <span>© {new Date().getFullYear()} Nguyen Minh Quan</span>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/koderqq/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Facebook</a>
            <a href="https://www.linkedin.com/in/quanng47/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
