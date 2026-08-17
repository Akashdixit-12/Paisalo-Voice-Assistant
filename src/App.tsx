import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { AudioOrbVisualizer } from './components/AudioOrbVisualizer';
import { CallStatus, ChatTranscriptMessage } from './types';
import { pcmFloat32ToBase64PCM16, AudioQueuePlayer } from './utils/audioUtils';

export default function App() {
  const [callStatus, setCallStatus] = useState<CallStatus>('disconnected');
  const [activeSpeaker, setActiveSpeaker] = useState<'none' | 'user' | 'assistant'>('none');
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<ChatTranscriptMessage[]>([]);

  // Audio & WebSocket Refs
  const wsRef = useRef<WebSocket | null>(null);
  const audioPlayerRef = useRef<AudioQueuePlayer | null>(null);
  const micAudioCtxRef = useRef<AudioContext | null>(null);
  const micProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const isMutedRef = useRef<boolean>(false);

  // Sync mute ref
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (callStatus === 'connected' || callStatus === 'speaking' || callStatus === 'listening' || callStatus === 'interrupted') {
      if (!timerIntervalRef.current) {
        timerIntervalRef.current = setInterval(() => {
          setDurationSeconds(prev => prev + 1);
        }, 1000);
      }
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      setDurationSeconds(0);
    }
  }, [callStatus]);

  // Helper to add transcript entry (internal)
  const addTranscriptMessage = useCallback((sender: 'user' | 'assistant' | 'system', text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last && last.sender === sender && last.isPartial) {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...last,
          text: last.text + text,
          timestamp: timeStr,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          sender,
          text,
          timestamp: timeStr,
        },
      ];
    });
  }, []);

  // Start Voice Call
  const startCall = async () => {
    setErrorMessage(undefined);
    setCallStatus('connecting');

    try {
      if (!audioPlayerRef.current) {
        audioPlayerRef.current = new AudioQueuePlayer();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      micStreamRef.current = stream;

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to Paisalo Voice Server WebSocket');
        setCallStatus('listening');
        setActiveSpeaker('none');
        addTranscriptMessage('system', 'Call connected.');

        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        const micCtx = new AudioCtxClass({ sampleRate: 16000 });
        micAudioCtxRef.current = micCtx;

        const source = micCtx.createMediaStreamSource(stream);
        const processor = micCtx.createScriptProcessor(4096, 1, 1);
        micProcessorRef.current = processor;

        source.connect(processor);
        processor.connect(micCtx.destination);

        processor.onaudioprocess = (e) => {
          if (isMutedRef.current) return;
          if (ws.readyState !== WebSocket.OPEN) return;

          const float32Data = e.inputBuffer.getChannelData(0);
          
          let sum = 0;
          for (let i = 0; i < float32Data.length; i++) {
            sum += float32Data[i] * float32Data[i];
          }
          const rms = Math.sqrt(sum / float32Data.length);
          if (rms > 0.02) {
            setActiveSpeaker('user');
          }

          const base64Pcm = pcmFloat32ToBase64PCM16(float32Data);
          ws.send(JSON.stringify({ type: 'audio', audio: base64Pcm }));
        };
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'status') {
            if (data.status === 'connected') {
              setCallStatus('listening');
            } else if (data.status === 'disconnected') {
              endCall();
            }
          }

          if (data.type === 'error') {
            console.error('Server error:', data.error);
            setErrorMessage(data.error);
            setCallStatus('error');
          }

          if (data.type === 'audio' && data.audio) {
            setCallStatus('speaking');
            setActiveSpeaker('assistant');
            if (audioPlayerRef.current) {
              audioPlayerRef.current.enqueueChunk(data.audio, (playing) => {
                if (!playing) {
                  setCallStatus('listening');
                  setActiveSpeaker('none');
                }
              });
            }
          }

          if (data.type === 'interrupted') {
            setCallStatus('interrupted');
            setActiveSpeaker('user');
            if (audioPlayerRef.current) {
              audioPlayerRef.current.stopAndClear(() => {
                setCallStatus('listening');
              });
            }
          }

          if (data.type === 'assistantText' && data.assistantText) {
            addTranscriptMessage('assistant', data.assistantText);
          }

          if (data.type === 'userText' && data.userText) {
            addTranscriptMessage('user', data.userText);
          }
        } catch (e) {
          console.error('Error parsing WebSocket message:', e);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        setErrorMessage('Connection failed.');
        setCallStatus('error');
      };

      ws.onclose = () => {
        setCallStatus('disconnected');
        setActiveSpeaker('none');
      };

    } catch (err: any) {
      console.error('Failed to start call:', err);
      let msg = err.message || 'Could not access microphone.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Microphone permission was denied. Please allow microphone access.';
      }
      setErrorMessage(msg);
      setCallStatus('error');
    }
  };

  // End Voice Call
  const endCall = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (micProcessorRef.current) {
      micProcessorRef.current.disconnect();
      micProcessorRef.current = null;
    }
    if (micAudioCtxRef.current) {
      micAudioCtxRef.current.close().catch(() => {});
      micAudioCtxRef.current = null;
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.close();
      audioPlayerRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setCallStatus('disconnected');
    setActiveSpeaker('none');
    addTranscriptMessage('system', 'Call ended.');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Ambient Blur Flares */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,68,68,0.06)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(225,29,72,0.05)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      {/* Header */}
      <Header callStatus={callStatus} />

      {/* Main Container - Centered Voice Box */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12 flex items-center justify-center relative z-10">
        <AudioOrbVisualizer
          callStatus={callStatus}
          activeSpeaker={activeSpeaker}
          durationSeconds={durationSeconds}
          isMuted={isMuted}
          onStartCall={startCall}
          onEndCall={endCall}
          onToggleMute={() => setIsMuted(prev => !prev)}
          errorMessage={errorMessage}
        />
      </main>

    </div>
  );
}
