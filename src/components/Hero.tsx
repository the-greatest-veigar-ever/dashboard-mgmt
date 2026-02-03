import { motion } from "framer-motion"

interface HeroProps {
    totalProjects: number
    completedProjects: number
}

export function Hero({ totalProjects, completedProjects }: HeroProps) {
    return (
        <motion.div
            className="py-20 flex flex-col items-start gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="w-full">
                <h1 className="text-[clamp(4rem,12vw,9rem)] leading-[0.9] font-heading font-normal tracking-tight uppercase">
                    Das<span className="italic">h</span>board
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-20 w-full pt-8 border-t border-border mt-8">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Projects</span>
                    <span className="text-6xl font-mono leading-none">{totalProjects.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Completed</span>
                    <span className="text-6xl font-mono leading-none">{completedProjects.toString().padStart(2, '0')}</span>
                </div>
            </div>
        </motion.div>
    )
}
