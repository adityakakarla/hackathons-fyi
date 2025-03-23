'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'


// just in the case the user tries to go somewhere random

export default function NotFound() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/')
  }, [router])
  
  return (
    <div className="min-h-screen text-[var(--text-primary)] font-sans antialiased relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-primary)] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)]/50 to-[var(--bg-primary)] z-0"></div>
            <div className="absolute inset-0 grid-background z-0 opacity-20"></div>
      
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="terminal-text text-2xl font-bold mb-2">
            <span className="text-[var(--accent)]">&gt;</span> 
            Page not found
          </h1>
          <p className="text-[var(--text-secondary)] terminal-text">
            <span className="text-[var(--accent)]">$</span> redirecting to home...
            <span className="typing-cursor">_</span>
          </p>
        </div>
      </div>
    </div>
  )
} 