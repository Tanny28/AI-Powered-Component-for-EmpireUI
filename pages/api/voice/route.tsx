import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai_lib'; // Adjust the import path as necessary

interface VoiceResponse {
  transcript: string;
  aiResponse: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('file') as File;
    
    if (!audioFile) {
      return NextResponse.json({
        transcript: '',
        aiResponse: '',
        error: 'No audio file provided'
      }, { status: 400 });
    }

    console.log('📁 Audio file received:', audioFile.name, audioFile.size, 'bytes');

    // Transcribe audio using OpenAI Whisper
    const transcript = await transcribeAudio(audioFile);
    
    if (!transcript) {
      return NextResponse.json({
        transcript: '',
        aiResponse: '',
        error: 'Failed to transcribe audio. Please speak clearly and try again.'
      }, { status: 400 });
    }

    console.log('🗣️ Transcript:', transcript);

    // Generate AI response using GPT-4
    const aiResponse = await generateAIResponse(transcript);

    console.log('🤖 AI Response:', aiResponse);

    return NextResponse.json({
      transcript,
      aiResponse,
    });

  } catch (error) {
    console.error('❌ Voice API error:', error);
    return NextResponse.json({
      transcript: '',
      aiResponse: '',
      error: 'Internal server error. Please try again.'
    }, { status: 500 });
  }
}

async function transcribeAudio(audioFile: File): Promise<string> {
  try {
    console.log('🎵 Starting transcription...');
    
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en',
      response_format: 'text',
    });

    return transcription.trim();
  } catch (error) {
    console.error('❌ Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}

async function generateAIResponse(transcript: string): Promise<string> {
  try {
    console.log('🧠 Generating AI response...');
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant responding to voice commands. The user has spoken to you, and you should provide a concise, helpful response. Keep responses brief but informative, suitable for voice interaction. If the user asks you to perform an action (like "summarize this document" or "create a reminder"), acknowledge what they want and provide guidance on how to proceed.`
        },
        {
          role: 'user',
          content: transcript
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content?.trim() || 'I heard you, but I\'m not sure how to respond to that.';
  } catch (error) {
    console.error('❌ AI response error:', error);
    throw new Error('Failed to generate AI response');
  }
}