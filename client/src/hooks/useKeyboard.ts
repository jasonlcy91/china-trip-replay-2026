/**
 * useKeyboard — Keyboard shortcuts for timeline navigation
 * Arrow Left/Right: prev/next moment
 * Arrow Up/Down: prev/next day
 * Space: toggle auto-play
 */
import { useEffect } from "react";

interface KeyboardOptions {
  onPrev: () => void;
  onNext: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onTogglePlay: () => void;
}

export function useKeyboard({
  onPrev,
  onNext,
  onPrevDay,
  onNextDay,
  onTogglePlay,
}: KeyboardOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture if user is in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "ArrowUp":
          e.preventDefault();
          onPrevDay();
          break;
        case "ArrowDown":
          e.preventDefault();
          onNextDay();
          break;
        case " ":
          e.preventDefault();
          onTogglePlay();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext, onPrevDay, onNextDay, onTogglePlay]);
}
