import { Loader2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function fmt(t: number) {
  if (!isFinite(t) || isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export interface EmbeddedAudioPlayerProps {
  src: string;
  title: string;
  /** Shown until metadata loads (e.g. "17:20"). */
  fallbackDuration?: string;
  /** Optional caption shown under the title (e.g. lesson context). */
  caption?: string;
  /** Autoplay when source changes. Defaults to false. */
  autoPlay?: boolean;
  /** Fires when playback finishes naturally. */
  onEnded?: () => void;
  className?: string;
}

/**
 * Shared audio lesson player. Provides a single consistent control surface
 * (play/pause, seek, progress, duration, skip-back, mute) for any audio
 * lesson across the Learning Center. Drop in with a `src` + `title`.
 */
export function EmbeddedAudioPlayer({
  src,
  title,
  fallbackDuration,
  caption,
  autoPlay = false,
  onEnded,
  className,
}: EmbeddedAudioPlayerProps) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset state whenever the source changes so the component is safely reusable.
  useEffect(() => {
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
    setLoading(true);
    setError(null);
  }, [src]);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => {
      setDuration(a.duration);
      setLoading(false);
    };
    const onCanPlay = () => setLoading(false);
    const onWaiting = () => setLoading(true);
    const onPlaying = () => {
      setLoading(false);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      onEnded?.();
    };
    const onErr = () => {
      setError("This audio could not be loaded. Please try again later.");
      setLoading(false);
      setPlaying(false);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("canplay", onCanPlay);
    a.addEventListener("waiting", onWaiting);
    a.addEventListener("playing", onPlaying);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("canplay", onCanPlay);
      a.removeEventListener("waiting", onWaiting);
      a.removeEventListener("playing", onPlaying);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, [onEnded]);

  useEffect(() => {
    if (!autoPlay) return;
    const a = ref.current;
    if (!a) return;
    void a.play().catch(() => {/* autoplay can be blocked; ignore */});
  }, [autoPlay, src]);

  const toggle = () => {
    const a = ref.current;
    if (!a || error) return;
    if (playing) a.pause();
    else void a.play().catch(() => setError("Playback was blocked. Tap play again."));
  };

  const skipBack = () => {
    const a = ref.current;
    if (!a) return;
    a.currentTime = Math.max(0, a.currentTime - 15);
    setCurrent(a.currentTime);
  };

  const toggleMute = () => {
    const a = ref.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = ref.current;
    if (!a || !duration) return;
    const v = Number(e.target.value);
    a.currentTime = (v / 100) * duration;
    setCurrent(a.currentTime);
  };

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      className={`rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5 ${className ?? ""}`}
      role="group"
      aria-label={`Audio player: ${title}`}
    >
      <audio ref={ref} src={src} preload="metadata" />
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          disabled={!!error}
          aria-label={playing ? "Pause" : "Play"}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading && !error ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 translate-x-0.5" />
          )}
        </button>

        <button
          onClick={skipBack}
          aria-label="Skip back 15 seconds"
          className="hidden h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary sm:grid"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{title}</p>
          {caption && <p className="truncate text-xs text-muted-foreground">{caption}</p>}
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>{fmt(current)}</span>
            <span>{duration > 0 ? fmt(duration) : fallbackDuration ?? "—"}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={pct}
            onChange={seek}
            aria-label="Seek"
            className="mt-2 w-full accent-[hsl(var(--primary))]"
          />
        </div>

        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="hidden h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary sm:grid"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
