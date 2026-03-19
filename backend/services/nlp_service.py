from textblob import TextBlob

CRISIS_KEYWORDS = [
    "suicide", "kill myself", "end my life", "self harm",
    "hurt myself", "don't want to live", "hopeless", "worthless"
]

CRISIS_RESOURCES = [
    "iCall (India): 9152987821",
    "Vandrevala Foundation: 1860-2662-345 (24/7)",
    "AASRA: 9820466627",
    "iCall Chat: icallhelpline.org"
]

def analyze_sentiment(text: str) -> str:
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity > 0.2:
        return "positive"
    elif polarity < -0.2:
        return "negative"
    return "neutral"

def detect_crisis(text: str) -> bool:
    text_lower = text.lower()
    return any(keyword in text_lower for keyword in CRISIS_KEYWORDS)

def get_crisis_resources() -> list:
    return CRISIS_RESOURCES
