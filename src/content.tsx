document.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.shiftKey && event.code === 'Space') {
    const video: HTMLVideoElement | null = document.querySelector('video');
    if (video) {
      video.currentTime -= 1;
    }
    const overlay = document.querySelector('.ytp-overlay.ytp-speedmaster-overlay') as HTMLElement;
      if (overlay) {
        const label: HTMLElement = overlay.querySelector('.ytp-speedmaster-label') as HTMLElement;
        const icon: HTMLElement = overlay.querySelector('.ytp-speedmaster-icon path') as HTMLElement;
        if (label) {
          label.textContent = '1x';
        }
        if (icon) {
          icon.setAttribute('transform', 'rotate(180 18.75 18)');
        }
        overlay.style.display = 'block';

        const timeoutId = window.setTimeout(() => {
          if (label) label.textContent = '2x';
          overlay.style.display = 'none';

          if (icon) {
            icon.removeAttribute('transform');
          }
          
          window.clearTimeout(timeoutId);
        }, 700);
      }
  }
});
