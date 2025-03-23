'use client'
import React, { useState } from 'react';
import { LoaderIcon } from 'lucide-react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [debugData, setDebugData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  
  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    setDebugData(null);
    
    try {
      const response = await fetch('/api/debug');
      const data = await response.json();
      
      setDebugData(data);
      if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchText.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSearchResults(null);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery: searchText,
          selectedTags: [],
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: Search failed`);
      }
      
      setSearchResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen text-[var(--text-primary)] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pinecone Admin</h1>
        
        <div className="mb-4 p-4 bg-[var(--bg-secondary)]/50 border border-[var(--border-primary)] rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Info</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            This app is configured to search in the <code className="px-1 py-0.5 bg-[var(--bg-secondary)] rounded">ns1</code> namespace of your Pinecone index.
          </p>
          <div className="mt-3 text-sm text-[var(--text-secondary)]">
            <p className="font-medium">Expected data format:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li><code className="px-1 bg-[var(--bg-secondary)] rounded">name</code>: Project name</li>
              <li><code className="px-1 bg-[var(--bg-secondary)] rounded">tagline</code>: Short project description</li>
              <li><code className="px-1 bg-[var(--bg-secondary)] rounded">description</code>: Full project description (used for tag extraction)</li>
              <li><code className="px-1 bg-[var(--bg-secondary)] rounded">hackathon</code>: Hackathon name</li>
              <li><code className="px-1 bg-[var(--bg-secondary)] rounded">url</code>: Project URL (usually Devpost)</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-8 p-4 border border-[var(--border-primary)] rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Connection Check</h2>
          <button
            onClick={checkConnection}
            disabled={loading}
            className="px-4 py-2 bg-[var(--accent)] text-white rounded-md disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <LoaderIcon className="animate-spin mr-2 h-4 w-4" />
                Checking...
              </span>
            ) : 'Check Pinecone Connection'}
          </button>
          
          {debugData && !debugData.error && debugData.stats && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500 rounded text-sm">
              <p className="font-semibold text-green-500">Connection successful!</p>
              <ul className="mt-2 space-y-1 text-[var(--text-secondary)]">
                <li>Total records: {debugData.stats.totalRecordCount}</li>
                <li>Vector dimension: {debugData.stats.dimension}</li>
                <li>Namespaces: {Object.keys(debugData.stats.namespaces || {}).join(', ') || 'none'}</li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="mb-8 p-4 border border-[var(--border-primary)] rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Search</h2>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Enter search query"
              className="flex-1 px-4 py-2 border border-[var(--border-primary)] bg-[var(--bg-secondary)] rounded-md"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-md disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <LoaderIcon className="animate-spin mr-2 h-4 w-4" />
                  Searching...
                </span>
              ) : 'Search'}
            </button>
          </form>
          
          <div className="text-xs text-[var(--text-secondary)]/70">
            <p>Note: This search is performed in the <code className="px-1 py-0.5 bg-[var(--bg-secondary)] rounded">ns1</code> namespace.</p>
          </div>
        </div>
        
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
            <h3 className="font-semibold mb-2">Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        {debugData && (
          <div className="mb-8 p-4 border border-[var(--border-primary)] rounded-lg overflow-x-auto">
            <h3 className="font-semibold mb-2">Debug Data</h3>
            <pre className="text-sm">{JSON.stringify(debugData, null, 2)}</pre>
          </div>
        )}
        
        {searchResults && (
          <div className="mb-8 p-4 border border-[var(--border-primary)] rounded-lg overflow-x-auto">
            <h3 className="font-semibold mb-2">Search Results ({searchResults.length})</h3>
            {searchResults.length > 0 ? (
              <pre className="text-sm">{JSON.stringify(searchResults, null, 2)}</pre>
            ) : (
              <p>No results found for your query.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 