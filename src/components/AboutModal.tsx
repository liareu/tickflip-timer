import React from 'react';
import { X, Info, Heart, Code, Clock } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Über TickFlip</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pb-32 overflow-y-auto max-h-[calc(90vh-80px)] space-y-6">
          {/* Logo & Tagline */}
          <div className="text-center space-y-3 py-4">
            <h1 
              className="text-4xl tracking-wider"
              style={{ fontFamily: "'Climate Crisis', sans-serif" }}
            >
              TickFlip
            </h1>
            <p className="text-lg text-muted-foreground">
              Tick. Flip. Focus.
            </p>
          </div>

          {/* Version */}
          <div className="text-center p-3 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Version <strong>1.0.0</strong> • Dezember 2025
            </p>
          </div>

          {/* Beschreibung */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold">Was ist TickFlip?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TickFlip ist ein minimalistischer visueller Timer, der dir hilft, fokussiert zu arbeiten. 
              Inspiriert vom klassischen "Time Timer", kombiniert TickFlip eine klare Kreisdarstellung 
              mit modernen Flip-Style-Buttons und einem intuitiven Slider.
            </p>
          </section>

          {/* Features */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Visueller Kreis-Timer (60-Minuten-Skala)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Flip-Clock Alternative-Ansicht</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Tastaturkürzel (Leertaste, R, 1-4)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Verschiedene Alarmtöne (sanft/klar/glocke)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Haptisches Feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>PWA - Offline-fähig & installierbar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>100% datenschutzfreundlich (keine Cloud)</span>
              </li>
            </ul>
          </section>

          {/* Credits */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Entwickelt mit
            </h3>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
              <p className="text-muted-foreground mb-2">
                TickFlip wurde entwickelt, um eine ablenkungsfreie, datenschutzfreundliche 
                Timer-Erfahrung zu bieten.
              </p>
              <p className="text-muted-foreground">
                Schriftart: <strong>Climate Crisis</strong> (Google Fonts)
              </p>
            </div>
          </section>

          {/* Open Source */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold">Open Source</h3>
            <p className="text-sm text-muted-foreground">
              TickFlip ist ein Open-Source-Projekt. Der Quellcode kann für eigene Projekte 
              verwendet werden.
            </p>
          </section>

          {/* Impressum */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h3 className="text-lg font-bold">Impressum</h3>
            <div className="p-4 bg-accent/50 rounded-lg text-sm">
              <p className="text-muted-foreground mb-2">
                <strong>Verantwortlich für den Inhalt:</strong>
              </p>
              <p className="text-muted-foreground">
                Julia Reuter<br />
                UX and AI Designerin bei Micromata GmbH
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};