/**
 * ProgressPanel — Shows full timeline progress for the day
 * Design: Topographic Narrative — vertical timeline with terrain colors
 */
import { motion } from "framer-motion";
import { Check, Utensils, MapPin, Star } from "lucide-react";
import type { Day } from "@/data/trip";

interface ProgressPanelProps {
  day: Day;
  currentMomentIndex: number;
  onMomentSelect?: (index: number) => void;
}

const CATEGORY_DOTS: Record<string, string> = {
  nature: "bg-terrain-forest",
  food: "bg-terrain-amber",
  water: "bg-terrain-water",
  history: "bg-terrain-stone",
  transport: "bg-muted-foreground",
  accommodation: "bg-terrain-amber",
};

export default function ProgressPanel({ day, currentMomentIndex, onMomentSelect }: ProgressPanelProps) {
  const moments = day.moments;

  return (
    <div className="px-5 py-3">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-[1px] bg-terrain-active/50" />
        <span className="text-[10px] font-[var(--font-mono)] text-muted-foreground uppercase tracking-widest">
          Timeline
        </span>
        <div className="flex-1 h-[1px] bg-border/30" />
        <span className="text-[10px] font-[var(--font-mono)] text-terrain-active">
          {currentMomentIndex + 1}/{moments.length}
        </span>
      </div>

      {/* Timeline items */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-border/40" />
        <div
          className="absolute left-[7px] top-2 w-[1px] bg-terrain-water/60 transition-all duration-300"
          style={{
            height: moments.length > 1
              ? `${(currentMomentIndex / (moments.length - 1)) * 100}%`
              : "0%",
          }}
        />

        <div className="space-y-1">
          {moments.map((moment, idx) => {
            const isPast = idx < currentMomentIndex;
            const isCurrent = idx === currentMomentIndex;
            const isFuture = idx > currentMomentIndex;

            return (
              <motion.button
                key={moment.id}
                onClick={() => onMomentSelect?.(idx)}
                initial={false}
                animate={{ opacity: isFuture ? 0.45 : 1 }}
                className={`w-full flex items-start gap-3 py-2 px-2 rounded-lg text-left transition-colors duration-200 ${
                  isCurrent ? "bg-accent/40" : "hover:bg-accent/20"
                }`}
              >
                {/* Status dot */}
                <div className="flex-shrink-0 mt-0.5 relative">
                  {isPast ? (
                    <div className="w-[15px] h-[15px] rounded-full bg-terrain-water/20 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-terrain-water" strokeWidth={3} />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-[15px] h-[15px] rounded-full bg-terrain-active/20 flex items-center justify-center">
                      <div className="w-[7px] h-[7px] rounded-full bg-terrain-active" />
                    </div>
                  ) : (
                    <div className="w-[15px] h-[15px] rounded-full border border-muted-foreground/30 flex items-center justify-center">
                      <div className="w-[5px] h-[5px] rounded-full bg-muted-foreground/30" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-[var(--font-mono)] text-muted-foreground">
                      {moment.timeLabel}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_DOTS[moment.category]}`} />
                  </div>
                  <p
                    className={`text-[13px] leading-tight mt-0.5 truncate ${
                      isCurrent
                        ? "font-medium text-foreground"
                        : isPast
                        ? "text-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {moment.title}
                    {moment.subtitle && (
                      <span className="text-muted-foreground/60 ml-1.5 text-[11px]">
                        {moment.subtitle}
                      </span>
                    )}
                  </p>
                </div>

                {/* Indicators */}
                <div className="flex items-center gap-1 flex-shrink-0 mt-1">
                  {moment.meal && (
                    <Utensils
                      className={`w-3 h-3 ${
                        isPast || isCurrent ? "text-terrain-amber" : "text-muted-foreground/20"
                      }`}
                    />
                  )}
                  {moment.highlight && (
                    <Star
                      className={`w-3 h-3 ${
                        isPast || isCurrent ? "text-terrain-water" : "text-muted-foreground/20"
                      }`}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
