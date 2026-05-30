/**
 * SplashOverlay — Intro animation that plays on first load
 * Design: Topographic Narrative — coordinates fade in, title reveals, then dissolves
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface SplashOverlayProps {
  onComplete: () => void;
}

export default function SplashOverlay({ onComplete }: SplashOverlayProps) {
  const [phase, setPhase] = useState<"coords" | "title" | "exit">("coords");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("title"), 800);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(() => onComplete(), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Coordinate labels */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[10px] font-[var(--font-mono)] text-muted-foreground tracking-[0.3em] uppercase mb-4"
          >
            30.2°N · 120.1°E
          </motion.div>

          {/* Map pin */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mb-4"
          >
            <MapPin className="w-6 h-6 text-terrain-active" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase === "title" ? 1 : 0, y: phase === "title" ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-[28px] font-[var(--font-display)] font-bold text-foreground tracking-tight"
          >
            Journey Replay
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "title" ? 0.6 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[13px] text-muted-foreground mt-1 font-[var(--font-mono)]"
          >
            江南 · June 2026
          </motion.p>

          {/* Contour line decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-[30%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-terrain-active/30 to-transparent"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
