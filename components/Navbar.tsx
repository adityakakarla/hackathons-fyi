import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Menu, Search, X } from 'lucide-react';

interface NavbarProps {
  resetState: () => void;
}

export default function Navbar({ resetState }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
      scrolled 
        ? 'bg-[var(--apple-bg)]/95 border-b border-[var(--apple-border)]'
        : 'bg-transparent'
    }`}>
      <div className="apple-container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" onClick={resetState} className="flex items-center gap-2 group">
            <div className="w-7 h-7 flex items-center justify-center rounded-sm bg-[var(--apple-accent)] text-white transition-all duration-300">
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4" 
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14v8l6-4z"/>
              </svg>
            </div>
            <span className="font-medium text-base text-[var(--apple-text)] tracking-tight">hackathons.fyi</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <Link 
              href="/" 
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors text-sm font-medium px-1 py-1"
            >
              Home
            </Link>
            <a 
              href="https://github.com/adityakakarla/hackathons-fyi" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors text-sm font-medium flex items-center gap-1 group px-1 py-1"
            >
              GitHub
              <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a 
              href="https://www.linkedin.com/in/aarushj/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors text-sm font-medium flex items-center gap-1 group px-1 py-1"
            >
              Aarush
              <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a 
              href="https://www.linkedin.com/in/aditya-kakarla/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors text-sm font-medium flex items-center gap-1 group px-1 py-1"
            >
              Aditya
              <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <button className="ml-1 p-1.5 rounded text-[var(--apple-text-secondary)] hover:bg-[var(--apple-bg-secondary)] transition-colors">
              <Search className="h-4 w-4" />
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-1.5 rounded text-[var(--apple-text-secondary)] hover:bg-[var(--apple-bg-secondary)] transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-40 bg-[var(--apple-bg)]/98 backdrop-blur-sm">
            <div className="flex flex-col gap-5 p-6 mt-4">
              <Link 
                href="/" 
                className="text-[var(--apple-text)] hover:text-[var(--apple-accent)] transition-colors font-medium text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="https://github.com/adityakakarla/hackathons-fyi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--apple-text)] hover:text-[var(--apple-accent)] transition-colors font-medium text-lg flex items-center justify-between"
              >
                GitHub
                <ChevronRight className="h-4 w-4 text-[var(--apple-text-secondary)]" />
              </a>
              <a 
                href="https://www.linkedin.com/in/aarushj/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--apple-text)] hover:text-[var(--apple-accent)] transition-colors font-medium text-lg flex items-center justify-between"
              >
                Aarush
                <ChevronRight className="h-4 w-4 text-[var(--apple-text-secondary)]" />
              </a>
              <a 
                href="https://www.linkedin.com/in/aditya-kakarla/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--apple-text)] hover:text-[var(--apple-accent)] transition-colors font-medium text-lg flex items-center justify-between"
              >
                Aditya
                <ChevronRight className="h-4 w-4 text-[var(--apple-text-secondary)]" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
