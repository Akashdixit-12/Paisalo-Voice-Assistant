export interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  details: string[];
  keywords: string[];
}

export interface ChatTranscriptMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isPartial?: boolean;
}

export type CallStatus = 'disconnected' | 'connecting' | 'connected' | 'speaking' | 'listening' | 'interrupted' | 'error';

export interface CallState {
  status: CallStatus;
  durationSeconds: number;
  isMuted: boolean;
  errorMessage?: string;
  activeSpeaker: 'none' | 'user' | 'assistant';
}

export interface WebSocketMessage {
  type?: string;
  audio?: string;
  userText?: string;
  assistantText?: string;
  interrupted?: boolean;
  status?: string;
  error?: string;
}
