'use client';

import React, { useState, useRef, useCallback } from 'react';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';

interface VoiceCommandResponse {
  transcript: string;
  aiResponse: string;
  error?: string;
}

interface VoiceCommandButtonProps {
  onResponse?: (response: VoiceCommandResponse) => void;
  className?: string;
  disabled?: boolean;
  maxRecordingTime?: number; // milliseconds
}

export default function VoiceCommandButton({
  onResponse,
  className = '',
  disabled = false,
  maxRecordingTime = 30000,
}: VoiceCommandButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    try {
      console.log('🎤 Starting recording...');
      setError('');
      setTranscript('');
      setAiResponse('');

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } 
      });

      streamRef.current = stream;

      // Check supported MIME types
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/wav'
      ];

      let mimeType = 'audio/webm';
      for (const type of mimeTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type;
          break;
        }
      }

      console.log('🎵 Using MIME type:', mimeType);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log('📊 Data available:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log('⏹️ Recording stopped, processing audio...');
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mimeType 
        });
        
        console.log('🎵 Audio blob size:', audioBlob.size, 'bytes');
        
        if (audioBlob.size > 0) {
          await processAudio(audioBlob);
        } else {
          setError('No audio data recorded. Please try again.');
        }

        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
            console.log('🔇 Stopped track:', track.kind);
          });
          streamRef.current = null;
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('❌ MediaRecorder error:', event);
        setError('Recording failed. Please try again.');
        setIsRecording(false);
      };

      // Start recording with time slice for better data availability
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      console.log('✅ Recording started');

      // Auto-stop after maxRecordingTime
      timeoutRef.current = setTimeout(() => {
        console.log('⏰ Auto-stopping recording after timeout');
        stopRecording();
      }, maxRecordingTime);

    } catch (err) {
      console.error('❌ Mic error:', err);
      setError('🎤 Microphone access failed. Please check permissions and try again.');
      setIsRecording(false);
    }
  }, [maxRecordingTime]);

  const stopRecording = useCallback(() => {
    console.log('🛑 Stopping recording...');
    
    if (mediaRecorderRef.current && isRecording) {
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isRecording]);

  const processAudio = async (blob: Blob) => {
    console.log('🔄 Processing audio blob...');
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', blob, 'voice.webm');

      console.log('📤 Sending audio to API...');
      
      const res = await fetch('/api/voice', {
        method: 'POST',
        body: formData,
      });

      console.log('📥 API response status:', res.status);

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data: VoiceCommandResponse = await res.json();
      console.log('✅ API returned:', data);

      if (data.error) {
        setError(data.error);
      } else {
        setTranscript(data.transcript);
        setAiResponse(data.aiResponse);
        onResponse?.(data);
      }
    } catch (err) {
      console.error('❌ Process error:', err);
      setError('❌ Failed to process audio. Please check your connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    console.log('👆 Button clicked, isRecording:', isRecording);
    isRecording ? stopRecording() : startRecording();
  };

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Mic Button */}
      <div className="relative">
        <button
          onClick={handleClick}
          disabled={disabled || isProcessing}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-200 transform hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-blue-300
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg
            ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {isProcessing ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isRecording ? (
            <StopIcon className="w-6 h-6 text-white" />
          ) : (
            <MicrophoneIcon className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Pulse while recording */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
        )}
      </div>

      {/* Status */}
      <div className="text-center text-sm min-h-[2rem] flex items-center">
        {isRecording && (
          <p className="text-red-600 font-medium animate-pulse">🎙️ Recording… Click to stop</p>
        )}
        {isProcessing && (
          <p className="text-blue-600 font-medium">🤖 Processing your voice…</p>
        )}
        {!isRecording && !isProcessing && !transcript && !error && (
          <p className="text-gray-500">
            💡 Try saying: <span className="italic">"Hello, how are you?"</span>
          </p>
        )}
      </div>

      {/* Output */}
      {transcript && (
        <div className="w-full max-w-md space-y-3">
          <div className="p-3 bg-gray-100 rounded-lg border">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">🗣️ You said:</h4>
            <p className="text-sm text-gray-900">{transcript}</p>
          </div>
          {aiResponse && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-700 mb-1">🤖 AI Response:</h4>
              <p className="text-sm text-blue-900">{aiResponse}</p>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="w-full max-w-md p-3 bg-red-50 rounded-lg border border-red-300">
          <p className="text-sm text-red-700">❌ {error}</p>
        </div>
      )}
    </div>
  );
}