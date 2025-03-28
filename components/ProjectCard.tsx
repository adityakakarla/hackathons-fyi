import React from 'react';
import { ExternalLink, Award } from 'lucide-react';

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
    const truncatedTagline = tagline.length > 100 
        ? tagline.substring(0, 100) + '...'
        : tagline;

    return (
        <div className="apple-card group relative hover:border-[var(--apple-accent-light)] transition-all">
            <a 
                href={projectUrl || '#'} 
                target={projectUrl ? "_blank" : undefined}
                rel={projectUrl ? "noopener noreferrer" : undefined}
                className="block p-5 h-full"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--apple-text-secondary)]">
                        <Award className="w-3 h-3 text-[var(--apple-accent)]" />
                        <span>{hackathon}</span>
                    </div>
                    {projectUrl && (
                        <ExternalLink className="w-3 h-3 text-[var(--apple-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                </div>
                
                <h3 className="text-base font-medium text-[var(--apple-text)] mb-2 group-hover:text-[var(--apple-accent)] transition-colors">
                    {projectName}
                </h3>
                
                <p className="text-[var(--apple-text-secondary)] text-sm leading-relaxed">
                    {truncatedTagline}
                </p>
                
                <div 
                    className="absolute inset-0 border-[1.5px] border-[var(--apple-accent)] rounded-[0.24rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />
            </a>
        </div>
    );
}
