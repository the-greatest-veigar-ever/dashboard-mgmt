import { useMemo } from 'react'
import Fuse from 'fuse.js'

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
    date: string
}

const fuseOptions = {
    keys: [
        { name: 'title', weight: 0.7 },
        { name: 'description', weight: 0.3 },
        { name: 'techStack', weight: 0.5 },
        { name: 'status', weight: 0.2 }
    ],
    threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything
    includeScore: true
}

export function useProjectSearch(projects: Project[], searchTerm: string) {
    const fuse = useMemo(() => new Fuse(projects, fuseOptions), [projects])

    const results = useMemo(() => {
        if (!searchTerm) return projects

        return fuse.search(searchTerm).map(result => result.item)
    }, [fuse, searchTerm, projects])

    return results
}
