import React, { useEffect, useState } from 'react';
import { cn } from "../../lib/utils";

interface FlipClockProps {
  timeLeft: number; // in seconds
}

interface FlipCardProps {
  value: string;
  label: string;
}

const FlipCard: React.FC<FlipCardProps> = React.memo(({ value, label }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-36 sm:w-36 sm:h-44">
        {/* Main card container */}
        <div className={cn(
          "relative w-full h-full rounded-xl shadow-2xl overflow-hidden bg-card",
          "border-2 border-border/70"
        )}>
          {/* Top half background */}
          <div className="absolute top-0 left-0 right-0 h-[50%] bg-black/5 dark:bg-white/5 rounded-t-xl border-b border-black/10 dark:border-white/10 z-0" />

          {/* Current value display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl font-bold tabular-nums z-10 text-card-foreground">
              {value}
            </span>
          </div>

          {/* Center hinge line */}
          <div className="absolute top-1/2 left-2 right-2 h-[2px] bg-black/15 dark:bg-white/15 z-20 -translate-y-[1px]" />
        </div>
      </div>

      {/* Label */}
      <span className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  );
});

FlipCard.displayName = 'FlipCard';

export const FlipClock: React.FC<FlipClockProps> = React.memo(({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8 py-8">
      <FlipCard value={minutesStr} label="Minuten" />
      
      {/* Colon separator */}
      <div className="text-4xl sm:text-5xl -translate-y-4 select-none" aria-hidden="true">
        :
      </div>
      
      <FlipCard value={secondsStr} label="Sekunden" />
    </div>
  );
});

FlipClock.displayName = 'FlipClock';