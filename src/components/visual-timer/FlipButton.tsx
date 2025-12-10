import React from 'react';
import { cn } from "../../lib/utils";

interface FlipButtonProps {
  value: number;
  label?: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  colorClass?: string;
}

export const FlipButton: React.FC<FlipButtonProps> = React.memo(({
  value,
  label = "min",
  isActive,
  onClick,
  className,
  colorClass
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center w-20 h-24 transition-all duration-200 focus:outline-hidden focus:ring-4 focus:ring-primary/20 rounded-md",
        isActive
          ? "bg-primary text-primary-foreground shadow-inner transform scale-95"
          : cn(
              colorClass || "bg-card text-card-foreground",
              "hover:shadow-lg hover:-translate-y-1 shadow-md"
            ),
        className
      )}
      aria-label={`Timer auf ${value} Minuten stellen`}
      aria-pressed={isActive}
    >
      {/* Top half background mimic */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[50%] border-b rounded-t-md",
        isActive
          ? "bg-black/15 border-black/20 dark:bg-white/15 dark:border-white/20"
          : "bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10"
      )}
      />

      {/* Content */}
      <span className="text-3xl font-bold z-10">{value}</span>
      <span className="text-xs opacity-70 z-10 mt-1 uppercase tracking-wider">{label}</span>

      {/* Mechanical hinge lines */}
      <div className="absolute top-1/2 left-1 right-1 h-[1px] bg-black/10 dark:bg-white/10 z-0" />
    </button>
  );
});

FlipButton.displayName = 'FlipButton';