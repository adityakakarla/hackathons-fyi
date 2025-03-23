'use client'
import React, { useState, FormEvent, useEffect, useRef } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchPlaceholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to reset the page state
  const resetState = () => {
    setHoveredTag(null);
    setSelectedTags([]);
    setSearchQuery("");
    setIsSearchFocused(false);
    setShowResults(false);
    setIsSearching(false);
    // Don't reset the searchPlaceholder as it's controlled by the typing effect
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Typing effect for search placeholder
  useEffect(() => {
    const placeholders = [
      "Best projects at HackMIT ",
      "Winning web3 projects at TreeHacks ",
      "Award-winning healthcare projects ",
      "Winning projects at Technica ",
      "Best hack at HackSC ",
      "Winning projects at HackRice ",
      "Inspiring defense projects ",
      "Best hack at Hack the Valley ",
      "Innovative education projects "
    ];
    
    let currentIndex = 0;
    let phase = "typing"; // "typing", "pause", "deleting", or "nextWord"
    let textPosition = 0;
    
    const typeEffect = () => {
      const currentText = placeholders[currentIndex];
      let delay = 70; // Default typing delay
      
      if (phase === "typing") {
        // Show text up to the current position
        setSearchPlaceholder(currentText.substring(0, textPosition));
        textPosition++;
        
        // If we've typed the full word (including the last character)
        if (textPosition > currentText.length) {
          // Make sure the full text is displayed
          setSearchPlaceholder(currentText);
          phase = "pause";
          delay = 1500; // Pause before deleting
        }
      } 
      else if (phase === "pause") {
        // After pause, start deleting
        // Make sure the full text is still displayed during the transition
        setSearchPlaceholder(currentText);
        phase = "deleting";
        // Reset text position to the full length for deletion
        textPosition = currentText.length;
      } 
      else if (phase === "deleting") {
        // Delete one character at a time
        textPosition--;
        setSearchPlaceholder(currentText.substring(0, textPosition));
        delay = 30; // Faster for deleting
        
        // When all characters are deleted
        if (textPosition <= 0) {
          phase = "nextWord";
        }
      } 
      else if (phase === "nextWord") {
        // Move to next word
        currentIndex = (currentIndex + 1) % placeholders.length;
        textPosition = 0;
        phase = "typing";
      }
      
      // Continue the animation
      searchPlaceholderTimeoutRef.current = setTimeout(typeEffect, delay);
    };
    
    // Start the animation
    searchPlaceholderTimeoutRef.current = setTimeout(typeEffect, 500);
    
    // Cleanup
    return () => {
      if (searchPlaceholderTimeoutRef.current) {
        clearTimeout(searchPlaceholderTimeoutRef.current);
      }
    };
  }, []);

  const tags: string[] = ["AI/ML", "Web3", "AR/VR", "Healthcare", "Climate Tech", "Full Stack", "Mobile"];

  const demoProject = {
    projectName: "DevCollab",
    date: "March 2025",
    hackathon: "HackTheTerminal 2023",
    tagline: "A real-time collaborative coding platform with integrated video chat and AI code suggestions.",
    projectUrl: "https://github.com/example/devcollab",
    tags: ["AI/ML", "Full Stack"]
  };

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
    setSearchError(null);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery,
          selectedTags,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: Failed to perform search`);
      }

      console.log('Search results:', data);
      setSearchResults(data.results || []);
      
      // If we got a successful response but no results, check the debug endpoint
      if (data.results && data.results.length === 0) {
        console.log('No results found, checking debug endpoint...');
        try {
          const debugResponse = await fetch('/api/debug');
          const debugData = await debugResponse.json();
          console.log('Debug data:', debugData);
        } catch (debugError) {
          console.error('Debug endpoint error:', debugError);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError((error as Error).message || 'An error occurred during search');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen text-[var(--text-primary)] font-sans antialiased relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[var(--bg-primary)] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)]/50 to-[var(--bg-primary)] z-0"></div>
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-background z-0 opacity-20"></div>
      
      {/* Navbar */}
      <Navbar resetState={resetState} />
      
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
                placeholder={searchPlaceholder}
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
                  {searchError ? (
                    <p className="text-sm text-[var(--accent)] terminal-text">
                      <span className="text-[var(--accent)]">&gt;</span> Error: {searchError}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-[var(--text-secondary)]/60 terminal-text">
                        <span className="text-[var(--accent)]">&gt;</span> Found {searchResults.length} matching project{searchResults.length !== 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]/60 terminal-text">
                        <span className="text-[var(--accent)]">&gt;</span> Displaying results by relevance
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
            {!isSearching && !searchError && (
              <div className="space-y-6">
                {searchResults.length > 0 ? (
                  searchResults.map((project, index) => (
                    <ProjectCard 
                      key={project.id || index}
                      projectName={project.projectName}
                      date={project.date}
                      hackathon={project.hackathon}
                      tagline={project.tagline}
                      projectUrl={project.projectUrl}
                      tags={project.tags}
                    />
                  ))
                ) : (
                  <div className="backdrop-blur-sm bg-[var(--bg-secondary)]/90 border border-[var(--border-primary)] rounded-lg p-6 text-center">
                    <p className="text-[var(--text-secondary)] terminal-text">No projects found matching your criteria.</p>
                    <p className="text-[var(--text-secondary)]/60 text-sm mt-2 terminal-text">Try a different search term or remove some filters.</p>
                  </div>
                )}
              </div>
            )}
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