import React from 'react';
import { cn } from '../lib/utils';

interface FlipButtonProps {
  value: number;
  label?: string;
  isActive: boolean;
  onClick: () => void;
  theme: 'standard' | 'dark' | 'contrast';
}

export const FlipButton: React.FC<FlipButtonProps> = ({
  value,
  label = 'min',
  isActive,
  onClick,
  theme,
}) => {
  // Base styles
  const baseStyles = "relative group flex flex-col items-center justify-center w-20 h-24 rounded-lg cursor-pointer transition-all duration-200 transform active:scale-95 select-none";
  
  // Theme specific styles
  let themeStyles = "";
  let activeStyles = "";
  let textStyles = "";
  
  if (theme === 'contrast') {
    themeStyles = "bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none";
    activeStyles = isActive ? "bg-black text-white translate-y-1 shadow-none" : "";
    textStyles = isActive ? "text-white" : "text-black";
  } else if (theme === 'dark') {
    themeStyles = "bg-slate-800 border border-slate-700 shadow-lg hover:bg-slate-700";
    activeStyles = isActive ? "ring-2 ring-indigo-500 bg-slate-700" : "";
    textStyles = "text-slate-100";
  } else {
    // Standard
    themeStyles = "bg-white border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-0.5";
    activeStyles = isActive ? "ring-2 ring-indigo-500 border-transparent" : "";
    textStyles = "text-slate-900";
  }

  return (
    <button
      className={cn(baseStyles, themeStyles, activeStyles)}
      onClick={onClick}
      aria-label={`Set timer to ${value} minutes`}
      aria-pressed={isActive}
    >
      {/* Flip line effect (visual only) */}
      <div className={cn(
        "absolute top-1/2 left-0 right-0 h-[1px] w-full z-10 opacity-20",
        theme === 'contrast' ? "bg-black" : "bg-slate-900 dark:bg-slate-100"
      )} />
      
      <div className={cn("z-0 flex flex-col items-center justify-center", textStyles)}>
        <span className="text-3xl font-bold leading-none">{value}</span>
        <span className="text-xs opacity-60 mt-1 font-medium">{label}</span>
      </div>
    </button>
  );
};
