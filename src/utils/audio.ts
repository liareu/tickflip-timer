/**
 * Audio utilities for timer alarm sounds
 * Uses Web Audio API for better control
 */

export type AlarmType = 'gentle' | 'clear' | 'chime';

export class AlarmSound {
  private audioContext: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private alarmType: AlarmType = 'gentle';
  private isInitialized: boolean = false;

  constructor(enabled: boolean = true, alarmType: AlarmType = 'gentle') {
    this.soundEnabled = enabled;
    this.alarmType = alarmType;
    // Don't create AudioContext yet - wait for user interaction
  }

  /**
   * Initialize audio context on first user interaction
   */
  private initAudioContext(): void {
    if (this.isInitialized || !this.soundEnabled) return;

    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.isInitialized = true;
      } catch (error) {
        console.warn('Failed to create AudioContext:', error);
      }
    }
  }

  /**
   * Play alarm sound based on selected type
   */
  async playAlarm(): Promise<void> {
    if (!this.soundEnabled) return;

    try {
      // Initialize audio context on first use
      this.initAudioContext();

      if (!this.audioContext) return;

      // Resume audio context if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;

      switch (this.alarmType) {
        case 'gentle':
          this.playGentleAlarm(now);
          break;
        case 'clear':
          this.playClearAlarm(now);
          break;
        case 'chime':
          this.playChimeAlarm(now);
          break;
      }
    } catch (error) {
      console.warn('Failed to play alarm sound:', error);
    }
  }

  /**
   * Play gentle alarm (original three-tone)
   */
  private playGentleAlarm(now: number): void {
    this.playTone(880, now, 0.15, 0.25); // A5
    this.playTone(1046.5, now + 0.2, 0.15, 0.25); // C6
    this.playTone(1318.5, now + 0.4, 0.3, 0.25); // E6
  }

  /**
   * Play clear alarm (ascending beeps)
   */
  private playClearAlarm(now: number): void {
    this.playTone(523.25, now, 0.2, 0.35, 'square'); // C5
    this.playTone(659.25, now + 0.25, 0.2, 0.35, 'square'); // E5
    this.playTone(783.99, now + 0.5, 0.3, 0.35, 'square'); // G5
  }

  /**
   * Play chime alarm (bell-like)
   */
  private playChimeAlarm(now: number): void {
    // Play fundamental and harmonics for bell-like sound
    this.playTone(440, now, 0.6, 0.3); // A4
    this.playTone(880, now, 0.6, 0.2); // A5
    this.playTone(1320, now, 0.6, 0.15); // E6
    this.playTone(1760, now, 0.6, 0.1); // A6
  }

  /**
   * Play countdown warning sound (subtle tick)
   */
  async playWarning(): Promise<void> {
    if (!this.soundEnabled) return;

    try {
      // Initialize audio context on first use
      this.initAudioContext();

      if (!this.audioContext) return;

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;
      this.playTone(1000, now, 0.05, 0.15, 'sine'); // Short subtle beep
    } catch (error) {
      console.warn('Failed to play warning sound:', error);
    }
  }

  /**
   * Play a single tone
   */
  private playTone(
    frequency: number, 
    startTime: number, 
    duration: number, 
    volume: number = 0.3,
    type: OscillatorType = 'sine'
  ): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    // Envelope for smooth attack and release
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + duration - 0.05);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

  /**
   * Trigger haptic feedback (vibration on mobile)
   */
  triggerHaptic(pattern: number | number[] = 200): void {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  /**
   * Enable or disable sound
   */
  setEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    // Audio context will be initialized on next playback attempt
  }

  /**
   * Set alarm type
   */
  setAlarmType(type: AlarmType): void {
    this.alarmType = type;
  }

  /**
   * Initialize audio on user interaction (call when timer starts)
   * This helps ensure audio will work when timer finishes
   */
  async prepareAudio(): Promise<void> {
    if (!this.soundEnabled) return;

    try {
      this.initAudioContext();

      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    } catch (error) {
      console.warn('Failed to prepare audio:', error);
    }
  }

  /**
   * Test the alarm sound (for settings)
   */
  async testAlarm(): Promise<void> {
    await this.playAlarm();
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}