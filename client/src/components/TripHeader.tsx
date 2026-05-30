/**
 * TripHeader — Displays day headline, subtitle, weather, and date
 * Design: Topographic Narrative — Space Grotesk display, coordinate labels
 */
import { motion, AnimatePresence } from "framer-motion";
import type { Day } from "@/data/trip";

interface TripHeaderProps {
  day: Day;
}

export default function TripHeader({ day }: TripHeaderProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.header
        key={day.id}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="px-5 pt-4 pb-2"
      >
        {/* Metadata row */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-[var(--font-mono)] text-muted-foreground/70 tracking-wider">
            {day.date}
          </span>
          <span className="text-muted-foreground/30">·</span>
          <span className="text-[10px] font-[var(--font-mono)] text-muted-foreground/70 tracking-wider">
            {day.city}
          </span>
          <span className="ml-auto text-[11px] text-muted-foreground/60">
            {day.weather.icon} {day.weather.temperature}°C
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[30px] font-[var(--font-display)] font-bold tracking-tight leading-none text-foreground">
          {day.headline}
        </h1>

        {/* Subtitle */}
        <p className="text-[13px] text-muted-foreground/70 mt-1 font-light tracking-wide">
          {day.subtitle}
        </p>
      </motion.header>
    </AnimatePresence>
  );
}
