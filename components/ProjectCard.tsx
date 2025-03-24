import React from 'react';
import { ArrowUpRight, Trophy } from 'lucide-react';

interface ProjectCardProps {
    projectName: string;
    date?: string;
    hackathon: string;
    tagline: string;
    projectUrl?: string;
    tags?: string[];
    description?: string;
}

export default function ProjectCard({ 
    projectName, 
    hackathon, 
    tagline, 
    projectUrl,
}: ProjectCardProps) {
    // Truncate long taglines
    const truncatedTagline = tagline.length > 120 
        ? tagline.substring(0, 120) + '...'
        : tagline;

    return (
        <div className="apple-card">
            <a 
                href={projectUrl || '#'} 
                target={projectUrl ? "_blank" : undefined}
                rel={projectUrl ? "noopener noreferrer" : undefined}
                className="block p-6 group h-full"
            >
                <div className="flex items-center gap-2 mb-3 text-sm text-[var(--apple-text-secondary)]">
                    <Trophy className="w-3.5 h-3.5 text-[var(--apple-accent)]" />
                    <span className="font-medium">{hackathon}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-[var(--apple-text)] group-hover:text-[var(--apple-accent)] transition-colors duration-300 mb-3">
                    {projectName}
                </h3>
                
                <p className="text-[var(--apple-text-secondary)] mb-5 text-sm leading-relaxed">
                    {truncatedTagline}
                </p>
                
                <div className="mt-auto">
                    {projectUrl && (
                        <div className="inline-flex items-center text-[var(--apple-accent)] group-hover:opacity-80 transition-all duration-300 text-sm font-medium">
                            Learn more
                            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-[-2px]" />
                        </div>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[var(--apple-accent-light)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
        </div>
    );
}
