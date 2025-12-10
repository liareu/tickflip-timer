// PWA Install Prompt Handler
export class PWAManager {
  private deferredPrompt: any = null;
  private isInstalled = false;

  constructor() {
    this.init();
  }

  private init() {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.deferredPrompt = null;
    });
  }

  public async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    this.deferredPrompt = null;
    return outcome === 'accepted';
  }

  public canInstall(): boolean {
    return this.deferredPrompt !== null;
  }

  public isAppInstalled(): boolean {
    return this.isInstalled;
  }
}

// Generate app icons dynamically using Canvas
export function generateAppIcon(size: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  // Timer circle
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;

  // Background circle
  ctx.strokeStyle = '#FFFFFF';
  ctx.globalAlpha = 0.2;
  ctx.lineWidth = size * 0.03;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();

  // Progress arc (3/4)
  ctx.globalAlpha = 1;
  ctx.lineWidth = size * 0.04;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, Math.PI, false);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(centerX, centerY, size * 0.04, 0, 2 * Math.PI);
  ctx.fill();

  return canvas.toDataURL('image/png');
}

// Install all icon sizes
export async function installPWAIcons() {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  
  for (const size of sizes) {
    const dataUrl = generateAppIcon(size);
    
    // Create a link element to cache the icon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.sizes = `${size}x${size}`;
    link.href = dataUrl;
    document.head.appendChild(link);
  }
}
