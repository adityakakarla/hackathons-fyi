'use client'
import React, { useState, FormEvent, useEffect } from "react";
import {
  Code2Icon,
  ZapIcon,
  ServerIcon,
  LightbulbIcon,
  SmartphoneIcon,
  LayersIcon,
  LoaderIcon,
  LeafIcon
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const tags: string[] = ["AI/ML", "Web3", "AR/VR", "Healthcare", "Climate Tech", "Full Stack", "Mobile"];

  // Example project data
  const exampleProject = {
    projectName: "DevCollab",
    date: "March 2025",
    hackathon: "HackTheTerminal",
    tagline: "Real-time collaborative coding platform with AI pair programming",
    projectUrl: "https://github.com/example/devcollab",
    tags: ["AI/ML", "Full Stack"]
  };

  // Particle animation elements
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);

  useEffect(() => {
    // Create initial particles
    const newParticles = Array(15).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.3 + 0.1
    }));
    setParticles(newParticles);

    // Animation loop for particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100,
        x: p.x + (Math.random() - 0.5) * 0.2
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setShowResults(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSearching(false);
    
    // Here you would implement the actual search functionality
    console.log("Searching for:", searchQuery, "with tags:", selectedTags);
  };

  return (
    <div className="min-h-screen text-[var(--text-primary)] font-sans antialiased relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[var(--bg-primary)] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)]/50 to-[var(--bg-primary)] z-0"></div>
      
      {/* Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map(particle => (
          <div 
            key={particle.id} 
            className="absolute rounded-full bg-[var(--accent)]/5" 
            style={{
              left: `${particle.x}%`, 
              top: `${particle.y}%`, 
              width: `${particle.size}px`, 
              height: `${particle.size}px`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-background z-0 opacity-20"></div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content container */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 floating">
            <h1 className="terminal-text text-4xl font-bold tracking-tight sm:text-5xl mb-2">
              <span className="text-[var(--accent)]">&gt;</span> 
              Ship Your Next Hack
              <span className="text-[var(--accent)]"> /&gt;</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base tracking-wide text-[var(--text-secondary)] font-light terminal-text">
              <span className="text-[var(--accent)]">$</span> Find winning project ideas. Build something awesome.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section - Centered focus */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-4">
        {/* Dynamic Changing Title */}
        
        <div 
          className={`backdrop-blur-sm bg-[var(--bg-secondary)]/90 border transition-all duration-500 rounded-xl p-6 sm:p-8 ${
            isSearchFocused 
              ? 'border-[var(--accent)] shadow-[var(--accent)]/5' 
              : 'border-[var(--border-primary)] hover:border-[var(--border-hover)]'
          }`}
        >
          <form onSubmit={handleSearch}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className={`transition-colors duration-200 ${
                  isSearchFocused ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
                }`}>
                  <span className="text-[var(--accent)]">$</span>&gt;
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="block w-full pl-12 pr-4 py-5 border-b border-[var(--border-primary)] rounded-lg leading-5 bg-transparent terminal-text placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] text-lg transition-all duration-300"
                placeholder="$ search --type=hack --filter=awesome"
              />
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <p className="w-full text-center text-[var(--text-secondary)]/60 text-sm mb-2 terminal-text">
                <span className="text-[var(--accent)]">&gt;</span> Filter by tech stack
              </p>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  onMouseEnter={() => setHoveredTag(tag)}
                  onMouseLeave={() => setHoveredTag(null)}
                  className={`rounded-full px-5 py-2 border terminal-text transition-all duration-300 ${
                    selectedTags.includes(tag) 
                      ? 'border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent)]' 
                      : hoveredTag === tag 
                        ? 'border-[var(--border-hover)] text-[var(--text-primary)] bg-[var(--bg-secondary)]' 
                        : 'border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
                  } text-sm font-medium cursor-pointer flex items-center gap-1`}
                >
                  {tag === "AI/ML" && <Code2Icon className="inline h-3 w-3" />}
                  {tag === "Web3" && <ZapIcon className="inline h-3 w-3" />}
                  {tag === "AR/VR" && <LightbulbIcon className="inline h-3 w-3" />}
                  {tag === "Healthcare" && <ServerIcon className="inline h-3 w-3" />}
                  {tag === "Full Stack" && <LayersIcon className="inline h-3 w-3" />}
                  {tag === "Mobile" && <SmartphoneIcon className="inline h-3 w-3" />}
                  {tag === "Climate Tech" && <LeafIcon className="inline h-3 w-3" />}
                  <span className="text-[var(--accent)]">[</span>
                  {tag}
                  <span className="text-[var(--accent)]">]</span>
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button 
                type="submit"
                className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium terminal-text rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] flex items-center gap-2"
              >
                <span className="text-white/90">$</span> ./find_projects
              </button>
            </div>
          </form>
        </div>
        
        {/* Search Results */}
        {showResults && (
          <div className="mt-12 space-y-6">
            <div className="text-left mb-4">
              <h2 className="terminal-text text-xl text-[var(--text-secondary)] flex items-center gap-3">
                <span className="text-[var(--accent)]">$</span> ls ./matching_projects
                {isSearching && (
                  <LoaderIcon className="h-5 w-5 text-[var(--accent)] animate-spin" />
                )}
              </h2>
              {isSearching ? (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-[var(--text-secondary)]/60 terminal-text">
                    <span className="text-[var(--accent)]">$</span> semantic-search --query=&quot;{searchQuery}&quot; {selectedTags.length > 0 && `--tags=[${selectedTags.join(', ')}]`}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]/60 terminal-text animate-pulse">
                    <span className="text-[var(--accent)]">&gt;</span> Searching through hackathon database...
                  </p>
                </div>
              ) : (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-[var(--text-secondary)]/60 terminal-text">
                    <span className="text-[var(--accent)]">&gt;</span> Found 1 matching project
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]/60 terminal-text">
                    <span className="text-[var(--accent)]">&gt;</span> Displaying results by relevance
                  </p>
                </div>
              )}
            </div>
            {!isSearching && <ProjectCard {...exampleProject} />}
          </div>
        )}
        
        {/* Tech decoration at bottom */}
        <div className="flex flex-col items-center gap-2 mt-8">
          <div className="text-[var(--text-secondary)]/50 text-xs terminal-text">
            <code>$ find . -name &quot;awesome_ideas&quot; | sort -r | head -n 1</code>
          </div>
          <p className="text-[var(--text-secondary)]/60 text-xs terminal-text">
            <span className="text-[var(--accent)]">$</span> semantic-search --mode=blazing-fast ⚡
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-20">
          <Footer />
        </div>
      </div>
      
    </div>
  );
}