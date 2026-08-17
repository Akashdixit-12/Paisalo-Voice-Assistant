import React from 'react';
import { CallStatus } from '../types';

interface HeaderProps {
  callStatus: CallStatus;
}

export const Header: React.FC<HeaderProps> = ({ callStatus }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-red-500/25">
            P
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              PAISALO DIGITAL
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              AI Voice Assistant
            </p>
          </div>
        </div>

        {/* Minimal Live Status Badge */}
        {callStatus !== 'disconnected' && (
          <div className="flex items-center space-x-2 bg-red-50 border border-red-200/80 px-3 py-1 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs text-red-700 font-mono uppercase tracking-wider font-semibold">
              {callStatus}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

