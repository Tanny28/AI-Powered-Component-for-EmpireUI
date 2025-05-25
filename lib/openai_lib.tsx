import OpenAI from 'openai';

// Validate that the API key is present
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Missing OpenAI API key. Please add OPENAI_API_KEY to your .env.local file.');
  throw new Error(
    'Missing OpenAI API key. Please add OPENAI_API_KEY to your .env.local file.'
  );
}

// Initialize OpenAI client with API key from environment variables
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('✅ OpenAI client initialized successfully');

// Export types for better TypeScript support
export type { OpenAI } from 'openai';