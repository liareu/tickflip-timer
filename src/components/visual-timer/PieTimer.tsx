import React, { useMemo } from 'react';
import { cn } from "../../lib/utils";

interface PieTimerProps {
  timeLeft: number;
  totalTime: number;
  isRunning?: boolean;
  colorClass?: string;
  bgClass?: string;
  size?: number;
}

export const PieTimer: React.FC<PieTimerProps> = React.memo(({
  timeLeft,
  totalTime,
  isRunning = false,
  colorClass = "fill-primary",
  bgClass = "stroke-muted",
  size = 300
}) => {
  // Fixed 60-minute scale (like Time Timer)
  // timeLeft is in seconds, so divide by 60 to get minutes
  const MAX_MINUTES = 60;
  const timeLeftMinutes = timeLeft / 60;
  const fraction = timeLeftMinutes / MAX_MINUTES;
  
  // Handle full circle case separately or use 0.9999 to avoid arc collapse
  const safeFraction = Math.max(0, Math.min(0.9999, fraction));
  
  const radius = 50;
  const cx = 50;
  const cy = 50;
  
  // Calculate end coordinates
  // 0 degrees is at 12 o'clock (0, -1) in normal terms, but in SVG trig 0 is 3 o'clock.
  // We want to start at 12 o'clock and go clockwise.
  // Angle in radians
  const angle = safeFraction * 2 * Math.PI;
  
  // We start at (50, 0) which is 12 o'clock relative to 50,50 radius 50.
  // x = cx + r * sin(a)
  // y = cy - r * cos(a)
  const x = cx + radius * Math.sin(angle);
  const y = cy - radius * Math.cos(angle);
  
  const largeArcFlag = safeFraction > 0.5 ? 1 : 0;
  
  // Path definition
  // M cx cy : Move to center
  // L 50 0 : Line to top center (start of arc)
  // A radius radius 0 largeArcFlag 1 x y : Arc to end point
  // Z : Close path (back to center)
  const pathData = `M ${cx} ${cy} L 50 0 A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y} Z`;

  // Memoize tick marks (they never change)
  const tickMarks = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = (i * 6) * (Math.PI / 180);
      const isMajor = i % 5 === 0;
      const r1 = 48;
      const r2 = isMajor ? 41 : 45;

      // Calculate coordinates starting from 12 o'clock (top)
      const x1 = 50 + r1 * Math.sin(angle);
      const y1 = 50 - r1 * Math.cos(angle);
      const x2 = 50 + r2 * Math.sin(angle);
      const y2 = 50 - r2 * Math.cos(angle);

      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className={cn(
            isMajor ? "stroke-foreground/90 stroke-[0.8px]" : "stroke-foreground/30 stroke-[0.4px]"
          )}
        />
      );
    });
  }, []);

  // Memoize scale numbers (they never change)
  const scaleNumbers = useMemo(() => {
    return [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((num) => {
      const angle = (num * 6) * (Math.PI / 180);
      const rText = 34;
      const x = 50 + rText * Math.sin(angle);
      const y = 50 - rText * Math.cos(angle);

      return (
        <text
          key={num}
          x={x}
          y={y}
          className="fill-foreground text-[4.5px] font-bold"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {num}
        </text>
      );
    });
  }, []);

  return (
    <div 
      className="relative flex items-center justify-center rounded-full bg-card shadow-xl border-4 border-border/80"
      style={{ 
        width: size, 
        height: size,
        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full select-none"
      >
        {/* Background track */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="transparent" 
          className={cn("stroke-[0.5]", bgClass)}
        />
        
        {/* The Wedge (Time Remaining) */}
        {fraction > 0.999 ? (
           <circle cx="50" cy="50" r="48" className={cn(colorClass, isRunning && "transition-all duration-1000 ease-linear")} />
        ) : (
           <path d={pathData} className={cn(colorClass, isRunning && "transition-all duration-1000 ease-linear")} />
        )}

        {/* Scale Ticks */}
        {tickMarks}

        {/* Scale Numbers (5, 10, ... 60) */}
        {scaleNumbers}
      </svg>
    </div>
  );
});

PieTimer.displayName = 'PieTimer';