/**
 * Browser notification utilities
 */

export class NotificationManager {
  private enabled: boolean = false;

  constructor() {
    this.checkPermission();
  }

  /**
   * Check current notification permission
   */
  private async checkPermission(): Promise<void> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      this.enabled = true;
    }
  }

  /**
   * Request notification permission from user
   */
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      this.enabled = true;
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      this.enabled = permission === 'granted';
      return this.enabled;
    }

    return false;
  }

  /**
   * Show a notification
   */
  async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (!this.enabled) {
      // Try to request permission if not enabled
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    try {
      new Notification(title, {
        icon: '⏰',
        badge: '⏰',
        vibrate: [200, 100, 200],
        requireInteraction: true,
        ...options,
      });
    } catch (error) {
      console.warn('Failed to show notification:', error);
    }
  }

  /**
   * Show timer finished notification
   */
  async showTimerFinished(): Promise<void> {
    await this.showNotification('Timer abgelaufen!', {
      body: 'Deine fokussierte Arbeitszeit ist vorbei. Zeit für eine Pause!',
      tag: 'timer-finished',
    });
  }

  /**
   * Enable or disable notifications
   */
  async setEnabled(enabled: boolean): Promise<boolean> {
    if (enabled) {
      return await this.requestPermission();
    } else {
      this.enabled = false;
      return false;
    }
  }

  /**
   * Check if notifications are enabled
   */
  isEnabled(): boolean {
    return this.enabled && Notification.permission === 'granted';
  }
}
