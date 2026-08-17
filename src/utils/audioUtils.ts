export function pcmFloat32ToBase64PCM16(float32Array: Float32Array): string {
  const pcm16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  let binary = "";
  const bytes = new Uint8Array(pcm16.buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64PCM16ToAudioBuffer(
  audioCtx: AudioContext,
  base64Data: string,
  sampleRate: number = 24000
): AudioBuffer {
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const int16Array = new Int16Array(bytes.buffer);
  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 32768.0;
  }
  const buffer = audioCtx.createBuffer(1, float32Array.length, sampleRate);
  buffer.getChannelData(0).set(float32Array);
  return buffer;
}

export class AudioQueuePlayer {
  private audioCtx: AudioContext | null = null;
  private nextStartTime: number = 0;
  private activeSourceNodes: AudioBufferSourceNode[] = [];
  public isPlaying: boolean = false;

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtxClass({ sampleRate: 24000 });
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public enqueueChunk(base64Data: string, onPlayStateChange?: (playing: boolean) => void) {
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const buffer = base64PCM16ToAudioBuffer(this.audioCtx, base64Data, 24000);
      const source = this.audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioCtx.destination);

      const currentTime = this.audioCtx.currentTime;
      const startAt = Math.max(currentTime, this.nextStartTime);
      source.start(startAt);
      this.nextStartTime = startAt + buffer.duration;
      this.activeSourceNodes.push(source);
      
      this.isPlaying = true;
      if (onPlayStateChange) onPlayStateChange(true);

      source.onended = () => {
        const idx = this.activeSourceNodes.indexOf(source);
        if (idx !== -1) {
          this.activeSourceNodes.splice(idx, 1);
        }
        if (this.activeSourceNodes.length === 0) {
          this.isPlaying = false;
          if (onPlayStateChange) onPlayStateChange(false);
        }
      };
    } catch (e) {
      console.error("Error decoding or scheduling audio chunk:", e);
    }
  }

  public stopAndClear(onPlayStateChange?: (playing: boolean) => void) {
    for (const source of this.activeSourceNodes) {
      try {
        source.stop(0);
        source.disconnect();
      } catch (e) {
        // Source already ended or stopped
      }
    }
    this.activeSourceNodes = [];
    if (this.audioCtx) {
      this.nextStartTime = this.audioCtx.currentTime;
    } else {
      this.nextStartTime = 0;
    }
    this.isPlaying = false;
    if (onPlayStateChange) onPlayStateChange(false);
  }

  public close() {
    this.stopAndClear();
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}
