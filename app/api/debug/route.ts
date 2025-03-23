import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize the Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? '',
});

export async function GET() {
  try {
    console.log('Debug API called');
    
    // Connect to your Pinecone index
    const indexName = process.env.PINECONE_INDEX ?? '';
    console.log('Connecting to Pinecone index:', indexName);
    
    const index = pinecone.index(indexName);

    // Get Pinecone index stats to check if it has any vectors
    console.log('Fetching index stats...');
    const stats = await index.describeIndexStats();
    console.log('Index stats:', stats);

    if (stats.totalRecordCount === 0) {
      return NextResponse.json({
        error: 'Your Pinecone index is empty. No records found.',
        stats
      }, { status: 404 });
    }

    // If there are vectors, let's fetch a sample
    console.log('Fetching a sample vector...');
    
    try {
      // Attempt to query one record to get a sample
      console.log('Querying for a sample record...');
      
      // First, try to query with namespace explicitly
      try {
        // Create a namespaced index accessor
        const namespacedIndex = index.namespace('ns1');
        
        console.log('Querying with namespace ns1...');
        const sampleQuery = await namespacedIndex.query({
          vector: Array(1536).fill(0), // Default dimension for OpenAI embeddings
          topK: 1,
          includeMetadata: true,
        });
        
        console.log('Sample query response (ns1):', JSON.stringify(sampleQuery));
        
        if (sampleQuery.matches.length > 0) {
          const sampleMatch = sampleQuery.matches[0];
          
          return NextResponse.json({
            message: 'Sample data retrieved successfully from namespace ns1',
            stats,
            sampleRecord: {
              id: sampleMatch.id,
              metadata: sampleMatch.metadata,
              score: sampleMatch.score
            }
          });
        }
      } catch (namespaceError) {
        console.error('Error querying with namespace:', namespaceError);
      }
      
      // If namespace query failed, try without namespace
      console.log('Trying query without namespace...');
      const sampleQuery = await index.query({
        vector: Array(1536).fill(0), // Default dimension for OpenAI embeddings
        topK: 1,
        includeMetadata: true,
      });
      
      console.log('Sample query response (default):', JSON.stringify(sampleQuery));
      
      if (sampleQuery.matches.length === 0) {
        return NextResponse.json({
          error: 'No records found in the index.',
          stats
        }, { status: 404 });
      }
      
      const sampleMatch = sampleQuery.matches[0];
      
      return NextResponse.json({
        message: 'Sample data retrieved successfully',
        stats,
        sampleRecord: {
          id: sampleMatch.id,
          metadata: sampleMatch.metadata,
          score: sampleMatch.score
        }
      });
      
    } catch (queryError) {
      console.error('Error querying for sample:', queryError);
      
      return NextResponse.json({
        error: 'Failed to query for a sample record',
        details: queryError instanceof Error ? queryError.message : String(queryError),
        stats
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: 'Failed to retrieve sample data',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 