import React from 'react';
import { Settings, Moon, Sun, Eye, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface SettingsPanelProps {
  theme: 'standard' | 'dark' | 'contrast';
  setTheme: (theme: 'standard' | 'dark' | 'contrast') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" aria-label="Settings">
          <Settings className={theme === 'contrast' ? "text-black w-6 h-6" : "w-5 h-5"} />
        </Button>
      </SheetTrigger>
      <SheetContent className={theme === 'dark' ? "dark bg-slate-950 border-slate-800 text-slate-50" : ""}>
        <SheetHeader>
          <SheetTitle className={theme === 'dark' ? "text-slate-50" : ""}>Settings</SheetTitle>
          <SheetDescription className={theme === 'dark' ? "text-slate-400" : ""}>
            Customize your timer experience.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Theme Selection */}
          <div className="space-y-4">
            <Label className={theme === 'dark' ? "text-slate-200" : ""}>Theme</Label>
            <RadioGroup 
              value={theme} 
              onValueChange={(val) => setTheme(val as any)}
              className="grid grid-cols-1 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex items-center gap-2 cursor-pointer font-normal">
                  <Sun className="w-4 h-4" /> Standard
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer font-normal">
                  <Moon className="w-4 h-4" /> Dark Mode
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contrast" id="contrast" />
                <Label htmlFor="contrast" className="flex items-center gap-2 cursor-pointer font-normal">
                  <Eye className="w-4 h-4" /> High Contrast
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className={theme === 'dark' ? "bg-slate-800" : ""} />

          {/* Sound Settings */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={theme === 'dark' ? "text-slate-200" : ""}>Sound Effects</Label>
              <div className={theme === 'dark' ? "text-slate-400 text-sm" : "text-muted-foreground text-sm"}>
                Play sound when timer finishes
              </div>
            </div>
            <Switch 
              checked={soundEnabled} 
              onCheckedChange={setSoundEnabled}
              aria-label="Toggle sound effects"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
