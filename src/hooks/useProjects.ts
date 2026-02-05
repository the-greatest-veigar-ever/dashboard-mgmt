import { useState, useEffect } from 'react'


export interface Project {
    id: number
    title: string
    description: string
    status: string
    techStack: string[]
    links: {
        demo: string
        repo: string
    }
    date: string // Should be treated as 'Created Date'
    createdAt?: string
    updatedAt?: string
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadProjects = async () => {
            // 1. Try to load from localStorage first (prio user edits)
            const saved = localStorage.getItem('projects')
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    const sanitized = parsed.map((p: any) => ({
                        ...p,
                        createdAt: p.createdAt || p.date || new Date().toISOString().split('T')[0],
                        updatedAt: p.updatedAt || new Date().toISOString().split('T')[0]
                    }))
                    setProjects(sanitized)
                    setIsLoading(false)
                    return
                } catch (e) {
                    console.error("Failed to parse projects from localStorage", e)
                }
            }

            // 2. If no localStorage, fetch from public/projects.json
            try {
                // Determine base path for GitHub Pages or local dev
                const basePath = import.meta.env.BASE_URL
                const response = await fetch(`${basePath}projects.json`)
                if (!response.ok) throw new Error('Failed to fetch projects')

                const data = await response.json()
                const sanitized = data.map((p: any) => ({
                    ...p,
                    createdAt: p.createdAt || p.date || new Date().toISOString().split('T')[0],
                    updatedAt: p.updatedAt || new Date().toISOString().split('T')[0]
                }))
                setProjects(sanitized)
                // Sync initial fetch to localStorage so subsequent edits work on this data
                localStorage.setItem('projects', JSON.stringify(sanitized))
            } catch (error) {
                console.error("Error loading projects:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadProjects()
    }, [])

    // Persist to localStorage whenever projects change (after initial load)
    useEffect(() => {
        if (!isLoading && projects.length > 0) {
            localStorage.setItem('projects', JSON.stringify(projects))
        }
    }, [projects, isLoading])

    const updateProject = (updatedProject: Project) => {
        const timestampedProject = {
            ...updatedProject,
            updatedAt: new Date().toISOString().split('T')[0] // Auto-update updatedAt
        }
        setProjects(prev => prev.map(p => p.id === timestampedProject.id ? timestampedProject : p))
    }

    const deleteProject = (id: number) => {
        setProjects(prev => prev.filter(p => p.id !== id))
    }

    const addProject = () => {
        const today = new Date().toISOString().split('T')[0]
        const newProject: Project = {
            id: Date.now(),
            title: "New Project",
            description: "",
            status: "Planned",
            techStack: [],
            links: { demo: "", repo: "" },
            date: today,
            createdAt: today,
            updatedAt: today
        }
        setProjects(prev => [newProject, ...prev])
        return newProject
    }

    return { projects, updateProject, deleteProject, addProject }
}
