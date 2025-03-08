'use client'
import React, { useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
} from "lucide-react";
import Title from "@/components/Title";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [hoveredTag, setHoveredTag] = useState(null);

  const tags = ["AI/ML", "Web3", "AR/VR", "Healthcare", "Climate Tech"];

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50 z-0"></div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Discover Winning <span className="text-white relative">
                Hackathon
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-white"></span>
              </span>{" "}
              Projects
            </h1>
            <p className="mt-6 max-w-2xl text-lg tracking-wide text-gray-400 font-light">
              Get inspired by innovative solutions from top hackathons around
              the world. Learn from the best and level up your next project.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        {/* Dynamic Changing Title */}
        <Title />
        <div className="backdrop-blur-sm bg-gray-950/80 border border-gray-800 shadow-2xl rounded-xl p-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500 group-focus-within:text-white transition-colors duration-200" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 border-b border-gray-800 rounded-lg leading-5 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-white text-base text-white transition-all duration-200"
              placeholder="Search for projects, technologies, or hackathons..."
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div
                key={tag}
                onMouseEnter={() => setHoveredTag(tag)}
                onMouseLeave={() => setHoveredTag(null)}
                className={`rounded-full px-5 py-2 border border-gray-800 text-gray-300 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-white hover:text-white ${
                  hoveredTag === tag ? "border-white text-white" : ""
                }`}
              >
                {tag}
              </div>
            ))}
            <button className="rounded-full px-5 py-2 border border-gray-800 text-gray-300 text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:border-white hover:text-white">
              <FilterIcon className="h-4 w-4" />
              More Filters
              <ChevronDownIcon className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Subtle dot grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzYgMzBhNiA2IDAgMTAtMTIgMCA2IDYgMCAwMDEyIDB6TTE4IDE1YTMgMyAwIDEwMC02IDMgMyAwIDAwMCA2em00MiAwYTMgMyAwIDEwMC02IDMgMyAwIDAwMCA2eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-5 z-0"></div>
    </div>
  );
}