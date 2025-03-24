import React from 'react';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-10 border-t border-[var(--apple-border)]">
      <div className="apple-container">
        <div className="flex flex-col items-center mb-10">
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full flex items-center justify-center border border-[var(--apple-border)] bg-[var(--apple-bg-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-accent)] hover:border-[var(--apple-accent)] transition-colors mb-6"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-[var(--apple-accent)] to-[var(--apple-accent-hover)] text-white">
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4" 
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14v8l6-4z"/>
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight">hackathons.fyi</span>
          </div>
          
          <p className="text-[var(--apple-text-secondary)] text-sm max-w-md text-center">
            Discover award-winning hackathon projects and get inspired for your next build
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-[var(--apple-text-secondary)] text-sm">
              © {new Date().getFullYear()} hackathons.fyi. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors text-sm">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
