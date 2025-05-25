import React, { useState } from 'react';
import VoiceCommandButton from '@/components/ui/voice_command_button';
interface VoiceCommandResponse {
  transcript: string;
  aiResponse: string;
  error?: string;
}

export default function VoiceCommandDemo() {
  const [responses, setResponses] = useState<VoiceCommandResponse[]>([]);

  const handleVoiceResponse = (response: VoiceCommandResponse) => {
    setResponses(prev => [response, ...prev]);
  };

  const clearHistory = () => {
    setResponses([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎙️ Voice Command Button
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            AI-Powered Voice Interaction Component
          </p>
          <p className="text-sm text-gray-500">
            Built for EmpireUI • Powered by OpenAI Whisper & GPT-4
          </p>
        </div>

        {/* Main Component */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <VoiceCommandButton
            onResponse={handleVoiceResponse}
            maxRecordingTime={30000}
            className="w-full"
          />
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl mb-2">🎤</div>
            <h3 className="font-semibold text-gray-900 mb-2">Voice Recording</h3>
            <p className="text-sm text-gray-600">
              High-quality audio capture with noise suppression and echo cancellation
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Processing</h3>
            <p className="text-sm text-gray-600">
              OpenAI Whisper for transcription and GPT-4 for intelligent responses
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">
              Server-side API processing with automatic cleanup of temporary files
            </p>
          </div>
        </div>

        {/* Response History */}
        {responses.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                💬 Conversation History
              </h2>
              <button
                onClick={clearHistory}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear History
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {responses.map((response, index) => (
                <div key={index} className="border-l-4 border-blue-400 pl-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 font-medium">YOU SAID:</span>
                    <p className="text-gray-800 mt-1">{response.transcript}</p>
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 font-medium">AI RESPONSE:</span>
                    <p className="text-blue-800 mt-1">{response.aiResponse}</p>
                  </div>
                  {response.error && (
                    <div className="mt-2">
                      <span className="text-xs text-red-600 font-medium">ERROR:</span>
                      <p className="text-red-700 mt-1">{response.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            💡 Try These Voice Commands
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "What's the weather like today?",
              "Summarize this document for me",
              "Create a to-do list for tomorrow",
              "Explain quantum computing simply",
              "Write a haiku about coding",
              "What are the latest tech trends?",
              "Help me plan a healthy meal",
              "Tell me a programming joke"
            ].map((command, index) => (
              <div 
                key={index}
                className="p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <p className="text-sm text-gray-700">"{command}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">🔧 Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Frontend Technologies</h3>
              <ul className="space-y-1 text-sm opacity-90">
                <li>• Next.js 14 with TypeScript</li>
                <li>• React 18 with Hooks</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Heroicons for UI icons</li>
                <li>• MediaRecorder API for audio</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Backend & AI</h3>
              <ul className="space-y-1 text-sm opacity-90">
                <li>• Next.js API Routes</li>
                <li>• OpenAI Whisper (speech-to-text)</li>
                <li>• OpenAI GPT-4 (AI responses)</li>
                <li>• Formidable (file handling)</li>
                <li>• WebM audio format</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">
            Built for the EmpireUI component library
          </p>
          <p className="text-sm text-gray-500">
            🏆 Vibe-a-thon Hackathon Submission • MIT License
          </p>
        </div>
      </div>
    </div>
  );
}