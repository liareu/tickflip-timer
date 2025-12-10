import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { BellRing, X } from 'lucide-react';

interface AlarmOverlayProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const AlarmOverlay: React.FC<AlarmOverlayProps> = ({
  isVisible,
  onDismiss
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-card border-4 border-primary w-full max-w-md p-8 shadow-2xl text-center space-y-6 relative overflow-hidden"
        style={{
          clipPath: 'polygon(5% 0, 95% 0, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0 95%, 0 5%)'
        }}
      >
        {/* Blinking background effect */}
        <motion.div 
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute inset-0 bg-primary z-0 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            <BellRing className="w-24 h-24 text-primary mb-4" />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-foreground">Zeit abgelaufen!</h2>
          <p className="text-muted-foreground text-lg">Deine Fokus-Zeit ist beendet.</p>
          
          <div className="bg-primary/10 border border-primary/20 p-3 text-sm text-foreground/80 font-medium mb-2"
          style={{
            clipPath: 'polygon(3% 0, 97% 0, 100% 50%, 97% 100%, 3% 100%, 0 50%)'
          }}>
            (Signalton wird abgespielt...)
          </div>

          <Button 
            size="lg" 
            onClick={onDismiss}
            className="w-full text-lg font-bold h-14"
          >
            Schließen
            <X className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};