export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-[var(--border-primary)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <p className="text-xs text-[var(--text-secondary)]/70 text-center terminal-text">
          <span className="text-[var(--accent)]">&gt;</span> $ hackathons.fyi <span className="text-[var(--accent)]">•</span> {new Date().getFullYear()} 
        </p>
      </div>
    </footer>
  );
}
