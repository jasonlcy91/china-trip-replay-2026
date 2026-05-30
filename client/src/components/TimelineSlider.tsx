/**
 * TimelineSlider — The primary interaction control at the bottom
 * Design: Topographic Narrative — contour-line track, terrain-colored progress
 * Touch-friendly with large hit areas
 */
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import type { Day } from "@/data/trip";

interface TimelineSliderProps {
  day: Day;
  currentMomentIndex: number;
  isAutoPlay: boolean;
  onMomentChange: (index: number) => void;
  onToggleAutoPlay: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function TimelineSlider({
  day,
  currentMomentIndex,
  isAutoPlay,
  onMomentChange,
  onToggleAutoPlay,
  onPrev,
  onNext,
}: TimelineSliderProps) {
  const moments = day.moments;
  const progress = moments.length > 1 ? currentMomentIndex / (moments.length - 1) : 0;

  return (
    <div className="px-4 pt-3 pb-5 bg-[oklch(0.14_0.015_250)]/95 backdrop-blur-lg border-t border-border/30">
      {/* Time labels row */}
      <div className="flex justify-between mb-2.5 px-0.5">
        {moments.length <= 8 ? (
          moments.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => onMomentChange(idx)}
              className="relative py-1 px-0.5"
            >
              <span
                className={`text-[9px] font-[var(--font-mono)] transition-all duration-300 ${
                  idx === currentMomentIndex
                    ? "text-terrain-active font-medium"
                    : idx < currentMomentIndex
                    ? "text-muted-foreground/70"
                    : "text-muted-foreground/30"
                }`}
              >
                {m.timeLabel}
              </span>
            </button>
          ))
        ) : (
          // Show fewer labels for days with many moments
          <>
            <span className="text-[9px] font-[var(--font-mono)] text-muted-foreground/50">
              {moments[0].timeLabel}
            </span>
            <span className="text-[9px] font-[var(--font-mono)] text-terrain-active font-medium">
              {moments[currentMomentIndex].timeLabel}
            </span>
            <span className="text-[9px] font-[var(--font-mono)] text-muted-foreground/30">
              {moments[moments.length - 1].timeLabel}
            </span>
          </>
        )}
      </div>

      {/* Track */}
      <div className="relative h-2 bg-muted/50 rounded-full mb-4 overflow-visible">
        {/* Progress fill */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, oklch(0.5 0.12 240), oklch(0.7 0.15 240))",
          }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* Dot markers */}
        {moments.map((_, idx) => {
          const pos = moments.length > 1 ? (idx / (moments.length - 1)) * 100 : 50;
          const isCurrent = idx === currentMomentIndex;
          const isPast = idx < currentMomentIndex;

          return (
            <button
              key={idx}
              onClick={() => onMomentChange(idx)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 p-1.5"
              style={{ left: `${pos}%` }}
            >
              <motion.div
                animate={{
                  width: isCurrent ? 14 : isPast ? 6 : 5,
                  height: isCurrent ? 14 : isPast ? 6 : 5,
                }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="rounded-full"
                style={{
                  backgroundColor: isCurrent
                    ? "oklch(0.75 0.18 240)"
                    : isPast
                    ? "oklch(0.55 0.12 240)"
                    : "oklch(0.35 0.02 250)",
                  border: isCurrent ? "2px solid oklch(0.14 0.015 250)" : "none",
                  boxShadow: isCurrent ? "0 0 8px oklch(0.7 0.15 240 / 0.5)" : "none",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={onPrev}
          disabled={currentMomentIndex === 0}
          className="p-2.5 rounded-full hover:bg-accent/50 transition-all duration-150 active:scale-95 disabled:opacity-20 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <button
          onClick={onToggleAutoPlay}
          className="p-3.5 rounded-full bg-terrain-active/15 hover:bg-terrain-active/25 transition-all duration-150 active:scale-95 border border-terrain-active/25"
        >
          {isAutoPlay ? (
            <Pause className="w-5 h-5 text-terrain-active" />
          ) : (
            <Play className="w-5 h-5 text-terrain-active ml-0.5" />
          )}
        </button>

        <button
          onClick={onNext}
          disabled={currentMomentIndex === moments.length - 1}
          className="p-2.5 rounded-full hover:bg-accent/50 transition-all duration-150 active:scale-95 disabled:opacity-20 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}
