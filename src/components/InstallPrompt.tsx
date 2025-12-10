import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { PWAManager } from '../utils/pwa';

export const InstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [pwaManager] = useState(() => new PWAManager());

  useEffect(() => {
    // Check if we can show install prompt
    const checkInstallability = () => {
      setTimeout(() => {
        if (pwaManager.canInstall() && !pwaManager.isAppInstalled()) {
          setShowPrompt(true);
        }
      }, 3000); // Show after 3 seconds
    };

    checkInstallability();
  }, [pwaManager]);

  const handleInstall = async () => {
    const accepted = await pwaManager.promptInstall();
    if (accepted) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store dismissal in localStorage
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if user previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') {
      setShowPrompt(false);
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-40 animate-in slide-in-from-bottom duration-300">
      <div className="bg-primary text-primary-foreground rounded-2xl shadow-2xl p-4 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-primary-foreground/10 rounded-lg">
            <Download className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold mb-1">TickFlip installieren</h3>
            <p className="text-sm opacity-90 mb-3">
              Installiere die App für schnellen Zugriff und Offline-Nutzung
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-primary-foreground text-primary px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform"
              >
                Installieren
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary-foreground/10 transition-colors"
              >
                Später
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
