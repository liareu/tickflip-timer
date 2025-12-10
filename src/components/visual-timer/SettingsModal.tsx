import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Volume2, VolumeX, Bell, Music, Info, Shield } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlarmType } from '../../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  notificationEnabled: boolean;
  onNotificationToggle: (enabled: boolean) => void;
  alarmType: AlarmType;
  onAlarmTypeChange: (type: AlarmType) => void;
  hapticEnabled: boolean;
  onHapticToggle: (enabled: boolean) => void;
  onShowPrivacy?: () => void;
  onShowAbout?: () => void;
  onTestAlarm?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onSoundToggle,
  notificationEnabled,
  onNotificationToggle,
  alarmType,
  onAlarmTypeChange,
  hapticEnabled,
  onHapticToggle,
  onShowPrivacy,
  onShowAbout,
  onTestAlarm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Einstellungen</DialogTitle>
          <DialogDescription>
            Passe die Timer-Benachrichtigungen an deine Bedürfnisse an.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sound Settings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
              <div className="space-y-0.5">
                <Label htmlFor="sound-toggle" className="cursor-pointer text-card-foreground">
                  Sound-Alarm
                </Label>
                <p className="text-sm text-muted-foreground">
                  Akustisches Signal wenn der Timer abläuft
                </p>
              </div>
            </div>
            <Switch
              id="sound-toggle"
              checked={soundEnabled}
              onCheckedChange={onSoundToggle}
            />
          </div>

          {/* Alarm Type Selection */}
          {soundEnabled && (
            <div className="flex items-start gap-3 pl-8">
              <Music className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1 space-y-2">
                <Label htmlFor="alarm-type" className="text-card-foreground">
                  Alarmton
                </Label>
                <Select value={alarmType} onValueChange={onAlarmTypeChange}>
                  <SelectTrigger id="alarm-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gentle">Sanft (Standard)</SelectItem>
                    <SelectItem value="clear">Klar</SelectItem>
                    <SelectItem value="chime">Glocke</SelectItem>
                  </SelectContent>
                </Select>
                <button
                  onClick={onTestAlarm}
                  className="w-full mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                >
                  Alarm testen
                </button>
              </div>
            </div>
          )}

          <Separator />

          {/* Haptic Feedback */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-primary">
                📳
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="haptic-toggle" className="cursor-pointer text-card-foreground">
                  Haptisches Feedback
                </Label>
                <p className="text-sm text-muted-foreground">
                  Vibration bei Timer-Ende (Mobile)
                </p>
              </div>
            </div>
            <Switch
              id="haptic-toggle"
              checked={hapticEnabled}
              onCheckedChange={onHapticToggle}
            />
          </div>

          <Separator />

          {/* Browser Notification Settings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div className="space-y-0.5">
                <Label htmlFor="notification-toggle" className="cursor-pointer text-card-foreground">
                  Browser-Benachrichtigung
                </Label>
                <p className="text-sm text-muted-foreground">
                  Desktop-Benachrichtigung bei Ablauf
                </p>
              </div>
            </div>
            <Switch
              id="notification-toggle"
              checked={notificationEnabled}
              onCheckedChange={onNotificationToggle}
            />
          </div>

          <Separator />

          {/* Keyboard Shortcuts Info */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-card-foreground">Tastaturkürzel</p>
            <ul className="space-y-1">
              <li><kbd className="px-2 py-1 bg-muted rounded">Leertaste</kbd> - Start/Pause</li>
              <li><kbd className="px-2 py-1 bg-muted rounded">R</kbd> - Reset</li>
              <li><kbd className="px-2 py-1 bg-muted rounded">1-4</kbd> - Presets</li>
            </ul>
          </div>

          <Separator />

          {/* Privacy and About Links */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-card-foreground">Weitere Informationen</p>
            <ul className="space-y-1">
              <li>
                <button
                  className="flex items-center gap-2 cursor-pointer text-primary"
                  onClick={onShowPrivacy}
                >
                  <Shield className="w-4 h-4" />
                  Datenschutz
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-2 cursor-pointer text-primary"
                  onClick={onShowAbout}
                >
                  <Info className="w-4 h-4" />
                  Über uns
                </button>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};