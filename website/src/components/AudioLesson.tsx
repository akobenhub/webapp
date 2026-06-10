import { Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

export function AudioLesson({ title, duration }: { title: string; duration: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<number | null>(null);

  // Simulated playback — replace with a real <audio> source when available.
  const toggle = () => {
    if (playing) {
      if (ref.current) window.clearInterval(ref.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    ref.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (ref.current) window.clearInterval(ref.current);
          setPlaying(false);
          return 0;
        }
        return p + 1.5;
      });
    }, 120);
  };

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft">
      <button
        onClick={toggle}
        aria-label={playing ? "Pause audio lesson" : "Play audio lesson"}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{title}</p>
          <span className="shrink-0 text-xs text-muted-foreground">{duration}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-warmth transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <Volume2 className="h-4 w-4 text-muted-foreground" aria-hidden />
    </div>
  );
}
