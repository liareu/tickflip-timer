import React from 'react';
import { cn } from '../lib/utils';

interface TimerCircleProps {
  totalTime: number;
  timeLeft: number;
  size?: number;
  strokeWidth?: number;
  theme: 'standard' | 'dark' | 'contrast';
}

export const TimerCircle: React.FC<TimerCircleProps> = ({
  totalTime,
  timeLeft,
  size = 300,
  strokeWidth = 12,
  theme,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const dashOffset = circumference - progress * circumference;

  // Determine colors based on theme
  let strokeColorClass = 'text-indigo-600 dark:text-indigo-400';
  let bgColorClass = 'text-slate-100 dark:text-slate-800';

  if (theme === 'contrast') {
    strokeColorClass = 'text-black';
    bgColorClass = 'text-slate-300';
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={cn("transition-colors duration-300", bgColorClass)}
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-linear", strokeColorClass)}
        />
      </svg>
      
      {/* Digital Time Display (Optional but good for accessibility/clarity) */}
      <div className={cn("absolute inset-0 flex items-center justify-center flex-col pointer-events-none")}>
        <span className={cn("font-mono font-bold tracking-tighter tabular-nums transition-colors duration-300", 
          theme === 'contrast' ? "text-black text-6xl" : "text-slate-900 dark:text-slate-50 text-5xl"
        )}>
          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </span>
        {theme === 'contrast' && (
            <span className="text-sm font-bold uppercase mt-2">Remaining</span>
        )}
      </div>
    </div>
  );
};
