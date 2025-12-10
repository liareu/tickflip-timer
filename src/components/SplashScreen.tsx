import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    // Complete and unmount after fade animation (0.5s)
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Animated Timer Circle Icon */}
        <div className="relative w-32 h-32">
          {/* Outer circle */}
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/10"
            />
            {/* Animated progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-primary animate-[dash_1.5s_ease-in-out_infinite]"
              strokeDasharray="339.292"
              strokeDashoffset="0"
              style={{
                animation: 'dash 1.5s ease-in-out infinite'
              }}
            />
          </svg>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        {/* App Title */}
        <div className="text-center space-y-2">
          <h1 
            className="text-5xl tracking-wider text-primary"
            style={{ fontFamily: "'Climate Crisis', sans-serif" }}
          >
            TickFlip
          </h1>
          <p className="text-sm text-muted-foreground tracking-wide">
            Tick. Flip. Focus.
          </p>
        </div>
      </div>

      {/* CSS Animation for the circle */}
      <style>{`
        @keyframes dash {
          0% {
            stroke-dashoffset: 339.292;
          }
          50% {
            stroke-dashoffset: 84.823;
          }
          100% {
            stroke-dashoffset: 339.292;
          }
        }
      `}</style>
    </div>
  );
};