'use client'
import React, { useState } from "react";
import ProjectCard from "@/components/ProjectCard";

export default function ResultsPage() {
  // Static list of projects for demonstration purposes.
  const [searchTerm, setSearchTerm] = useState("");
  const projects = [
    {
      projectName: "DecentraHealth",
      date: "2024-01-15",
      hackathon: "ETHGlobal",
      tagline: "A decentralized health data management system with privacy-preserving analytics",
      projectUrl: "https://example.com/decentrahealth",
    },
    {
      projectName: "EcoTrack AI",
      date: "2024-02-20",
      hackathon: "HackMIT",
      tagline: "AI-powered solution for tracking and reducing carbon footprint across supply chains",
      projectUrl: "https://example.com/ecotrack-ai",
    },
    {
      projectName: "VoiceFlow",
      date: "2024-03-10",
      hackathon: "DevPost",
      tagline: "Voice-controlled interface for accessibility in development environments",
      projectUrl: "https://example.com/voiceflow",
    },
  ];

  // Filter projects based on the search term (checks projectName and tagline).
  const filteredProjects = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white font-palantir">
      {/* Search Bar Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-base"
              placeholder="Search for projects, hackathons, or keywords..."
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold mb-6">Search Results</h2>
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                projectName={project.projectName}
                date={project.date}
                hackathon={project.hackathon}
                tagline={project.tagline}
                projectUrl={project.projectUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No results found.</p>
        )}
      </div>
    </div>
  );
}
