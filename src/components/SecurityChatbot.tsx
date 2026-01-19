import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { apiFetch } from "../lib/api";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

type ChatApiResponse = { reply: string };

export default function SecurityChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "보안 지식을 챗봇에게 물어보세요.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      // 백엔드로 보낼 “대화 히스토리” 구성
      const historyForApi = [...messages, userMessage].map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await apiFetch<ChatApiResponse>("/api/security-chat", {
        method: "POST",
        body: JSON.stringify({ messages: historyForApi }),
      });

      const botMessage: Message = {
        id: Date.now() + 1,
        text: res.reply,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e: any) {
      const errText =
        e?.message ||
        "지금은 답변을 가져오지 못했어요. (로그인/요금제/서버 상태 확인)";
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: `⚠️ ${errText}`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg h-[calc(100vh-12rem)] flex flex-col sticky top-24">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold">보안 어시스턴트</h3>
          <p className="text-xs text-slate-400">{sending ? "답변 생성 중..." : "온라인"}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "bot" ? "bg-blue-600" : "bg-slate-700"
              }`}
            >
              {message.sender === "bot" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={`flex-1 ${message.sender === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block max-w-[85%] p-3 rounded-lg ${
                  message.sender === "bot" ? "bg-slate-800 text-left" : "bg-blue-600 text-right"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {message.timestamp.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {/* ✅ 로딩 스피너(너가 원한 “동그랗게 도는 표시”) */}
        {sending && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-600">
              <Bot className="w-5 h-5" />
            </div>
            <div className="inline-flex items-center gap-2 bg-slate-800 p-3 rounded-lg">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm text-slate-200">생성 중...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            disabled={sending}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="질문을 입력하세요..."
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
          <button
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors disabled:opacity-60"
            title={sending ? "답변 생성 중..." : "전송"}
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
