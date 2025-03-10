import { TrophyIcon, ExternalLinkIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  resetState?: () => void;
}

export default function Navbar({ resetState }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`absolute top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      scrolled 
        ? 'bg-[var(--bg-secondary)]/95 backdrop-blur-sm border-[var(--border-primary)]' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center group"
              onClick={(e) => {
                if (resetState && window.location.pathname === '/') {
                  e.preventDefault();
                  resetState();
                }
              }}
            >
              <TrophyIcon className="h-6 w-6 text-[var(--accent)] group-hover:text-[var(--accent-dark)] transition-colors duration-300 transform group-hover:scale-110" />
              <span className="ml-2 text-lg font-bold text-[var(--text-primary)] terminal-text group-hover:text-[var(--accent)] transition-all duration-300">
                hackathons<span className="text-[var(--accent)]">.fyi</span>
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <a 
              href="https://devpost.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)] transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-sm terminal-text">Devpost</span>
              <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
