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
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-gradient-to-b from-[var(--apple-accent-light)] via-[var(--apple-accent-light)] to-transparent opacity-20 blur-3xl rounded-full -z-10"></div>
        
        <div className="apple-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="apple-heading mb-6 reveal-animation">
              Discover award-winning <br className="hidden sm:inline" />
              hackathon projects
            </h1>
            
            <p className="apple-caption text-[var(--apple-text-secondary)] mb-12 reveal-animation stagger-1">
              Explore innovative solutions from the world's top hackathons
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto reveal-animation stagger-2">
              <form onSubmit={handleSearch} className="relative">
                <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-[1.02]' : ''}`}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="apple-input py-5 px-6 pr-16 shadow-lg sm:text-base text-sm" 
                    placeholder={searchPlaceholder || "Search hackathon projects..."}
                  />
                  <button
                    type="submit"
                    className={`absolute inset-y-0 right-2 my-2 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--apple-accent)] text-white transition-all duration-300 z-20 ${!searchQuery.trim() ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`}
                    disabled={!searchQuery.trim()}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="absolute bottom-[-28px] w-full text-center">
                  <p className="text-xs md:text-sm text-[var(--apple-text-secondary)]/80 italic font-light">
                    {isSearchFocused ? 'Press Enter to search' : 'Try searching for technologies or hackathons'}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      {showResults && (
        <section id="results-section" className="py-16 relative fade-in">
          <div className="apple-container">
            <div className="border-b border-[var(--apple-border)] pb-4 mb-10">
              <div className="flex items-center justify-between">
                <h2 className="apple-subheading font-semibold flex items-center gap-2">
                  Results
                  {!isSearching && searchResults.length > 0 && (
                    <Sparkles className="w-5 h-5 text-[var(--apple-accent)]" />
                  )}
                </h2>
                {isSearching ? (
                  <div className="flex items-center text-[var(--apple-text-secondary)]">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
              <div className="max-w-md mx-auto text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50 text-[var(--apple-error)]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="apple-card">
                    <div className="p-6">
                      <div className="h-3 bg-[var(--apple-bg-secondary)] rounded mb-2 w-1/3"></div>
                      <div className="h-5 bg-[var(--apple-bg-secondary)] rounded mb-3 w-3/4"></div>
                      <div className="h-16 bg-[var(--apple-bg-secondary)] rounded mb-4"></div>
                      <div className="h-4 bg-[var(--apple-bg-secondary)] rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="max-w-md mx-auto text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[var(--apple-bg-secondary)] text-[var(--apple-text-secondary)]">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-[var(--apple-text-secondary)] mb-6">
                  We couldn't find any projects matching "{searchQuery}". Try a different search term or browse our categories.
                </p>
                <button 
                  className="apple-button"
                  onClick={focusSearch}
                >
                  Try Another Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      
      {/* Recent Highlights (only shown when not showing search results) */}
      {!showResults && (
        <section className="py-20 relative">
          <div className="apple-container">
            <h2 className="apple-subheading font-semibold mb-8 reveal-animation">
              Discover by category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="showcase-card reveal-animation stagger-1" onClick={() => {
                setSearchQuery("AI and machine learning projects");
                document.querySelector<HTMLFormElement>("form")?.requestSubmit();
              }}>
                <div className="flex items-center justify-between mb-3">
                  <Brain className="w-8 h-8 text-[var(--apple-accent)]" />
                  <ArrowRight className="w-5 h-5 text-[var(--apple-text-secondary)] opacity-60 group-hover:opacity-100" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">AI & Machine Learning</h3>
                <p className="text-[var(--apple-text-secondary)]">
                  Explore cutting-edge projects using artificial intelligence, machine learning models, and natural language processing
                </p>
              </div>
              
              <div className="showcase-card reveal-animation stagger-2" onClick={() => {
                setSearchQuery("Web3 and blockchain projects");
                document.querySelector<HTMLFormElement>("form")?.requestSubmit();
              }}>
                <div className="flex items-center justify-between mb-3">
                  <Globe className="w-8 h-8 text-[var(--apple-accent)]" />
                  <ArrowRight className="w-5 h-5 text-[var(--apple-text-secondary)] opacity-60 group-hover:opacity-100" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Web3 & Blockchain</h3>
                <p className="text-[var(--apple-text-secondary)]">
                  Discover decentralized applications, blockchain innovations, and cryptocurrency solutions
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="apple-card p-6 flex flex-col reveal-animation stagger-3 hover:cursor-pointer" onClick={() => {
                setSearchQuery("mobile app development");
                document.querySelector<HTMLFormElement>("form")?.requestSubmit();
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <Laptop className="w-5 h-5 text-[var(--apple-accent)]" />
                  <h3 className="font-medium">Mobile Apps</h3>
                </div>
                <p className="text-sm text-[var(--apple-text-secondary)] mb-4">
                  iOS, Android, and cross-platform mobile applications
                </p>
                <ArrowRight className="w-4 h-4 text-[var(--apple-accent)] mt-auto self-end" />
              </div>
              
              <div className="apple-card p-6 flex flex-col reveal-animation stagger-4 hover:cursor-pointer" onClick={() => {
                setSearchQuery("climate change technology");
                document.querySelector<HTMLFormElement>("form")?.requestSubmit();
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-[var(--apple-accent)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.75 11.25a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5ZM7.24 14.79a.75.75 0 0 0 1.06-1.06 3.989 3.989 0 0 1-1.18-2.85c0-2.21 1.79-4 4-4s4 1.79 4 4a3.989 3.989 0 0 1-1.18 2.85.75.75 0 1 0 1.06 1.06A5.489 5.489 0 0 0 16.5 10.88c0-3.03-2.47-5.5-5.5-5.5s-5.5 2.47-5.5 5.5c0 1.52.62 2.89 1.62 3.89ZM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
                  </svg>
                  <h3 className="font-medium">Climate Tech</h3>
                </div>
                <p className="text-sm text-[var(--apple-text-secondary)] mb-4">
                  Projects addressing environmental challenges and sustainability
                </p>
                <ArrowRight className="w-4 h-4 text-[var(--apple-accent)] mt-auto self-end" />
              </div>
              
              <div className="apple-card p-6 flex flex-col reveal-animation stagger-5 hover:cursor-pointer" onClick={() => {
                setSearchQuery("next.js react applications");
                document.querySelector<HTMLFormElement>("form")?.requestSubmit();
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-5 h-5 text-[var(--apple-accent)]" />
                  <h3 className="font-medium">Frontend & UI</h3>
                </div>
                <p className="text-sm text-[var(--apple-text-secondary)] mb-4">
                  Beautiful web interfaces built with modern frameworks
                </p>
                <ArrowRight className="w-4 h-4 text-[var(--apple-accent)] mt-auto self-end" />
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