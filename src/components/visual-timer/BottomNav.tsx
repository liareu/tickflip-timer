import React from 'react';
import { Clock, FlipHorizontal, Settings, Play, Pause } from 'lucide-react';
import { cn } from '../../lib/utils';

type NavItem = 'timer' | 'stats' | 'settings';
type ViewType = 'pie' | 'flip';

interface BottomNavProps {
  activeNav: NavItem;
  onNavChange: (item: NavItem) => void;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = React.memo(({
  activeNav,
  onNavChange,
  isRunning,
  onStart,
  onPause,
  currentView,
  onViewChange
}) => {
  const navItems = [
    { id: 'settings' as NavItem, icon: Settings, label: 'Einstellungen' },
  ];

  const handlePlayPause = () => {
    if (isRunning) {
      onPause();
    } else {
      onStart();
    }
  };

  const handleViewToggle = () => {
    onViewChange(currentView === 'pie' ? 'flip' : 'pie');
  };

  return (
    <nav 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground shadow-lg px-4 py-3 flex items-center gap-6 z-50 rounded-full"
      aria-label="Haupt-Navigation"
    >
      {/* View Toggle: Pie/Flip */}
      <button
        onClick={handleViewToggle}
        className={cn(
          "relative p-3 transition-all duration-200 rounded-full",
          "hover:bg-white/10 active:scale-95"
        )}
        aria-label={currentView === 'pie' ? 'Zur Flip-Ansicht wechseln' : 'Zur Kreis-Ansicht wechseln'}
      >
        {currentView === 'pie' ? (
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="7" y="4" width="10" height="7" rx="1" />
            <rect x="7" y="13" width="10" height="7" rx="1" />
            <line x1="7" y1="11" x2="17" y2="11" strokeWidth="1.5" />
          </svg>
        ) : (
          <Clock className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Center - Large Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className={cn(
          "relative p-5 transition-all duration-200 rounded-full",
          "bg-white text-primary hover:bg-white/90 active:scale-95",
          "shadow-xl hover:shadow-2xl",
          "ring-2 ring-white/30 ring-offset-2 ring-offset-primary"
        )}
        aria-label={isRunning ? 'Timer pausieren' : 'Timer starten'}
      >
        {isRunning ? (
          <Pause className="w-7 h-7 fill-current" />
        ) : (
          <Play className="w-7 h-7 fill-current" />
        )}
      </button>

      {/* Right Navigation Item - Settings */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeNav === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={cn(
              "relative p-3 transition-all duration-200 rounded-full",
              "hover:bg-white/10 active:scale-95",
              isActive && "bg-white text-foreground"
            )}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon 
              className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-foreground" : "text-white"
              )} 
            />
            {isActive && (
              <span className="absolute inset-0 ring-2 ring-white/20 ring-offset-2 ring-offset-foreground rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';