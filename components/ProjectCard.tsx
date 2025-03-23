import React from 'react';
import { ExternalLinkIcon, TrophyIcon, Code2Icon, ZapIcon, LightbulbIcon, ServerIcon, LayersIcon, SmartphoneIcon, LeafIcon } from 'lucide-react';

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
    tags = [],
}: ProjectCardProps) {
    // Truncate long taglines
    const truncatedTagline = tagline.length > 120 
        ? tagline.substring(0, 120) + '...'
        : tagline;

    return (
        <div className="backdrop-blur-sm bg-[var(--bg-secondary)]/90 border border-[var(--border-primary)] rounded-lg transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--accent)]/5 overflow-hidden group">
            <div className="p-6">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 terminal-text group-hover:text-[var(--accent)] transition-colors duration-300">
                    <span className="text-[var(--accent)]">&gt;</span> {projectName}
                </h3>
                <div className="flex items-center text-[var(--text-secondary)] text-sm mb-3">
                    <span className="flex items-center">
                        <TrophyIcon className="w-4 h-4 mr-1 text-[var(--accent)]" />
                        <span className="bg-[var(--accent)]/5 text-[var(--accent)] px-2 py-1 rounded-md terminal-text">
                            {hackathon}
                        </span>
                    </span>
                </div>
                <p className="text-[var(--text-secondary)] mb-4 terminal-text">{truncatedTagline}</p>
                
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 5).map((tag, index) => {
                            // Normalize tag for display
                            const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
                            
                            return (
                                <span 
                                    key={index}
                                    className="text-xs px-2 py-1 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] terminal-text flex items-center gap-1"
                                >
                                    {tag.toLowerCase().includes('ai') && <Code2Icon className="inline h-3 w-3" />}
                                    {tag.toLowerCase().includes('web3') && <ZapIcon className="inline h-3 w-3" />}
                                    {tag.toLowerCase().includes('vr') && <LightbulbIcon className="inline h-3 w-3" />}
                                    {tag.toLowerCase().includes('health') && <ServerIcon className="inline h-3 w-3" />}
                                    {tag.toLowerCase().includes('stack') && <LayersIcon className="inline h-3 w-3" />}
                                    {tag.toLowerCase().includes('mobile') && <SmartphoneIcon className="inline h-3 w-3" />}
                                    {tag.toLowerCase().includes('climate') && <LeafIcon className="inline h-3 w-3" />}
                                    {displayTag}
                                </span>
                            );
                        })}
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
