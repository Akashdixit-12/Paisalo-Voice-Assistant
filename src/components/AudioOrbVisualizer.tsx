import React from 'react';
import { Mic, MicOff, Radio, Phone, PhoneOff, AlertTriangle, Sparkles } from 'lucide-react';
import { CallStatus } from '../types';

interface AudioOrbVisualizerProps {
  callStatus: CallStatus;
  activeSpeaker: 'none' | 'user' | 'assistant';
  durationSeconds: number;
  isMuted: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  errorMessage?: string;
}

export const AudioOrbVisualizer: React.FC<AudioOrbVisualizerProps> = ({
  callStatus,
  activeSpeaker,
  durationSeconds,
  isMuted,
  onStartCall,
  onEndCall,
  onToggleMute,
  errorMessage,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isCallActive = callStatus === 'connected' || callStatus === 'speaking' || callStatus === 'listening' || callStatus === 'interrupted';

  return (
    <div className="relative w-full rounded-3xl bg-white p-8 sm:p-12 text-slate-900 shadow-xl border border-slate-200/80 flex flex-col items-center justify-between min-h-[460px] text-center">
      
      {/* Background Radial Ambient Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[radial-gradient(circle,rgba(239,68,68,0.08)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[radial-gradient(circle,rgba(225,29,72,0.06)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      {/* Top Bar inside Visualizer */}
      <div className="w-full flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            AI VOICE ASSISTANT
          </span>
        </div>

        {/* Live Call Duration */}
        {isCallActive && (
          <div className="px-3.5 py-1.5 rounded-full border border-red-200 bg-red-50 text-xs font-mono tracking-wider text-red-700 font-semibold">
            LIVE • {formatTime(durationSeconds)}
          </div>
        )}
      </div>

      {/* Center Artistic Concentric Rings & Glow Sphere */}
      <div className="my-6 flex flex-col items-center justify-center relative z-10 w-full">
        
        {/* Concentric Circles Container */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          
          {/* Outer Ring 1 */}
          <div className="absolute inset-0 border border-slate-200 rounded-full pointer-events-none" />
          
          {/* Middle Ring 2 */}
          <div className="absolute inset-4 border border-slate-300/80 rounded-full pointer-events-none" />
          
          {/* Inner Ring 3 */}
          <div className={`absolute inset-8 border rounded-full transition-colors duration-500 pointer-events-none ${
            callStatus === 'speaking' ? 'border-red-500/50 animate-pulse' : 'border-slate-300'
          }`} />

          {/* Active Speaking Ping Layer */}
          {callStatus === 'speaking' && (
            <div className="absolute inset-10 rounded-full bg-red-500/10 animate-ping duration-1000 pointer-events-none" />
          )}

          {/* Core Sphere */}
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl relative z-10 ${
              callStatus === 'speaking'
                ? 'bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 shadow-[0_0_50px_rgba(225,29,72,0.4)] scale-105'
                : callStatus === 'listening'
                ? 'bg-red-50 border border-red-300 shadow-[0_0_40px_rgba(239,68,68,0.2)]'
                : callStatus === 'interrupted'
                ? 'bg-gradient-to-tr from-amber-500 to-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.3)]'
                : callStatus === 'connecting'
                ? 'bg-slate-100 border border-sky-400/60 animate-pulse'
                : 'bg-gradient-to-br from-red-600 to-rose-600 border border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.3)]'
            }`}
          >
            {callStatus === 'speaking' ? (
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-7 bg-white rounded-full animate-bounce [animation-delay:-0.4s]" />
                <span className="w-1.5 h-10 bg-white rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1.5 h-8 bg-white rounded-full animate-bounce" />
                <span className="w-1.5 h-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            ) : callStatus === 'listening' ? (
              <div className="flex flex-col items-center text-red-600">
                <Mic className={`w-8 h-8 ${isMuted ? 'text-rose-600' : 'text-red-600 animate-pulse'}`} />
              </div>
            ) : callStatus === 'interrupted' ? (
              <Sparkles className="w-8 h-8 text-slate-950 animate-spin duration-1000" />
            ) : callStatus === 'connecting' ? (
              <Radio className="w-8 h-8 text-sky-600 animate-spin" />
            ) : (
              <Phone className="w-8 h-8 text-white" />
            )}
          </div>

        </div>

        {/* Status Typography */}
        <div className="mt-6 text-center max-w-md">
          {callStatus === 'speaking' && (
            <>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
                Assistant Speaking...
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-red-600 mt-2">
                Speak anytime to interrupt
              </p>
            </>
          )}

          {callStatus === 'listening' && (
            <>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
                {isMuted ? 'Microphone Muted' : 'Listening to you...'}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-red-600 mt-2">
                Continuous Conversation Active
              </p>
            </>
          )}

          {callStatus === 'interrupted' && (
            <>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-amber-700">
                Yielded to your speech...
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-600 mt-2">
                Processing question
              </p>
            </>
          )}

          {callStatus === 'connecting' && (
            <>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-sky-700">
                Connecting...
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-sky-600 mt-2">
                Initializing Voice Session
              </p>
            </>
          )}

          {callStatus === 'disconnected' && (
            <>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
                Ready to speak
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-red-600 mt-2">
                Tap Begin Call to speak
              </p>
            </>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 text-left">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

      </div>

      {/* Call Action Buttons */}
      <div className="pt-4 flex items-center justify-center space-x-4 relative z-10 w-full">
        {!isCallActive ? (
          <button
            onClick={onStartCall}
            id="btn-start-voice-call"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-95 text-white font-bold text-base shadow-xl shadow-red-600/30 transition-all flex items-center space-x-3 cursor-pointer"
          >
            <Phone className="w-5 h-5 fill-white" />
            <span>Begin Call</span>
          </button>
        ) : (
          <>
            {/* Mute Button */}
            <button
              onClick={onToggleMute}
              id="btn-toggle-mute"
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isMuted
                  ? 'bg-rose-100 border-rose-300 text-rose-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* End Call Button */}
            <button
              onClick={onEndCall}
              id="btn-end-voice-call"
              className="px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-base flex items-center space-x-2 shadow-xl shadow-slate-900/20 transition-all cursor-pointer"
              title="End Call"
            >
              <PhoneOff className="w-5 h-5" />
              <span>End Call</span>
            </button>
          </>
        )}
      </div>

    </div>
  );
};

