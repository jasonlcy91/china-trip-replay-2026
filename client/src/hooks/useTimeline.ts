import { useState, useCallback, useRef, useEffect } from "react";
import { tripData } from "@/data/trip";

export function useTimeline() {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentDay = tripData.days[currentDayIndex];
  const currentMoment = currentDay.moments[currentMomentIndex];
  const totalMoments = currentDay.moments.length;

  const goToDay = useCallback((dayIndex: number) => {
    setCurrentDayIndex(dayIndex);
    setCurrentMomentIndex(0);
    setIsAutoPlay(false);
  }, []);

  const goToMoment = useCallback((momentIndex: number) => {
    setCurrentMomentIndex(momentIndex);
  }, []);

  const nextMoment = useCallback(() => {
    setCurrentMomentIndex((prev) => {
      if (prev < totalMoments - 1) return prev + 1;
      return prev;
    });
  }, [totalMoments]);

  const prevMoment = useCallback(() => {
    setCurrentMomentIndex((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay((prev) => !prev);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentMomentIndex((prev) => {
          if (prev < totalMoments - 1) return prev + 1;
          setIsAutoPlay(false);
          return prev;
        });
      }, 3000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, totalMoments]);

  return {
    // State
    currentDayIndex,
    currentMomentIndex,
    isAutoPlay,
    // Derived
    currentDay,
    currentMoment,
    totalMoments,
    totalDays: tripData.days.length,
    trip: tripData,
    // Actions
    goToDay,
    goToMoment,
    nextMoment,
    prevMoment,
    toggleAutoPlay,
  };
}
