import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function SecurityChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '보안 지식을 챗봇에게 물어보세요.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('비밀번호') || lowerMessage.includes('패스워드')) {
      return '안전한 비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 혼합하여 만드는 것이 좋습니다. 또한 같은 비밀번호를 여러 사이트에서 사용하지 마세요.';
    }
    if (lowerMessage.includes('개인정보') || lowerMessage.includes('유출')) {
      return '개인정보 유출을 방지하려면: 1) 정기적으로 비밀번호 변경 2) 사용하지 않는 계정 삭제 3) 이중 인증 활성화 4) 의심스러운 링크 클릭 금지를 실천하세요.';
    }
    if (lowerMessage.includes('이중') || lowerMessage.includes('2fa') || lowerMessage.includes('인증')) {
      return '이중 인증(2FA)은 비밀번호 외에 추가 인증 단계를 거치는 것입니다. SMS, 인증 앱, 생체인식 등을 통해 계정 보안을 크게 향상시킬 수 있습니다.';
    }
    if (lowerMessage.includes('피싱') || lowerMessage.includes('사기')) {
      return '피싱 메일/문자 주의사항: 1) 발신자 주소 확인 2) 첨부파일 함부로 열지 않기 3) 개인정보 요구 시 의심 4) 공식 채널로 직접 확인하기';
    }
    
    return '보안에 관한 질문을 주시면 최선을 다해 답변드리겠습니다. 비밀번호, 개인정보 보호, 이중인증, 피싱 등에 대해 물어보세요!';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
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
          <p className="text-xs text-slate-400">온라인</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'bot' ? 'bg-blue-600' : 'bg-slate-700'
            }`}>
              {message.sender === 'bot' ? (
                <Bot className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
              <div
                className={`inline-block max-w-[85%] p-3 rounded-lg ${
                  message.sender === 'bot'
                    ? 'bg-slate-800 text-left'
                    : 'bg-blue-600 text-right'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {message.timestamp.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="질문을 입력하세요..."
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
