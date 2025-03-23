import { Pinecone, PineconeRecord, RecordMetadata } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
});

// Initialize the Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? '',
});

// Update the interface to extend RecordMetadata which allows for string indexing
export interface Project extends RecordMetadata {
  id: string;
  projectName: string;
  date: string;
  hackathon: string;
  tagline: string;
  projectUrl?: string;
  tags: string[];
  description?: string;
  [key: string]: any; // Add index signature to satisfy RecordMetadata constraint
}

/**
 * Generate an embedding for a text string using OpenAI's text-embedding-3-small model
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });

  return response.data[0].embedding;
}

/**
 * Prepare a project record for insertion into Pinecone
 */
export async function prepareProjectRecord(project: Project): Promise<PineconeRecord<Project>> {
  // Create a rich text representation for embedding
  const textForEmbedding = `
    Project: ${project.projectName}
    Hackathon: ${project.hackathon}
    Date: ${project.date}
    Tags: ${project.tags.join(', ')}
    Tagline: ${project.tagline}
    Description: ${project.description || ''}
  `;

  // Generate embedding
  const embedding = await generateEmbedding(textForEmbedding);

  // Return a properly formatted Pinecone record
  return {
    id: project.id,
    values: embedding,
    metadata: project,
  };
}

/**
 * Insert a batch of projects into the Pinecone index
 */
export async function upsertProjects(projects: Project[]): Promise<void> {
  if (!projects.length) return;

  try {
    const index = pinecone.index(process.env.PINECONE_INDEX ?? '');
    
    // Prepare all project records with embeddings
    const records = await Promise.all(
      projects.map(project => prepareProjectRecord(project))
    );
    
    // Insert in batches of 100 (Pinecone recommendation)
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await index.upsert(batch);
      console.log(`Upserted batch ${i / batchSize + 1} of ${Math.ceil(records.length / batchSize)}`);
    }
    
    console.log(`Successfully upserted ${records.length} projects`);
  } catch (error) {
    console.error('Error upserting projects:', error);
    throw error;
  }
}

/**
 * Delete a project from the Pinecone index
 */
export async function deleteProject(projectId: string): Promise<void> {
  try {
    const index = pinecone.index(process.env.PINECONE_INDEX ?? '');
    await index.deleteOne(projectId);
    console.log(`Successfully deleted project ${projectId}`);
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
} 