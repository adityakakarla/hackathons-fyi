import React from 'react';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-[var(--apple-border)] mt-auto">
      <div className="apple-container">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-[var(--apple-accent)] text-white">
              <svg 
                viewBox="0 0 24 24" 
                className="w-3.5 h-3.5" 
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14v8l6-4z"/>
              </svg>
            </div>
            <span className="font-medium text-sm text-[var(--apple-text)]">hackathons.fyi</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors text-sm font-medium"
            >
              Home
            </Link>
            
            <a 
              href="https://github.com/adityakakarla/hackathons-fyi" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors text-sm font-medium flex items-center gap-1.5"
            >
              GitHub
              <Github className="w-3.5 h-3.5" />
            </a>
            
            <button 
              onClick={scrollToTop}
              className="p-1.5 rounded hover:bg-[var(--apple-bg-secondary)] transition-colors text-[var(--apple-text-secondary)]"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
        
        <div className="pt-6 border-t border-[var(--apple-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--apple-text-secondary)] text-xs">
              © {currentYear} hackathons.fyi — All rights reserved.
            </p>
            
            <p className="text-[var(--apple-text-secondary)] text-xs">
              Built with 💙 by{' '}
              <a 
                href="https://www.linkedin.com/in/aarushj/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--apple-accent)] hover:text-[var(--apple-accent-hover)] transition-colors"
              >
                Aarush
              </a>
              {' & '}
              <a 
                href="https://www.linkedin.com/in/aditya-kakarla/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--apple-accent)] hover:text-[var(--apple-accent-hover)] transition-colors"
              >
                Aditya
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
