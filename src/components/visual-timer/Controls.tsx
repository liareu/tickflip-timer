import React from 'react';
import { Button } from "../ui/button";
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  disabled?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {isRunning ? (
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onPause} 
          className="w-32 h-12 text-lg font-medium border-2 hover:bg-accent hover:text-accent-foreground"
          disabled={disabled}
        >
          <Pause className="w-5 h-5 mr-2" />
          Pause
        </Button>
      ) : (
        <Button 
          variant="default" 
          size="lg" 
          onClick={onStart} 
          className="w-32 h-12 text-lg font-medium shadow-md hover:shadow-lg"
          disabled={disabled}
        >
          <Play className="w-5 h-5 mr-2" />
          Start
        </Button>
      )}
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onReset} 
        className="h-12 w-12 rounded-full hover:bg-muted hover:text-foreground"
        title="Zurücksetzen"
        aria-label="Timer zurücksetzen"
      >
        <RotateCcw className="w-6 h-6" />
      </Button>
    </div>
  );
};