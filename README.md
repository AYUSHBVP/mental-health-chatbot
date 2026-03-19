# 🧠 Aria — AI Mental Health Chatbot

🌐 **Live Demo:** [mental-health-chatbot-amber.vercel.app](https://mental-health-chatbot-amber.vercel.app)

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://mental-health-chatbot-amber.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-blue)](https://mental-health-chatbot-d7in.onrender.com)
[![Made with React](https://img.shields.io/badge/Frontend-React-61dafb)](https://reactjs.org)
[![Made with FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com)
[![Powered by Groq](https://img.shields.io/badge/AI-Groq%20LLaMA3-orange)](https://groq.com)

A full-stack AI mental health support chatbot built with React, FastAPI, and LLaMA 3 via Groq API (free).

## Features
- 💬 Empathetic AI chat powered by LLaMA 3 (via Groq — FREE)
- 🎭 Mood tracker (1–10 scale)
- 🔍 Sentiment analysis (TextBlob)
- 🆘 Crisis detection + Indian helpline resources
- ⚡ Quick-start conversation prompts

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** FastAPI (Python)
- **AI Model:** LLaMA 3 via Groq API
- **NLP:** TextBlob
- **Deployment:** Vercel (frontend) + Render (backend)

## Run Locally

### Backend
```bash
cd backend
cp .env.example .env
# Add your GROQ_API_KEY in .env
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Crisis Resources (India)
- iCall: 9152987821
- Vandrevala Foundation: 1860-2662-345
- AASRA: 9820466627

> ⚠️ This chatbot is a support tool, not a replacement for professional therapy.