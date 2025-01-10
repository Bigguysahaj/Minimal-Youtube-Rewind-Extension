interface SpeedOverlay {
  element: HTMLElement;
  label: HTMLElement;
  icon: HTMLElement;
}

class VideoRewindController {
  private static readonly REWIND_SPEED = 0.067; // ~15 frames per second
  private static readonly UPDATE_INTERVAL = 16.67; // ~60fps
  private static readonly OVERLAY_DURATION = 700; // ms

  private isRewinding: boolean = false;
  private rewindInterval: number | null = null;

  constructor() {
    this.initializeKeyboardListener();
  }

  public lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  }

  private getVideoElement(): HTMLVideoElement | null {
    return document.querySelector('video');
  }

  private getSpeedOverlay(): SpeedOverlay | null {
    const overlay = document.querySelector('.ytp-overlay.ytp-speedmaster-overlay') as HTMLElement;
    if (!overlay) return null;

    return {
      element: overlay,
      label: overlay.querySelector('.ytp-speedmaster-label') as HTMLElement,
      icon: overlay.querySelector('.ytp-speedmaster-icon path') as HTMLElement
    };
  }

  private rewind(): void {
    const video = this.getVideoElement();
    if (!video) return;

    video.currentTime -= VideoRewindController.REWIND_SPEED;
  }

  private handleOverlay(): void {
    const overlay = this.getSpeedOverlay();
    if (!overlay) return;

    this.showRewindOverlay(overlay);
    this.scheduleOverlayHide(overlay);
  }

  private showRewindOverlay(overlay: SpeedOverlay): void {
    const { element, label, icon } = overlay;
    
    if (label) label.textContent = '2x';
    if (icon) icon.setAttribute('transform', 'rotate(180 18.75 18)');
    element.style.display = 'block';
  }

  private scheduleOverlayHide(overlay: SpeedOverlay): void {
    const { element, label, icon } = overlay;

    window.setTimeout(() => {
      if (label) label.textContent = '2x';
      if (icon) icon.removeAttribute('transform');
      element.style.display = 'none';
    }, VideoRewindController.OVERLAY_DURATION);
  }

  private initializeKeyboardListener(): void {
    document.addEventListener('keydown', (event: KeyboardEvent): void => {
      if (event.shiftKey && event.code === 'Space' && !this.isRewinding) {
        this.startRewind();
      }
    });

    document.addEventListener('keyup', (event: KeyboardEvent): void => {
      if (event.code === 'Space') {
        this.stopRewind();
      }
    });
  }

  private startRewind(): void {
    this.isRewinding = true;
    this.rewindInterval = window.setInterval(
      () => this.rewind(),
      VideoRewindController.UPDATE_INTERVAL
    );
    this.handleOverlay();
  }

  private stopRewind(): void {
    if (this.rewindInterval) {
      window.clearInterval(this.rewindInterval);
      this.rewindInterval = null;
    }
    this.isRewinding = false;
  }
}

new VideoRewindController();
