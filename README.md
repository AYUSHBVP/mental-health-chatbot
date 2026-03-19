# 🧠 Aria — AI Mental Health Chatbot (Groq Free API)

A full-stack mental health support chatbot built with React, FastAPI, and the **Groq API (FREE)**.

## Features
- 💬 Empathetic AI chat powered by LLaMA 3 (via Groq — FREE)
- 🎭 Mood tracker (1–10 scale)
- 🔍 Sentiment analysis (TextBlob)
- 🆘 Crisis detection + Indian helpline resources
- ⚡ Quick-start conversation prompts

---

## 🔑 Get Your FREE Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for a free account (no credit card needed)
3. Click **API Keys** → **Create API Key**
4. Copy the key — it starts with `gsk_...`

Groq free tier includes **generous daily limits** — more than enough for a personal chatbot.

---

## ▶️ How to Run

### Prerequisites
- Python 3.9+
- Node.js 18+
- A free Groq API key (see above)

---

### 1. Backend (FastAPI)

```bash
cd backend

# Copy and fill in your API key
cp .env.example .env
# Edit .env and set: GROQ_API_KEY=gsk_...

# Install dependencies
pip install -r requirements.txt

# Download TextBlob corpora (first time only)
python -m textblob.download_corpora

# Start the server
python -m uvicorn main:app --reload --port 8000
```

Backend will be running at: http://localhost:8000

---

### 2. Frontend (React + Vite)

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be running at: http://localhost:5173

---

### 3. (Optional) Docker Compose

```bash
cp backend/.env.example backend/.env
# Edit backend/.env → add your GROQ_API_KEY

docker-compose up --build
```

---

## Project Structure

```
mental-health-chatbot/
├── backend/
│   ├── main.py                  # FastAPI entry point
│   ├── routes/chat.py           # /api/chat endpoint
│   ├── services/
│   │   ├── ai_service.py        # Groq (LLaMA 3) integration
│   │   └── nlp_service.py       # Sentiment + crisis detection
│   ├── models/schemas.py        # Pydantic models
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main chat UI
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── docker-compose.yml
```

---

## Crisis Resources (India)
- iCall: 9152987821
- Vandrevala Foundation: 1860-2662-345
- AASRA: 9820466627

> ⚠️ This chatbot is a support tool, not a replacement for professional therapy.
