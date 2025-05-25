// pages/index.tsx (for Pages Router) OR app/page.tsx (for App Router)
import React, { useState } from 'react';
import VoiceCommandButton from '@/components/ui/voice_command_button';

interface VoiceCommandResponse {
  transcript: string;
  aiResponse: string;
  error?: string;
}

export default function HomePage() {
  const [responses, setResponses] = useState<VoiceCommandResponse[]>([]);

  const handleVoiceResponse = (response: VoiceCommandResponse) => {
    setResponses(prev => [response, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🎙️ AI Voice Command Button
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Speak naturally, get intelligent responses powered by OpenAI
          </p>
          <p className="text-sm text-indigo-600 font-medium mb-12">
            Built for EmpireUI • Vibe-a-thon Hackathon Entry
          </p>
        </div>
      </div>

      {/* Main Component Demo */}
      <div className="max-w-2xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <VoiceCommandButton
            onResponse={handleVoiceResponse}
            className="w-full"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          ✨ Powerful Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎤</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice Recording</h3>
            <p className="text-gray-600">High-quality audio capture with noise cancellation</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
            <p className="text-gray-600">OpenAI Whisper + GPT-4 for smart responses</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-600">Server-side API processing, no client-side keys</p>
          </div>
        </div>
      </div>

      {/* Response History */}
      {responses.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                💬 Conversation History
              </h2>
              <button
                onClick={() => setResponses([])}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {responses.map((response, index) => (
                <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 font-medium">YOU SAID:</span>
                    <p className="text-gray-800">{response.transcript}</p>
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 font-medium">AI RESPONSE:</span>
                    <p className="text-blue-800">{response.aiResponse}</p>
                  </div>
                  {response.error && (
                    <div className="mt-2">
                      <span className="text-xs text-red-600 font-medium">ERROR:</span>
                      <p className="text-red-700">{response.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Try These Commands */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            💡 Try These Voice Commands
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "What's the weather like today?",
              "Explain machine learning simply",
              "Create a to-do list",
              "Tell me a programming joke",
              "Write a haiku about coding",
              "What are the latest tech trends?",
            ].map((command, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <p className="text-gray-700">"{command}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Use This Component?</h3>
          <p className="text-gray-300 mb-6">
            Add AI voice capabilities to your Next.js app in minutes
          </p>
          <a 
            href="https://github.com/empireui/voice-command-button" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400">
              Built for EmpireUI • Vibe-a-thon Hackathon • MIT License
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
