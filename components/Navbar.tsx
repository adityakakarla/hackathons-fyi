import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface NavbarProps {
  resetState: () => void;
}

export default function Navbar({ resetState }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'backdrop-blur-xl bg-[var(--apple-bg)]/90 border-b border-[var(--apple-border)] shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="apple-container">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <Link href="/" onClick={resetState} className="flex items-center gap-2 group">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--apple-accent)] to-[var(--apple-accent-hover)] text-white transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-[var(--apple-accent-light)]">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5" 
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14v8l6-4z"/>
              </svg>
            </div>
            <span className="font-semibold text-lg md:text-xl tracking-tight">hackathons.fyi</span>
          </Link>
          
          <div className="flex items-center gap-5 md:gap-8">
            <Link 
              href="/" 
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors font-medium text-sm hidden sm:flex"
            >
              Home
            </Link>
            <a 
              href="https://github.com/adityakakarla/hackathons-fyi" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors font-medium text-sm hidden sm:flex items-center gap-1 group"
            >
              GitHub
              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a 
              href="https://www.linkedin.com/in/aarushj/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors font-medium text-sm hidden sm:flex items-center gap-1 group"
            >
              Aarush
              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a 
              href="https://www.linkedin.com/in/aditya-kakarla/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors font-medium text-sm hidden sm:flex items-center gap-1 group"
            >
              Aditya
              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
