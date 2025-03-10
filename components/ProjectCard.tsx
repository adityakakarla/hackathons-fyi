import React from 'react';
import { ExternalLinkIcon, CalendarIcon, TrophyIcon } from 'lucide-react';

interface ProjectCardProps {
    projectName: string;
    date: string;
    hackathon: string;
    tagline: string;
    projectUrl?: string;
    tags?: string[];
}

export default function ProjectCard({ 
    projectName, 
    date, 
    hackathon, 
    tagline, 
    projectUrl,
    tags = []
}: ProjectCardProps) {
    return (
        <div className="backdrop-blur-sm bg-[var(--bg-secondary)]/90 border border-[var(--border-primary)] rounded-lg transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--accent)]/5 overflow-hidden group">
            <div className="p-6">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 terminal-text group-hover:text-[var(--accent)] transition-colors duration-300">
                    <span className="text-[var(--accent)]">&gt;</span> {projectName}
                </h3>
                <div className="flex items-center gap-3 text-[var(--text-secondary)] text-sm mb-3">
                    <span className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {date}
                    </span>
                    <span className="flex items-center">
                        <TrophyIcon className="w-4 h-4 mr-1 text-[var(--accent)]" />
                        <span className="bg-[var(--accent)]/5 text-[var(--accent)] px-2 py-1 rounded-md terminal-text">
                            {hackathon}
                        </span>
                    </span>
                </div>
                <p className="text-[var(--text-secondary)] mb-4 terminal-text">{tagline}</p>
                
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <span 
                                key={index}
                                className="text-xs px-2 py-1 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] terminal-text"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                
                {projectUrl && (
                    <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] terminal-text transition-all duration-300 transform hover:translate-y-[-2px]"
                    >
                        View Project
                        <ExternalLinkIcon className="ml-2 h-4 w-4" />
                    </a>
                )}
            </div>
        </div>
    );
}
