# 🎙️ Voice Command Button – EmpireUI Component

An AI-powered microphone component that listens to your voice, transcribes it using **OpenAI Whisper**, and responds with **GPT-4**. Built with 💡 simplicity, 🔐 security, and 🎨 modern UI.

🧠 Created for the **Vibe-a-thon 1.0 by Geek Room** and contributes to the **EmpireUI open-source library**.

---

## ✨ Features

- 🎤 Mic button with pulsing animation and state transitions
- 🧠 Transcription via OpenAI Whisper (voice-to-text)
- 🤖 Smart AI response via OpenAI GPT-4
- 🔐 API key secured with environment variables
- 🎨 Tailwind CSS + TypeScript + Next.js
- 💬 Live feedback, loading states, and error handling

---

## 🚀 Live Demo

🧪 [Visit the demo page]([https://your-vercel-url.vercel.app/demo](https://ai-powered-component-for-empire-ui.vercel.app/)  
*(Replace with your Vercel link)*

Or run locally:  
`http://localhost:3000/demo`

---

## 📁 Project Structure
empire-voice-button/
├── components/
│ └── ui/
│ └── VoiceCommandButton.tsx # Main mic component
├── pages/
│ ├── api/
│ │ └── voice/
│ │ └── route.ts # API route: Whisper + GPT-4
│ └── demo.tsx # Usage demo
├── lib/
│ └── openai.ts # OpenAI config using env key
├── styles/
│ └── globals.css # Tailwind directives
├── .env.local # Your OpenAI key (DO NOT COMMIT)
├── .env.example # Shared env template
├── .gitignore # Prevents secret + build files
├── package.json # Dependencies and scripts
└── README.md # This file

---

## 🔧 Installation & Setup

1. **Install dependencies**:

npm install
Create .env.local file in the root and paste:

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
(Replace with your actual OpenAI API key)

Run locally:

npm run dev
➡ Go to http://localhost:3000/demo

📦 How It Works
User clicks the mic button → voice is recorded

Audio is sent to pages/api/voice/route.ts securely

Whisper transcribes the audio → GPT-4 generates a response

The UI displays both transcript and AI reply

🔐 Security Notes
API key is never exposed to frontend

Audio files processed securely via backend

.env.local is ignored in Git

Temporary files deleted after processing

💡 Sample Voice Prompts
“Summarize this document.”

“Tell me a joke.”

“Translate this sentence to Hindi.”

🧠 Tech Stack
Frontend: React, Next.js, Tailwind CSS

Backend: Next.js API Routes

AI: OpenAI Whisper (whisper-1) + GPT-4

Language: TypeScript

📮 Submission Instructions
✅ GitHub: github.com/your-username/empire-voice-button

✅ EmpireUI PR includes:

VoiceCommandButton.tsx

API route (voice/route.ts)

README, .env.example, and .gitignore

🙌 Author & Credits
Made with ❤️ by Tanmay Shinde
For Geek Room Vibe-a-thon 1.0

🎧 Code the vibe. Build the future.

---

## 📌 Reminder

- ✅ Paste this into a file named **`README.md`** in your root project folder.
- ✅ Update the **Vercel demo link** and **GitHub link** before final submission.
- ✅ Push to GitHub or submit in your ZIP/Pull Request.

Let me know if you want the `.env.example` too — or want help submitting the GitHub PR. You're fully ready now 🔥








