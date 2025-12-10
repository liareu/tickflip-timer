import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Toaster, toast } from 'sonner@2.0.3';
import { FlipButton } from './components/visual-timer/FlipButton';
import { Slider } from './components/ui/slider';
import { PieTimer } from './components/visual-timer/PieTimer';
import { FlipClock } from './components/visual-timer/FlipClock';
import { BottomNav } from './components/visual-timer/BottomNav';
import { SettingsModal } from './components/visual-timer/SettingsModal';
import { SplashScreen } from './components/SplashScreen';
import { InstallPrompt } from './components/InstallPrompt';
import { PrivacyModal } from './components/PrivacyModal';
import { AboutModal } from './components/AboutModal';
import { cn } from './lib/utils';
import { AlarmSound, AlarmType } from './utils/audio';
import { NotificationManager } from './utils/notifications';
import { installPWAIcons } from './utils/pwa';
import { useTimer } from './hooks/use-timer';
import { useKeyboardShortcuts } from './hooks/use-keyboard-shortcuts';

const presets = [5, 10, 25, 50];

// Alarm overlay component
function AlarmOverlay({ isVisible, onDismiss }: { isVisible: boolean; onDismiss: () => void }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-destructive/95 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
      <div className="text-center space-y-6 p-8">
        <div className="text-6xl animate-bounce">⏰</div>
        <h2 className="text-4xl font-bold text-destructive-foreground">Zeit abgelaufen!</h2>
        <button
          onClick={onDismiss}
          className="bg-destructive-foreground text-destructive px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [customMinutes, setCustomMinutes] = useState<number>(5);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [alarmType, setAlarmType] = useState<AlarmType>('gentle');
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [viewType, setViewType] = useState<'pie' | 'flip'>('flip');
  const [activeNav, setActiveNav] = useState<'timer' | 'stats' | 'settings'>('timer');
  
  // Initialize audio and notifications
  const alarmSoundRef = useRef<AlarmSound | null>(null);
  const notificationManagerRef = useRef<NotificationManager | null>(null);

  useEffect(() => {
    alarmSoundRef.current = new AlarmSound(soundEnabled, alarmType);
    notificationManagerRef.current = new NotificationManager();

    // Check if notifications are already enabled
    if (notificationManagerRef.current.isEnabled()) {
      setNotificationEnabled(true);
    }

    // Install PWA icons
    installPWAIcons().catch(console.error);

    // Register Service Worker for PWA functionality
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/tickflip-timer/service-worker.js')
          .then((registration) => {
            console.log('ServiceWorker registration successful:', registration.scope);
          })
          .catch((error) => {
            console.log('ServiceWorker registration failed:', error);
          });
      });
    }

    return () => {
      alarmSoundRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    alarmSoundRef.current?.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    alarmSoundRef.current?.setAlarmType(alarmType);
  }, [alarmType]);

  // One minute warning handler
  const handleOneMinuteWarning = () => {
    if (soundEnabled) {
      alarmSoundRef.current?.playWarning();
    }
    if (hapticEnabled) {
      alarmSoundRef.current?.triggerHaptic([100, 50, 100]);
    }
    toast.info('Noch 1 Minute verbleibend', {
      duration: 3000,
      position: 'top-center',
    });
  };
  
  // Initialize timer with 5 minutes and warning callback
  const { 
    timeLeft, 
    totalTime, 
    isRunning, 
    isFinished, 
    start, 
    pause, 
    reset, 
    setDuration 
  } = useTimer(5, { onOneMinuteWarning: handleOneMinuteWarning });

  // Handle preset click
  const handlePresetClick = (minutes: number) => {
    setCustomMinutes(minutes);
    setDuration(minutes);
  };

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    const val = values[0];
    setCustomMinutes(val);
    setDuration(val);
  };

  // Wrapped start function that prepares audio
  const handleStart = useCallback(() => {
    // Prepare audio context on first user interaction
    alarmSoundRef.current?.prepareAudio();
    start();
  }, [start]);

  // Keyboard shortcuts with memoized callbacks
  const handleStartPause = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      handleStart();
    }
  }, [isRunning, pause, handleStart]);

  const handleReset = useCallback(() => {
    if (!isRunning) {
      reset();
    }
  }, [isRunning, reset]);

  const handlePreset1 = useCallback(() => {
    if (!isRunning) handlePresetClick(presets[0]);
  }, [isRunning]);

  const handlePreset2 = useCallback(() => {
    if (!isRunning) handlePresetClick(presets[1]);
  }, [isRunning]);

  const handlePreset3 = useCallback(() => {
    if (!isRunning) handlePresetClick(presets[2]);
  }, [isRunning]);

  const handlePreset4 = useCallback(() => {
    if (!isRunning) handlePresetClick(presets[3]);
  }, [isRunning]);

  useKeyboardShortcuts({
    onStartPause: handleStartPause,
    onReset: handleReset,
    onPreset1: handlePreset1,
    onPreset2: handlePreset2,
    onPreset3: handlePreset3,
    onPreset4: handlePreset4,
  });

  // Alarm State
  const [showAlarm, setShowAlarm] = useState(false);

  useEffect(() => {
    if (isFinished) {
      setShowAlarm(true);
      
      // Play alarm sound
      if (soundEnabled) {
        alarmSoundRef.current?.playAlarm();
      }
      
      // Haptic feedback
      if (hapticEnabled) {
        alarmSoundRef.current?.triggerHaptic([200, 100, 200, 100, 200]);
      }
      
      // Show browser notification
      if (notificationEnabled) {
        notificationManagerRef.current?.showTimerFinished();
      }
    }
  }, [isFinished, soundEnabled, notificationEnabled, hapticEnabled]);

  const handleDismissAlarm = () => {
    setShowAlarm(false);
    reset();
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      const granted = await notificationManagerRef.current?.setEnabled(true);
      setNotificationEnabled(granted || false);
    } else {
      await notificationManagerRef.current?.setEnabled(false);
      setNotificationEnabled(false);
    }
  };

  // Handle bottom navigation
  const handleNavigation = (item: 'timer' | 'stats' | 'settings') => {
    setActiveNav(item);
    
    if (item === 'settings') {
      setShowSettings(true);
    }
  };

  // Check if current setting matches a preset
  const currentDurationMinutes = totalTime / 60;

  // Show splash screen on first load
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Toaster />
      <main className="mx-auto max-w-md pb-24 pt-8 px-4 overflow-y-auto relative z-10">
        <header className="text-center mb-3">
          <h1 className="tracking-wider text-4xl" style={{ fontFamily: "'Climate Crisis', sans-serif" }}>TickFlip</h1>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-8 container mx-auto max-w-md md:max-w-2xl">
          
          {/* Visual Timer */}
          <section className="py-4 relative" aria-label="Visueller Timer">
            {viewType === 'pie' ? (
              <PieTimer 
                timeLeft={timeLeft} 
                totalTime={totalTime}
                isRunning={isRunning}
                size={280}
                colorClass="fill-secondary"
                bgClass="stroke-primary/10"
              />
            ) : (
              <FlipClock
                timeLeft={timeLeft}
              />
            )}
            
            {/* Digital Text Overlay (Optional but helpful for accessibility) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="sr-only">
                {Math.floor(timeLeft / 60)} Minuten {timeLeft % 60} Sekunden verbleibend
              </span>
            </div>
          </section>

          {/* Time Selection - Flips (hidden in Pomodoro mode) */}
          <>
            <section className="w-full grid grid-cols-4 gap-2 md:gap-4 justify-items-center" aria-label="Zeitvorwahl">
              {presets.map((min) => (
                <FlipButton
                  key={min}
                  value={min}
                  isActive={!isRunning && currentDurationMinutes === min}
                  onClick={() => handlePresetClick(min)}
                />
              ))}
            </section>

            {/* Custom Time Slider */}
            <section className="w-full px-2 space-y-4">
              <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>1 min</span>
                <span className={cn("text-primary font-bold", isRunning && "opacity-50")}>
                  {Math.floor(currentDurationMinutes)} min
                </span>
                <span>60 min</span>
              </div>
              <Slider
                value={[currentDurationMinutes]}
                min={1}
                max={60}
                step={1}
                onValueChange={handleSliderChange}
                disabled={isRunning}
                className={cn("transition-opacity", isRunning && "opacity-50 cursor-not-allowed")}
                aria-label="Zeit-Schieberegler"
              />
            </section>
          </>

        </main>
        
        {/* Alarm Overlay */}
        <AlarmOverlay 
          isVisible={showAlarm} 
          onDismiss={handleDismissAlarm} 
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          soundEnabled={soundEnabled}
          onSoundToggle={setSoundEnabled}
          notificationEnabled={notificationEnabled}
          onNotificationToggle={handleNotificationToggle}
          alarmType={alarmType}
          onAlarmTypeChange={setAlarmType}
          hapticEnabled={hapticEnabled}
          onHapticToggle={setHapticEnabled}
          onShowPrivacy={() => {
            setShowSettings(false);
            setShowPrivacy(true);
          }}
          onShowAbout={() => {
            setShowSettings(false);
            setShowAbout(true);
          }}
          onTestAlarm={() => alarmSoundRef.current?.testAlarm()}
        />

        {/* Privacy Modal */}
        <PrivacyModal
          isOpen={showPrivacy}
          onClose={() => setShowPrivacy(false)}
        />

        {/* About Modal */}
        <AboutModal
          isOpen={showAbout}
          onClose={() => setShowAbout(false)}
        />

        {/* Bottom Navigation */}
        <BottomNav
          activeNav={activeNav}
          onNavChange={handleNavigation}
          isRunning={isRunning}
          onStart={handleStart}
          onPause={pause}
          currentView={viewType}
          onViewChange={setViewType}
        />
        
        {/* PWA Install Prompt */}
        <InstallPrompt />
      </main>
    </div>
  );
}