import React, { useRef, useEffect } from 'react';
import { ChatTranscriptMessage } from '../types';
import { User, Bot, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';

interface LiveTranscriptProps {
  messages: ChatTranscriptMessage[];
  onClearTranscript: () => void;
}

export const LiveTranscript: React.FC<LiveTranscriptProps> = ({
  messages,
  onClearTranscript,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCopy = () => {
    const text = messages
      .map(m => `[${m.timestamp}] ${m.sender === 'user' ? 'User' : 'Paisalo Executive'}: ${m.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#080808] border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col h-[400px]">
      
      {/* Transcript Card Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-[#F27D26]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Live Voice Transcript
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono">
            {messages.length} TURNS
          </span>
        </div>

        {messages.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-[#FFB347] p-1.5 rounded-md hover:bg-white/5 transition"
              title="Copy call transcript"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={onClearTranscript}
              className="text-xs text-slate-500 hover:text-rose-400 px-2 py-1 rounded hover:bg-white/5 transition"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <Sparkles className="w-8 h-8 text-white/20 mb-2" />
            <p className="text-xs font-medium text-slate-400 max-w-xs">
              Live conversation transcript will stream here as you speak with executive Aruna Singh.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="text-center my-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-slate-400">
                    {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-slate-950 font-bold text-xs ${
                    isUser
                      ? 'bg-slate-300 text-slate-950'
                      : 'bg-gradient-to-br from-[#F27D26] to-[#FFB347] shadow-md shadow-[#F27D26]/20'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Content Bubble */}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-white/10 text-white border border-white/15 rounded-tr-none'
                      : 'bg-slate-900/90 text-slate-100 border border-[#F27D26]/30 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-medium">
                    <span className={isUser ? 'text-slate-300' : 'text-[#FFB347]'}>
                      {isUser ? 'You (Caller)' : 'Aruna Singh (Executive)'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

    </div>
  );
};
