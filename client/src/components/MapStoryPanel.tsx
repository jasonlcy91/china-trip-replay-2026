/**
 * MapStoryPanel — Static map with animated POI markers and route lines
 * Design: Topographic Narrative — dark map canvas, terrain-colored markers,
 * contour-line route segments, pulsing active pin
 */
import { motion, AnimatePresence } from "framer-motion";
import type { Day, Moment } from "@/data/trip";

interface MapStoryPanelProps {
  day: Day;
  currentMomentIndex: number;
  currentMoment: Moment;
}

const CATEGORY_COLORS: Record<string, string> = {
  nature: "#4d8c3c",
  food: "#c88a30",
  water: "#4a8fd4",
  history: "#8090a0",
  transport: "#6b7b8b",
  accommodation: "#b08840",
};

export default function MapStoryPanel({
  day,
  currentMomentIndex,
  currentMoment,
}: MapStoryPanelProps) {
  const points = day.map.points;
  const activePoint = points.find((p) => p.id === currentMoment.pointId);

  // Build route from moment order (deduplicated points)
  const routePoints = day.moments.map((m) => {
    const pt = points.find((p) => p.id === m.pointId);
    return pt ? { x: pt.x, y: pt.y, id: pt.id } : null;
  }).filter(Boolean) as { x: number; y: number; id: string }[];

  return (
    <div className="relative w-full aspect-[4/3] bg-[oklch(0.12_0.015_250)] rounded-xl overflow-hidden border border-border/40 shadow-lg shadow-black/20">
      {/* Topographic grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, oklch(0.4 0.1 240) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, oklch(0.4 0.1 145) 0%, transparent 40%),
            linear-gradient(oklch(0.4 0.02 250) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.4 0.02 250) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 24px 24px, 24px 24px",
        }}
      />

      {/* Hero image as atmospheric background */}
      <img
        src={day.heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[1px]"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.015_250)]/70 via-transparent to-[oklch(0.12_0.015_250)]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.015_250)]/30 to-transparent" />

      {/* Route lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a8fd4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4a8fd4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {routePoints.map((pt, i) => {
          if (i === 0) return null;
          const prev = routePoints[i - 1];
          const isPast = i <= currentMomentIndex;
          const isCurrent = i === currentMomentIndex;
          return (
            <motion.line
              key={`route-${day.id}-${i}`}
              x1={prev.x * 100}
              y1={prev.y * 100}
              x2={pt.x * 100}
              y2={pt.y * 100}
              stroke={
                isCurrent
                  ? "#6bb8ff"
                  : isPast
                  ? "#4a8fd4"
                  : "#3a4a5a"
              }
              strokeWidth={isCurrent ? "0.5" : "0.3"}
              strokeOpacity={isCurrent ? 1 : isPast ? 0.7 : 0.3}
              strokeDasharray={isPast || isCurrent ? "none" : "1.5 1.5"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          );
        })}
      </svg>

      {/* POI markers */}
      {points.map((point) => {
        const momentIdx = day.moments.findIndex((m) => m.pointId === point.id);
        const isPast = momentIdx < currentMomentIndex && momentIdx !== -1;
        const isCurrent = point.id === currentMoment.pointId;
        const isFuture = momentIdx > currentMomentIndex || momentIdx === -1;
        const category = isCurrent ? currentMoment.category : (point.type || "history");

        return (
          <motion.div
            key={point.id}
            className="absolute"
            style={{
              left: `${point.x * 100}%`,
              top: `${point.y * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: isCurrent ? 1 : isPast ? 0.85 : 0.7,
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Pulse ring for active */}
            {isCurrent && (
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  left: -8,
                  top: -8,
                  backgroundColor: CATEGORY_COLORS[category],
                }}
                animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* Pin */}
            <div
              className="rounded-full border-2"
              style={{
                width: isCurrent ? 14 : isPast ? 9 : 7,
                height: isCurrent ? 14 : isPast ? 9 : 7,
                backgroundColor: isCurrent
                  ? CATEGORY_COLORS[category]
                  : isPast
                  ? "#5a7a9a"
                  : "#3a4a5a",
                borderColor: isCurrent ? "#ffffff30" : "#00000040",
                boxShadow: isCurrent ? `0 0 12px ${CATEGORY_COLORS[category]}60` : "none",
              }}
            />

            {/* Label */}
            {isCurrent && (
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <span
                  className="text-[10px] font-[var(--font-mono)] font-medium px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm"
                  style={{ color: CATEGORY_COLORS[category] }}
                >
                  {point.label}
                </span>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Bottom info bar */}
      <AnimatePresence mode="wait">
        {activePoint && (
          <motion.div
            key={`info-${activePoint.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.12_0.015_250)] via-[oklch(0.12_0.015_250)]/90 to-transparent pt-8 pb-3 px-4"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: CATEGORY_COLORS[currentMoment.category] }}
              />
              <span className="text-[13px] font-[var(--font-display)] font-medium text-foreground">
                {activePoint.label}
              </span>
              <span className="text-[10px] font-[var(--font-mono)] text-muted-foreground ml-auto">
                {currentMoment.timeLabel}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner coordinates decoration */}
      <div className="absolute top-2.5 right-3 text-[9px] font-[var(--font-mono)] text-muted-foreground/30">
        {day.date}
      </div>
      <div className="absolute top-2.5 left-3 text-[9px] font-[var(--font-mono)] text-muted-foreground/30">
        {currentMomentIndex + 1}/{day.moments.length}
      </div>
    </div>
  );
}
