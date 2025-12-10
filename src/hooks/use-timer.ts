import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseTimerReturn {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  isFinished: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setDuration: (minutes: number) => void;
}

export interface UseTimerOptions {
  onOneMinuteWarning?: () => void;
}

export function useTimer(initialMinutes: number = 5, options?: UseTimerOptions): UseTimerReturn {
  const [totalTime, setTotalTime] = useState(initialMinutes * 60);
  const [timeLeft, setLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const oneMinuteWarningTriggered = useRef(false);

  const setDuration = useCallback((minutes: number) => {
    const seconds = minutes * 60;
    setTotalTime(seconds);
    setLeft(seconds);
    setIsRunning(false);
    setIsFinished(false);
    oneMinuteWarningTriggered.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
      setIsFinished(false);
    }
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsFinished(false);
    setLeft(totalTime);
    oneMinuteWarningTriggered.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [totalTime]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setLeft((prev) => {
          // Trigger one minute warning
          if (prev === 60 && !oneMinuteWarningTriggered.current && options?.onOneMinuteWarning) {
            oneMinuteWarningTriggered.current = true;
            options.onOneMinuteWarning();
          }

          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, options]);

  return {
    timeLeft,
    totalTime,
    isRunning,
    isFinished,
    start,
    pause,
    reset,
    setDuration,
  };
}