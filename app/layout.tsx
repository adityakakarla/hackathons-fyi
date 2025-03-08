import type { Metadata } from "next";
import { ReactNode } from "react";
import './globals.css'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your app description",
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white font-palantir flex flex-col">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
