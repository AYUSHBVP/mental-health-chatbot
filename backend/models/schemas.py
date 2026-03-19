from pydantic import BaseModel
from typing import List, Optional

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message] = []
    mood: Optional[int] = None

class ChatResponse(BaseModel):
    reply: str
    sentiment: str
    crisis_detected: bool
    crisis_resources: Optional[List[str]] = None
