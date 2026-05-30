/**
 * DaySwitcher — Horizontal scrollable day tabs
 * Design: Topographic Narrative — minimal tabs with terrain accent on active
 */
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { tripData } from "@/data/trip";

interface DaySwitcherProps {
  currentDayIndex: number;
  onDayChange: (index: number) => void;
}

export default function DaySwitcher({ currentDayIndex, onDayChange }: DaySwitcherProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const activeTab = scrollRef.current.children[currentDayIndex] as HTMLElement;
      if (activeTab) {
        const container = scrollRef.current;
        const scrollLeft = activeTab.offsetLeft - container.offsetWidth / 2 + activeTab.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [currentDayIndex]);

  return (
    <div className="bg-[oklch(0.13_0.015_250)] border-b border-border/30 sticky top-0 z-40">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-0 px-2 py-1.5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {tripData.days.map((day, idx) => {
          const isActive = idx === currentDayIndex;
          const dayNum = idx + 1;

          return (
            <button
              key={day.id}
              onClick={() => onDayChange(idx)}
              className={`relative flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px] ${
                isActive
                  ? "bg-terrain-active/10"
                  : "hover:bg-accent/30 active:bg-accent/50"
              }`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className={`text-[9px] font-[var(--font-mono)] uppercase tracking-wider ${
                    isActive ? "text-terrain-active" : "text-muted-foreground/60"
                  }`}
                >
                  D{dayNum}
                </span>
                <span
                  className={`text-[11px] font-[var(--font-display)] whitespace-nowrap leading-tight ${
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground/80"
                  }`}
                >
                  {day.headline}
                </span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeDayTab"
                  className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-terrain-active rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
