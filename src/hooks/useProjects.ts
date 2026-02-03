import { useState, useEffect } from 'react'
import defaultProjects from '@/data/projects.json'

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
    // Initialize from localStorage or fallback to default data
    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem('projects')
        let initialData = defaultProjects
        if (saved) {
            try {
                initialData = JSON.parse(saved)
            } catch (e) {
                console.error("Failed to parse projects from localStorage", e)
            }
        }
        // Ensure all projects have at least a date, treat existing 'date' als createdAt
        return initialData.map((p: any) => ({
            ...p,
            createdAt: p.createdAt || p.date || new Date().toISOString().split('T')[0],
            updatedAt: p.updatedAt || new Date().toISOString().split('T')[0]
        }))
    })

    // Persist to localStorage whenever projects change
    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects))
    }, [projects])

    const updateProject = (updatedProject: Project) => {
        const timestampedProject = {
            ...updatedProject,
            updatedAt: new Date().toISOString().split('T')[0] // Auto-update updatedAt
        }
        setProjects(prev => prev.map(p => p.id === timestampedProject.id ? timestampedProject : p))
    }

    return { projects, updateProject }
}
