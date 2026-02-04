import { useState, useMemo } from 'react'
import { Hero } from "@/components/Hero"
import { ProjectFilter } from "@/components/ProjectFilter"
import { ProjectGrid } from "@/components/ProjectGrid"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useProjects } from "@/hooks/useProjects"
import { useProjectSearch } from "@/hooks/useProjectSearch"
import { CommandMenu } from "@/components/CommandMenu"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const { projects, updateProject, deleteProject, addProject } = useProjects()

  // 1. Fuzzy Search First
  const searchResults = useProjectSearch(projects, searchTerm)

  // 2. Then Filter by Status
  const filteredProjects = useMemo(() => {
    if (filterStatus === "All") return searchResults
    return searchResults.filter(p => p.status === filterStatus)
  }, [searchResults, filterStatus])

  const totalProjects = projects.length
  const completedProjects = projects.filter(p => p.status === "Completed").length

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background p-4 md:p-8 lg:p-12 font-sans overflow-x-hidden transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto relative">
        <CommandMenu />
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

          <div className="mt-8 flex justify-between items-center mb-6">
            <div></div>
            <Button onClick={addProject} className="gap-2">
              <Plus className="h-4 w-4" /> New Project
            </Button>
          </div>

          <div>
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
