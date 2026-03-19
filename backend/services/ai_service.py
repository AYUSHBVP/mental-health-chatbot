from groq import Groq
from dotenv import load_dotenv
import os
from typing import List
from models.schemas import Message

# Load .env before anything else
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are Aria, a compassionate mental health support companion.
Your role is to:
- Provide empathetic, non-judgmental emotional support
- Use active listening techniques and reflect feelings
- Offer CBT-based coping strategies when appropriate
- NEVER diagnose or replace professional therapy
- If crisis signals are detected, always recommend professional help
- Keep responses warm, concise, and human (2-4 sentences)"""

def get_ai_response(user_message: str, history: List[Message], mood: int = None) -> str:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    if mood:
        messages.append({"role": "user", "content": f"[My mood today is {mood}/10]"})
        messages.append({"role": "assistant", "content": "Thank you for sharing that. I'm here with you."})

    for msg in history[-10:]:
        messages.append({"role": msg.role, "content": msg.content})

    messages.append({"role": "user", "content": user_message})

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        max_tokens=1000,
        temperature=0.7,
    )
    return response.choices[0].message.content