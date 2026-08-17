import React from 'react';
import { Sparkles, HelpCircle, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  isDisabled: boolean;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  onSelectPrompt,
  isDisabled,
}) => {
  const prompts = [
    { label: 'EV / E-Rickshaw Loan Details', query: 'Mujhe EV loan ke baare mein batao.' },
    { label: 'Small Business Loan Rates', query: 'Small business loan ka interest rate aur eligibility kya hai?' },
    { label: 'SBI Co-Lending Model', query: 'Paisalo aur State Bank of India ka co-lending model kaise kaam karta hai?' },
    { label: 'HRMS Forgot Password', query: 'HRMS mein password reset kaise kare?' },
    { label: 'HR Contact Needed for Manager Change?', query: 'Kya reporting manager change ke liye HR se contact karna padega?' },
    { label: 'HR Contact Needed for Applying Leave?', query: 'Kya leave apply karne ke liye HR ko contact karna padega?' },
    { label: 'Job Referral Portal Link', query: 'Employee job referral candidate kaise submit kare?' },
    { label: 'HR Contact Email', query: 'HR communication email id kya hai?' },
    { label: 'Out-of-Scope Test (Cricket)', query: 'Who won yesterday\'s cricket match?' },
  ];

  return (
    <div className="bg-[#080808] border border-white/10 rounded-3xl p-5 shadow-2xl">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#F27D26]" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
          Suggested Conversation Topics
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            disabled={isDisabled}
            onClick={() => onSelectPrompt(p.query)}
            className={`inline-flex items-center text-xs px-3.5 py-2 rounded-full font-medium transition border text-left ${
              p.label.includes('Out-of-Scope')
                ? 'bg-rose-950/40 text-rose-300 border-rose-800/60 hover:bg-rose-900/50'
                : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:border-[#F27D26]/40 hover:text-[#FFB347]'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
          >
            <span>{p.label}</span>
            <ArrowUpRight className="w-3 h-3 ml-1.5 shrink-0 opacity-70" />
          </button>
        ))}
      </div>
    </div>
  );
};
