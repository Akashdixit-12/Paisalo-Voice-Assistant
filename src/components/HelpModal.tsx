import React from 'react';
import { X, Mic, Zap, ShieldCheck, Languages, Phone, Sparkles } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#080808] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/10 space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F27D26] to-[#FFB347] text-slate-950 flex items-center justify-center font-bold text-base">
              P
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Paisalo AI Voice Executive Guide
              </h3>
              <p className="text-xs text-slate-400">
                Continuous voice call guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Key Call Behaviors */}
        <div className="space-y-3.5 text-xs sm:text-sm">
          
          <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <Mic className="w-5 h-5 text-[#F27D26] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Continuous Voice Stream</h4>
              <p className="text-slate-300 text-xs mt-0.5">
                Once the call starts, talk naturally. You do NOT need to press any "Record" or "Hold to Speak" buttons.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Immediate Interruption (Barge-In)</h4>
              <p className="text-slate-300 text-xs mt-0.5">
                Interrupt the AI executive anytime while she is speaking. She immediately yields and addresses your new question.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <Languages className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">English, Hindi & Hinglish</h4>
              <p className="text-slate-300 text-xs mt-0.5">
                Speak in Hindi ("EV loan ke liye eligibility kya hai?"), Hinglish, or English. The assistant adapts instantly.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Paisalo Knowledge Grounded</h4>
              <p className="text-slate-300 text-xs mt-0.5">
                Factual answers are strictly derived from official Paisalo knowledge. Out-of-scope or missing questions are politely declined.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F27D26] to-[#FFB347] hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-[#F27D26]/20"
          >
            Got it, start call
          </button>
        </div>

      </div>
    </div>
  );
};
