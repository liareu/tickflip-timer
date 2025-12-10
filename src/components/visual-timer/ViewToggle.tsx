import React from 'react';
import { Clock, FlipHorizontal } from 'lucide-react';
import { cn } from "../../lib/utils";

export type ViewType = 'pie' | 'flip';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  return (
    <div 
      className="inline-flex items-center gap-1 p-1 bg-muted/80 dark:bg-muted/60 rounded-lg border border-border/50"
      role="tablist"
      aria-label="Timer-Ansicht wählen"
    >
      <button
        role="tab"
        aria-selected={currentView === 'pie'}
        aria-label="Kreis-Timer-Ansicht"
        onClick={() => onViewChange('pie')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          currentView === 'pie'
            ? "bg-card shadow-md text-card-foreground"
            : "hover:bg-card/50 text-muted-foreground hover:text-foreground"
        )}
      >
        <Clock className="w-4 h-4" />
        <span className="text-sm">Kreis</span>
      </button>

      <button
        role="tab"
        aria-selected={currentView === 'flip'}
        aria-label="Flip-Timer-Ansicht"
        onClick={() => onViewChange('flip')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          currentView === 'flip'
            ? "bg-card shadow-md text-card-foreground"
            : "hover:bg-card/50 text-muted-foreground hover:text-foreground"
        )}
      >
        <FlipHorizontal className="w-4 h-4" />
        <span className="text-sm">Flip</span>
      </button>
    </div>
  );
};