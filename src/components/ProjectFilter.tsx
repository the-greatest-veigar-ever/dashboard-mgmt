import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ProjectFilterProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    filterStatus: string
    setFilterStatus: (status: string) => void
}

const statuses = ["All", "In Progress", "Completed", "Planned", "Maintenance"]

export function ProjectFilter({
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
}: ProjectFilterProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-6">
            <div className="w-full md:w-1/3">
                <Input
                    placeholder="SEARCH PROJECTS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="uppercase tracking-widest placeholder:tracking-widest"
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                    <Badge
                        key={status}
                        variant={filterStatus === status ? "default" : "outline"}
                        className="cursor-pointer uppercase tracking-wider px-4 py-2 hover:opacity-70"
                        onClick={() => setFilterStatus(status)}
                    >
                        {status}
                    </Badge>
                ))}
            </div>
        </div>
    )
}
