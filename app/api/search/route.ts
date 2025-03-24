import { NextRequest, NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
});

// Initialize the Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? '',
});

// Define the project type to match the ProjectCard component
interface Project {
  id: string;
  projectName: string;
  date: string;
  hackathon: string;
  tagline: string;
  projectUrl?: string;
  tags: string[];
  // Add any other fields that might be in your database
}

export async function POST(req: NextRequest) {
  try {
    const { searchQuery, selectedTags = [] } = await req.json();
    
    console.log('Search query:', searchQuery);
    console.log('Selected tags:', selectedTags);

    if (!searchQuery) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Get the embedding for the search query
    console.log('Generating embedding for query...');
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: searchQuery,
      encoding_format: "float",
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;
    console.log('Embedding generated successfully, length:', queryEmbedding.length);

    // Connect to your Pinecone index
    const indexName = process.env.PINECONE_INDEX ?? '';
    console.log('Connecting to Pinecone index:', indexName);
    const index = pinecone.index(indexName);
    
    // Access the namespace where your data is stored
    console.log('Accessing namespace: ns1');
    const namespacedIndex = index.namespace('ns1');

    // Prepare filter based on tags if any are selected
    // We're keeping the code structure but effectively disabling tag filtering
    // since the feature has been removed from the UI
    let filter = undefined;
    
    console.log('Using filter:', filter);

    // Query the vector database
    console.log('Querying Pinecone namespace ns1...');
    const queryResponse = await namespacedIndex.query({
      vector: queryEmbedding,
      topK:30, // Get top 10 results
      includeMetadata: true,
      filter,
    });

    console.log('Pinecone query response:', JSON.stringify({
      matches: queryResponse.matches.length,
      namespace: queryResponse.namespace,
    }));

    // Format the results to match the ProjectCard component props
    const results = queryResponse.matches.map(match => {
      console.log('Match metadata:', match.metadata);
      const metadata = match.metadata as any;
      
      // Map the fields based on the actual structure in Pinecone
      return {
        id: match.id,
        projectName: metadata.name || 'Unnamed Project',
        hackathon: metadata.hackathon || 'Unknown Hackathon',
        tagline: metadata.tagline || 'No description available',
        projectUrl: metadata.url || '',
        // Try to extract tags from the description or use an empty array
        tags: metadata.tags || 
              (typeof metadata.description === 'string' && metadata.description.includes('Built With') 
                ? metadata.description
                    .split('Built With')[1]
                    .split(/\n|\.|\!/)[0]
                    .split(/\s+/)
                    .filter((word: string) => word.trim().length > 0 && !word.match(/^(built|with)$/i))
                    .slice(0, 5)
                : []),
        // Include the score for debugging/sorting if needed
        score: match.score,
        // Additional fields that might be useful for processing
        description: metadata.description
      };
    });

    console.log('Formatted results:', results.length);
    return NextResponse.json({ results });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
} 