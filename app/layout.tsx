import type { Metadata } from "next";
import { ReactNode } from "react";
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains'
})

export const metadata: Metadata = {
  title: "hackathons.fyi",
  description: "Discover winning hackathon projects",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
    other: {
      rel: 'mask-icon',
      url: '/favicon.svg',
      color: '#FFB319'
    }
  },
  themeColor: '#FFB319'
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.className} min-h-screen bg-black text-white flex flex-col scan-lines grid-background`}>
        <main className="flex-grow relative">{children}</main>
      </body>
    </html>
  );
}
