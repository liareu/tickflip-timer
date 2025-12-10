import React from 'react';
import { X, Shield, Database, Bell, Download } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Datenschutz</h2>
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
          {/* Intro */}
          <div className="space-y-2">
            <p className="text-muted-foreground">
              TickFlip respektiert deine Privatsphäre. Diese App funktioniert vollständig lokal auf deinem Gerät 
              und sendet <strong>keine Daten an externe Server</strong>.
            </p>
          </div>

          {/* Was wird gespeichert */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Database className="w-5 h-5" />
              Was wird lokal gespeichert?
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-bold mb-2">Browser-LocalStorage</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Timer-Einstellungen (Alarm-Typ, Lautstärke)</li>
                  <li>Benachrichtigungspräferenzen</li>
                  <li>App-Darstellung (Pie/Flip-Ansicht)</li>
                  <li>PWA-Install-Status</li>
                </ul>
              </div>

              <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-bold mb-2">Service Worker Cache</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>App-Dateien für Offline-Nutzung</li>
                  <li>Kann jederzeit im Browser gelöscht werden</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Berechtigungen */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Benötigte Berechtigungen
            </h3>
            <div className="space-y-2 text-sm">
              <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-bold mb-2">Benachrichtigungen (Optional)</h4>
                <p className="text-muted-foreground">
                  Wird nur verwendet, um dich zu informieren, wenn der Timer abgelaufen ist. 
                  Du kannst diese Berechtigung jederzeit in den Einstellungen widerrufen.
                </p>
              </div>

              <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-bold mb-2">Offline-Speicher (PWA)</h4>
                <p className="text-muted-foreground">
                  Ermöglicht die Nutzung der App ohne Internetverbindung. 
                  Keine personenbezogenen Daten werden gespeichert.
                </p>
              </div>
            </div>
          </section>

          {/* Keine Tracking */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold">Was wir NICHT tun</h3>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Keine Cookies (außer technisch notwendige)</li>
                <li>✓ Kein Analytics oder Tracking</li>
                <li>✓ Keine Weitergabe von Daten an Dritte</li>
                <li>✓ Keine Benutzerkonten oder Registrierung</li>
                <li>✓ Keine Cloud-Synchronisation</li>
              </ul>
            </div>
          </section>

          {/* Daten löschen */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold">Deine Daten löschen</h3>
            <div className="p-4 bg-accent/50 rounded-lg text-sm">
              <p className="text-muted-foreground mb-3">
                Du kannst alle lokal gespeicherten Daten jederzeit löschen:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Öffne die Browser-Einstellungen</li>
                <li>Gehe zu "Datenschutz & Sicherheit"</li>
                <li>Lösche Website-Daten für TickFlip</li>
              </ol>
            </div>
          </section>

          {/* DSGVO Compliance */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold">DSGVO-Konformität</h3>
            <p className="text-sm text-muted-foreground">
              Diese App entspricht den Anforderungen der Datenschutz-Grundverordnung (DSGVO). 
              Da alle Daten lokal auf deinem Gerät bleiben und keine personenbezogenen Daten 
              verarbeitet werden, ist keine zusätzliche Einwilligung erforderlich.
            </p>
          </section>

          {/* Kontakt */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h3 className="text-lg font-bold">Fragen zum Datenschutz?</h3>
            <p className="text-sm text-muted-foreground">
              Bei Fragen zur Datenverarbeitung kannst du die Entwickler kontaktieren. 
              Diese App ist ein Open-Source-Projekt.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};