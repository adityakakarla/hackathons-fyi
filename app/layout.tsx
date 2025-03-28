import type { Metadata } from "next";
import { ReactNode } from "react";
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "hackathons.fyi | Discover Award-Winning Hackathon Projects",
  description: "Explore innovative solutions from the world's top hackathons. Browse, filter, and search thousands of hackathon projects.",
  keywords: ["hackathons", "projects", "coding", "programming", "tech", "innovations"],
  authors: [
    { name: "Aarush", url: "https://www.linkedin.com/in/aarushj/" },
    { name: "Aditya", url: "https://www.linkedin.com/in/aditya-kakarla/" }
  ],
  creator: "hackathons.fyi",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
    other: {
      rel: 'mask-icon',
      url: '/favicon.svg',
      color: '#2383e2'
    }
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#191919' }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hackathons.fyi',
    title: 'hackathons.fyi | Discover Award-Winning Hackathon Projects',
    description: 'Explore innovative solutions from the world\'s top hackathons',
    siteName: 'hackathons.fyi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hackathons.fyi | Discover Award-Winning Hackathon Projects',
    description: 'Explore innovative solutions from the world\'s top hackathons',
  }
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-[var(--apple-bg)] text-[var(--apple-text)] flex flex-col">
        <main className="flex-grow relative">{children}</main>
      </body>
    </html>
  );
}
