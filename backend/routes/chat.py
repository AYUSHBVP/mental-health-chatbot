from fastapi import APIRouter
from models.schemas import ChatRequest, ChatResponse
from services.nlp_service import analyze_sentiment, detect_crisis, get_crisis_resources
from services.ai_service import get_ai_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    sentiment = analyze_sentiment(request.message)
    crisis = detect_crisis(request.message)
    reply = get_ai_response(request.message, request.history, request.mood)

    crisis_resources = None
    if crisis:
        crisis_resources = get_crisis_resources()
        reply += "\n\n⚠️ I'm genuinely concerned about you. Please reach out to a crisis helpline right away."

    return ChatResponse(
        reply=reply,
        sentiment=sentiment,
        crisis_detected=crisis,
        crisis_resources=crisis_resources
    )
