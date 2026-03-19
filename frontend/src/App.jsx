import { useState, useRef, useEffect } from "react";

const CRISIS_RESOURCES = [
  "iCall (India): 9152987821",
  "Vandrevala Foundation: 1860-2662-345",
  "AASRA: 9820466627",
];

const MOODS = [
  { val: 1, emoji: "😭", label: "Terrible" },
  { val: 3, emoji: "😢", label: "Bad" },
  { val: 5, emoji: "😐", label: "Okay" },
  { val: 7, emoji: "🙂", label: "Good" },
  { val: 9, emoji: "😄", label: "Great" },
];

const QUICK_PROMPTS = [
  "I'm feeling anxious today",
  "I can't sleep well lately",
  "Help me with a breathing exercise",
  "I need to talk to someone",
];

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px" }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%", background: "#a78bfa",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
      <span style={{ fontSize: 13, color: "#9ca3af" }}>Aria is typing...</span>
    </div>
  );
}

function CrisisAlert({ resources }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #fee2e2, #fecaca)",
      border: "1px solid #f87171", borderRadius: 12,
      padding: "14px 16px", margin: "8px 0",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>🆘</span>
        <strong style={{ color: "#991b1b", fontSize: 14 }}>Crisis Support Resources</strong>
      </div>
      {resources.map((r, i) => (
        <div key={i} style={{ fontSize: 13, color: "#7f1d1d", padding: "3px 0" }}>📞 {r}</div>
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex", flexDirection: isUser ? "row-reverse" : "row",
      alignItems: "flex-end", gap: 10, marginBottom: 16,
    }}>
      {!isUser && (
        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>🧠</div>
      )}
      <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{
          background: isUser ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "white",
          color: isUser ? "white" : "#1f2937",
          padding: "12px 16px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          fontSize: 14, lineHeight: 1.6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", whiteSpace: "pre-wrap",
        }}>
          {msg.content}
        </div>
        {msg.sentiment && (
          <div style={{ fontSize: 11, color: "#9ca3af", paddingLeft: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <span>{msg.sentiment === "positive" ? "🟢" : msg.sentiment === "negative" ? "🔴" : "🟡"}</span>
            {msg.sentiment} sentiment
          </div>
        )}
        {msg.crisis_detected && msg.crisis_resources && (
          <CrisisAlert resources={msg.crisis_resources} />
        )}
      </div>
      {isUser && (
        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>😊</div>
      )}
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Hi, I'm Aria 🌸 — your mental wellness companion. This is a safe, judgment-free space. How are you feeling today?",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);
  const [showMood, setShowMood] = useState(true);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const userMsg = { role: "user", content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    const history = newMessages.slice(1, -1).map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history, mood }),
      });

      const data = await res.json();

      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.reply,
        sentiment: data.sentiment,
        crisis_detected: data.crisis_detected,
        crisis_resources: data.crisis_resources,
      }]);
    } catch (err) {
      setError("Could not reach the server. Make sure the backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #e0e7ff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', -apple-system, sans-serif", padding: 16,
    }}>
      <style>{`
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
        textarea:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d8b4fe; border-radius: 4px; }
      `}</style>
      <div style={{
        width: "100%", maxWidth: 480, height: "90vh", maxHeight: 780,
        background: "white", borderRadius: 24,
        boxShadow: "0 20px 60px rgba(109,40,217,0.15)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", padding: "20px 20px 16px", color: "white" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
            }}>🧠</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>Aria</div>
              <div style={{ fontSize: 12, opacity: 0.8, display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                Mental Wellness Companion
              </div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 12px", fontSize: 12, opacity: 0.9 }}>
            🔒 This is a safe space. Everything stays between us.
          </div>
        </div>

        {/* Mood Tracker */}
        {showMood && (
          <div style={{ padding: "12px 16px", background: "#faf5ff", borderBottom: "1px solid #f3e8ff" }}>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, fontWeight: 500 }}>How are you feeling right now?</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {MOODS.map(m => (
                <button key={m.val} onClick={() => { setMood(m.val); setShowMood(false); }} style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 20,
                  border: mood === m.val ? "2px solid #7c3aed" : "2px solid #e9d5ff",
                  background: mood === m.val ? "#ede9fe" : "white",
                  cursor: "pointer", fontSize: 13, color: "#374151", transition: "all 0.15s",
                }}>
                  <span>{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
          {loading && <TypingIndicator />}
          {error && (
            <div style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 8 }}>
              ⚠️ {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 2 && (
          <div style={{ padding: "8px 16px", display: "flex", gap: 8, flexWrap: "wrap", borderTop: "1px solid #f3e8ff" }}>
            {QUICK_PROMPTS.map((p, i) => (
              <button key={i} onClick={() => sendMessage(p)} style={{
                padding: "6px 12px", borderRadius: 20, border: "1px solid #d8b4fe",
                background: "#faf5ff", cursor: "pointer", fontSize: 12, color: "#6d28d9",
              }}>{p}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f3e8ff", background: "white", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind..." rows={1}
            style={{
              flex: 1, resize: "none", border: "2px solid #e9d5ff", borderRadius: 16,
              padding: "10px 14px", fontSize: 14, fontFamily: "inherit",
              color: "#1f2937", background: "#faf5ff", lineHeight: 1.5, maxHeight: 100, overflowY: "auto",
            }}
          />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{
            width: 44, height: 44, borderRadius: "50%", border: "none",
            background: loading || !input.trim() ? "#e9d5ff" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
            color: "white", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
          }}>
            {loading ? "⏳" : "➤"}
          </button>
        </div>

        {/* Disclaimer */}
        <div style={{ padding: "8px 16px", fontSize: 11, color: "#9ca3af", textAlign: "center", background: "#fafafa", borderTop: "1px solid #f3e8ff" }}>
          Not a replacement for professional therapy. In crisis? Call iCall: 9152987821
        </div>
      </div>
    </div>
  );
}
