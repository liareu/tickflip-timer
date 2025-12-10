import { useEffect } from 'react';

export interface KeyboardShortcutHandlers {
  onStartPause?: () => void;
  onReset?: () => void;
  onPreset1?: () => void;
  onPreset2?: () => void;
  onPreset3?: () => void;
  onPreset4?: () => void;
}

/**
 * Hook for global keyboard shortcuts
 * - Space: Start/Pause timer
 * - R: Reset timer
 * - 1-4: Preset buttons
 */
export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Space: Start/Pause
      if (e.code === 'Space') {
        e.preventDefault();
        handlers.onStartPause?.();
      }

      // R: Reset
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handlers.onReset?.();
      }

      // 1-4: Presets
      if (e.key === '1') {
        e.preventDefault();
        handlers.onPreset1?.();
      }
      if (e.key === '2') {
        e.preventDefault();
        handlers.onPreset2?.();
      }
      if (e.key === '3') {
        e.preventDefault();
        handlers.onPreset3?.();
      }
      if (e.key === '4') {
        e.preventDefault();
        handlers.onPreset4?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
