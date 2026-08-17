import React, { useState } from 'react';
import { PAISALO_KNOWLEDGE_BASE } from '../data/paisaloKnowledge';
import { X, Search, BookOpen, ShieldCheck, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface KnowledgeBaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt?: (promptText: string) => void;
}

export const KnowledgeBaseDrawer: React.FC<KnowledgeBaseDrawerProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Company Profile', 'Loan Products', 'Co-Lending', 'Application Steps', 'EMI & Repayment', 'Support Contacts'];

  const filteredKnowledge = PAISALO_KNOWLEDGE_BASE.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-xl bg-[#080808] text-white h-full shadow-2xl flex flex-col border-l border-white/10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#F27D26] to-[#FFB347] text-slate-950">
              <BookOpen className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Paisalo Knowledge Base
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-amber-300 border border-amber-500/30">
                  Authorized Grounding
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Official financial rules, loan rates, eligibility & contacts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-white/10 space-y-3 bg-[#080808]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search loan types, eligibility, documents, SBI co-lending..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#F27D26] text-white placeholder-slate-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#F27D26] to-[#FFB347] text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Knowledge Base Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#080808]">
          {filteredKnowledge.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 transition hover:border-[#F27D26]/40"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#F27D26]/20 text-[#FFB347] border border-[#F27D26]/30">
                  {item.category}
                </span>
                
                {onSelectPrompt && (
                  <button
                    onClick={() => {
                      onSelectPrompt(`Tell me about ${item.title}`);
                      onClose();
                    }}
                    className="inline-flex items-center text-xs font-semibold text-[#FFB347] hover:underline"
                  >
                    <span>Ask Assistant</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                )}
              </div>

              <h3 className="text-sm font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 mb-3 font-medium">
                {item.summary}
              </p>

              <div className="space-y-1.5">
                {item.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] mr-2 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredKnowledge.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Info className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <p className="text-xs">No matching Paisalo knowledge topic found.</p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-white/5 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F27D26]" />
            <span>Strict Grounding Enforced: No fabricated rates or rules.</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">Paisalo KB v2.4</span>
        </div>

      </div>
    </div>
  );
};
