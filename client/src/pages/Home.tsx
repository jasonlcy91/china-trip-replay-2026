/**
 * Home — Main Journey Replay page
 * Design: Topographic Narrative
 * 
 * Features:
 * - Splash intro animation
 * - Day switcher tabs
 * - Map/List view toggle
 * - Swipe gestures on map
 * - Keyboard navigation (arrows, space)
 * - Auto-play timeline
 */
import { useTimeline } from "@/hooks/useTimeline";
import { useKeyboard } from "@/hooks/useKeyboard";
import DaySwitcher from "@/components/DaySwitcher";
import TripHeader from "@/components/TripHeader";
import MapStoryPanel from "@/components/MapStoryPanel";
import MediaPanel from "@/components/MediaPanel";
import ProgressPanel from "@/components/ProgressPanel";
import TimelineSlider from "@/components/TimelineSlider";
import SplashOverlay from "@/components/SplashOverlay";
import { useState, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { List, Map, Compass } from "lucide-react";

export default function Home() {
  const {
    currentDayIndex,
    currentMomentIndex,
    isAutoPlay,
    currentDay,
    currentMoment,
    totalDays,
    goToDay,
    goToMoment,
    nextMoment,
    prevMoment,
    toggleAutoPlay,
    trip,
  } = useTimeline();

  const [view, setView] = useState<"map" | "progress">("map");
  const [showSplash, setShowSplash] = useState(true);

  // Keyboard navigation
  const handlePrevDay = useCallback(() => {
    if (currentDayIndex > 0) goToDay(currentDayIndex - 1);
  }, [currentDayIndex, goToDay]);

  const handleNextDay = useCallback(() => {
    if (currentDayIndex < totalDays - 1) goToDay(currentDayIndex + 1);
  }, [currentDayIndex, totalDays, goToDay]);

  useKeyboard({
    onPrev: prevMoment,
    onNext: nextMoment,
    onPrevDay: handlePrevDay,
    onNextDay: handleNextDay,
    onTogglePlay: toggleAutoPlay,
  });

  // Swipe handling for map
  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      if (info.offset.x < -60 && Math.abs(info.offset.y) < 40) {
        nextMoment();
      } else if (info.offset.x > 60 && Math.abs(info.offset.y) < 40) {
        prevMoment();
      }
    },
    [nextMoment, prevMoment]
  );

  return (
    <>
      {/* Splash intro */}
      {showSplash && <SplashOverlay onComplete={() => setShowSplash(false)} />}

      <div className="h-[100dvh] flex flex-col bg-background max-w-[480px] mx-auto relative overflow-hidden grain-overlay">
        {/* Day Switcher — sticky top */}
        <DaySwitcher currentDayIndex={currentDayIndex} onDayChange={goToDay} />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ paddingBottom: "140px" }}>
          {/* Header */}
          <TripHeader day={currentDay} />

          {/* View Toggle + Trip label */}
          <div className="flex items-center gap-1.5 px-5 mb-3">
            <button
              onClick={() => setView("map")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-[var(--font-mono)] transition-all duration-200 active:scale-95 ${
                view === "map"
                  ? "bg-terrain-active/12 text-terrain-active border border-terrain-active/20"
                  : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-accent/30"
              }`}
            >
              <Map className="w-3 h-3" />
              Map
            </button>
            <button
              onClick={() => setView("progress")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-[var(--font-mono)] transition-all duration-200 active:scale-95 ${
                view === "progress"
                  ? "bg-terrain-active/12 text-terrain-active border border-terrain-active/20"
                  : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-accent/30"
              }`}
            >
              <List className="w-3 h-3" />
              List
            </button>

            <div className="ml-auto flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-muted-foreground/30" />
              <span className="text-[9px] font-[var(--font-mono)] text-muted-foreground/40 uppercase tracking-[0.15em]">
                {trip.destination}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {view === "map" ? (
              <motion.div
                key={`map-${currentDay.id}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="px-4"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={handleDragEnd}
                style={{ touchAction: "pan-y" }}
              >
                <MapStoryPanel
                  day={currentDay}
                  currentMomentIndex={currentMomentIndex}
                  currentMoment={currentMoment}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`progress-${currentDay.id}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <ProgressPanel
                  day={currentDay}
                  currentMomentIndex={currentMomentIndex}
                  onMomentSelect={goToMoment}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Media Panel — always visible below */}
          <MediaPanel moment={currentMoment} />
        </div>

        {/* Fixed Bottom Timeline */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-50">
          <TimelineSlider
            day={currentDay}
            currentMomentIndex={currentMomentIndex}
            isAutoPlay={isAutoPlay}
            onMomentChange={goToMoment}
            onToggleAutoPlay={toggleAutoPlay}
            onPrev={prevMoment}
            onNext={nextMoment}
          />
        </div>
      </div>
    </>
  );
}
