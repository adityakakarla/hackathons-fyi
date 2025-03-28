'use client'
import React, { useState, FormEvent, useEffect, useRef } from "react";
import { 
  Search, 
  ArrowRight, 
  Loader2, 
  Sparkles,
  Code2, 
  Globe,
  Brain, 
  Laptop
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

interface ProjectCardProps {
  projectName: string;
  date?: string;
  hackathon: string;
  tagline: string;
  projectUrl?: string;
  tags?: string[];
  description?: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [searchResults, setSearchResults] = useState<ProjectCardProps[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchPlaceholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Function to reset the page state
  const resetState = () => {
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
      "AI projects",
      "Web3 apps",
      "Mobile games",
      "AR/VR demos",
      "Climate tech",
      "Health apps",
      "Crypto tools",
      "Next.js sites"
    ];
    
    // Check if the device is likely mobile based on width
    const isMobile = window.innerWidth <= 768;
    
    let currentIndex = 0;
    let phase = "typing"; // "typing", "pause", "deleting", or "nextWord"
    let textPosition = 0;
    
    // Function to handle animation
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
    
    // Start the animation and set up window resize handler
    const handleResize = () => {
      // If window is resized, restart typing effect to get appropriate length placeholders
      if (searchPlaceholderTimeoutRef.current) {
        clearTimeout(searchPlaceholderTimeoutRef.current);
      }
      
      // Reset and restart
      currentIndex = 0;
      textPosition = 0;
      phase = "typing";
      searchPlaceholderTimeoutRef.current = setTimeout(typeEffect, 500);
    };
    
    // Set up initial timeout
    searchPlaceholderTimeoutRef.current = setTimeout(typeEffect, 500);
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (searchPlaceholderTimeoutRef.current) {
        clearTimeout(searchPlaceholderTimeoutRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to focus the search input
  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
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
          selectedTags: [], // Keep this empty array for API compatibility
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: Failed to perform search`);
      }

      setSearchResults(data.results || []);
      
      // Scroll to results with a slight delay for a smooth transition
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchError((error as Error).message || 'An error occurred during search');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--apple-bg)]">
      {/* Navbar */}
      <Navbar resetState={resetState} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="apple-container">
          <div className="max-w-2xl mx-auto">
            <h1 className="apple-heading mb-5 reveal-animation">
              Discover award-winning hackathon projects
            </h1>
            
            <p className="apple-caption text-[var(--apple-text-secondary)] mb-10 reveal-animation stagger-1">
              Explore innovative solutions from the world's top hackathons
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto reveal-animation stagger-2">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="apple-input py-2.5 px-4 pr-12" 
                    placeholder={searchPlaceholder ? `Search for ${searchPlaceholder}...` : "Search hackathon projects..."}
                  />
                  <button
                    type="submit"
                    className={`absolute top-1/2 -translate-y-1/2 right-2 flex items-center justify-center w-7 h-7 rounded
                      ${!searchQuery.trim() 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-[var(--apple-bg-secondary)] text-[var(--apple-text-secondary)]'}`}
                    disabled={!searchQuery.trim()}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                
                <div className="mt-2 text-center">
                  <p className="text-xs text-[var(--apple-text-secondary)] opacity-80">
                    {isSearchFocused ? 'Press Enter or click the arrow to search' : 'Try searching for technologies or hackathons'}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      {showResults && (
        <section id="results-section" className="py-12 border-t border-[var(--apple-border)] fade-in">
          <div className="apple-container">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  Results
                  {!isSearching && searchResults.length > 0 && (
                    <Sparkles className="w-3.5 h-3.5 text-[var(--apple-accent)]" />
                  )}
                </h2>
                {isSearching ? (
                  <div className="flex items-center text-[var(--apple-text-secondary)]">
                    <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                    <span className="text-sm">Searching...</span>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--apple-text-secondary)]">
                    {searchQuery && <span className="font-medium">"{searchQuery}"</span>} • {searchResults.length} results
                  </p>
                )}
              </div>
            </div>
            
            {searchError ? (
              <div className="max-w-md mx-auto text-center py-8 bg-[var(--apple-bg-secondary)] p-6 rounded-sm">
                <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-full bg-[rgba(235,87,87,0.1)] text-[var(--apple-error)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Search Error</h3>
                <p className="text-[var(--apple-text-secondary)] mb-6">{searchError}</p>
                <button 
                  className="apple-button"
                  onClick={focusSearch}
                >
                  Try Again
                </button>
              </div>
            ) : isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="apple-card">
                    <div className="p-5">
                      <div className="h-2.5 bg-[var(--apple-bg-secondary)] rounded mb-2 w-1/3"></div>
                      <div className="h-4 bg-[var(--apple-bg-secondary)] rounded mb-3 w-3/4"></div>
                      <div className="h-14 bg-[var(--apple-bg-secondary)] rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="max-w-md mx-auto text-center py-8 bg-[var(--apple-bg-secondary)] p-6 rounded-sm">
                <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-full bg-[rgba(35,131,226,0.08)] text-[var(--apple-text-secondary)]">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-[var(--apple-text-secondary)] mb-6">
                  We couldn't find any projects matching "{searchQuery}". Try a different search term.
                </p>
                <button 
                  className="apple-button"
                  onClick={focusSearch}
                >
                  Try Another Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((project, index) => (
                  <div key={index} className={`reveal-animation stagger-${(index % 5) + 1}`}>
                    <ProjectCard 
                      projectName={project.projectName}
                      hackathon={project.hackathon}
                      tagline={project.tagline}
                      projectUrl={project.projectUrl}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Category Section - only shown when not showing search results */}
      {!showResults && (
        <section className="py-16 border-t border-[var(--apple-border)]">
          <div className="apple-container">
            <h2 className="text-lg font-medium mb-8 reveal-animation">
              Explore by category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div 
                className="showcase-card reveal-animation stagger-1 hover:cursor-pointer" 
                onClick={() => {
                  setSearchQuery("AI and machine learning projects");
                  document.querySelector<HTMLFormElement>("form")?.requestSubmit();
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Brain className="w-5 h-5 text-[var(--apple-accent)]" />
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--apple-text-secondary)] opacity-60 group-hover:opacity-100" />
                </div>
                <h3 className="text-base font-medium mb-2">AI & Machine Learning</h3>
                <p className="text-[var(--apple-text-secondary)] text-sm">
                  Explore cutting-edge projects using artificial intelligence and machine learning models
                </p>
              </div>
              
              <div 
                className="showcase-card reveal-animation stagger-2 hover:cursor-pointer" 
                onClick={() => {
                  setSearchQuery("Web3 and blockchain projects");
                  document.querySelector<HTMLFormElement>("form")?.requestSubmit();
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Globe className="w-5 h-5 text-[var(--apple-accent)]" />
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--apple-text-secondary)] opacity-60 group-hover:opacity-100" />
                </div>
                <h3 className="text-base font-medium mb-2">Web3 & Blockchain</h3>
                <p className="text-[var(--apple-text-secondary)] text-sm">
                  Discover decentralized applications and blockchain innovations
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div 
                className="showcase-card reveal-animation stagger-3 hover:cursor-pointer" 
                onClick={() => {
                  setSearchQuery("Web development projects");
                  document.querySelector<HTMLFormElement>("form")?.requestSubmit();
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Code2 className="w-5 h-5 text-[var(--apple-accent)]" />
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--apple-text-secondary)] opacity-60 group-hover:opacity-100" />
                </div>
                <h3 className="text-base font-medium mb-2">Web Development</h3>
                <p className="text-[var(--apple-text-secondary)] text-sm">
                  Browse innovative web applications and front-end experiences
                </p>
              </div>
              
              <div 
                className="showcase-card reveal-animation stagger-4 hover:cursor-pointer" 
                onClick={() => {
                  setSearchQuery("Mobile app projects");
                  document.querySelector<HTMLFormElement>("form")?.requestSubmit();
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Laptop className="w-5 h-5 text-[var(--apple-accent)]" />
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--apple-text-secondary)] opacity-60 group-hover:opacity-100" />
                </div>
                <h3 className="text-base font-medium mb-2">Mobile Applications</h3>
                <p className="text-[var(--apple-text-secondary)] text-sm">
                  Find mobile apps created for iOS, Android, and cross-platform devices
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}