import React from 'react';
export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-[var(--apple-border)] mt-auto">
      <div className="apple-container">
        
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
