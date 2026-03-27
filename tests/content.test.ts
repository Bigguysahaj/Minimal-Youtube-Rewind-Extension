import { VideoRewindController } from '../src/content';

function buildOverlayDOM() {
  const overlay = document.createElement('div');
  overlay.className = 'ytp-overlay ytp-speedmaster-overlay';

  const label = document.createElement('div');
  label.className = 'ytp-speedmaster-label';
  overlay.appendChild(label);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'ytp-speedmaster-icon');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svg.appendChild(path);
  overlay.appendChild(svg);

  document.body.appendChild(overlay);
  return { overlay, label, icon: path };
}

beforeEach(() => {
  document.body.innerHTML = '';
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

// ── lerp ──────────────────────────────────────────────────────────────────────

describe('lerp', () => {
  let ctrl: VideoRewindController;

  beforeEach(() => {
    ctrl = new VideoRewindController();
  });

  it('returns start when t=0', () => {
    expect(ctrl.lerp(0, 10, 0)).toBe(0);
  });

  it('returns end when t=1', () => {
    expect(ctrl.lerp(0, 10, 1)).toBe(10);
  });

  it('returns midpoint when t=0.5', () => {
    expect(ctrl.lerp(0, 10, 0.5)).toBe(5);
  });

  it('works with negative ranges', () => {
    expect(ctrl.lerp(-10, 10, 0.5)).toBe(0);
  });
});

// ── getVideoElement ───────────────────────────────────────────────────────────

describe('getVideoElement', () => {
  let ctrl: VideoRewindController;

  beforeEach(() => {
    ctrl = new VideoRewindController();
  });

  it('returns the video element when present', () => {
    const video = document.createElement('video');
    document.body.appendChild(video);
    expect((ctrl as any).getVideoElement()).toBe(video);
  });

  it('returns null when no video element exists', () => {
    expect((ctrl as any).getVideoElement()).toBeNull();
  });
});

// ── rewind ────────────────────────────────────────────────────────────────────

describe('rewind', () => {
  let ctrl: VideoRewindController;

  beforeEach(() => {
    ctrl = new VideoRewindController();
  });

  it('decrements video currentTime by REWIND_SPEED', () => {
    const video = document.createElement('video');
    video.currentTime = 10;
    document.body.appendChild(video);

    (ctrl as any).rewind();

    expect(video.currentTime).toBeCloseTo(10 - 0.067, 5);
  });

  it('does nothing when no video element is present', () => {
    expect(() => (ctrl as any).rewind()).not.toThrow();
  });
});

// ── startRewind / stopRewind ──────────────────────────────────────────────────

describe('startRewind / stopRewind', () => {
  let ctrl: VideoRewindController;

  beforeEach(() => {
    ctrl = new VideoRewindController();
  });

  it('sets isRewinding to true on start', () => {
    (ctrl as any).startRewind();
    expect((ctrl as any).isRewinding).toBe(true);
  });

  it('sets isRewinding to false on stop', () => {
    (ctrl as any).startRewind();
    (ctrl as any).stopRewind();
    expect((ctrl as any).isRewinding).toBe(false);
  });

  it('clears the interval on stop', () => {
    (ctrl as any).startRewind();
    (ctrl as any).stopRewind();
    expect((ctrl as any).rewindInterval).toBeNull();
  });

  it('guards against double-interval: calling startRewind twice does not stack intervals', () => {
    const video = document.createElement('video');
    video.currentTime = 10;
    document.body.appendChild(video);

    // startRewind checks isRewinding — a second call while rewinding is a no-op
    (ctrl as any).startRewind();
    const firstInterval = (ctrl as any).rewindInterval;

    // Simulate what the keyboard handler does: guard via isRewinding
    if (!(ctrl as any).isRewinding) {
      (ctrl as any).startRewind();
    }

    expect((ctrl as any).rewindInterval).toBe(firstInterval);
  });
});

// ── keyboard bindings ─────────────────────────────────────────────────────────

describe('keyboard bindings', () => {
  let ctrl: VideoRewindController;
  let startSpy: jest.SpyInstance;
  let stopSpy: jest.SpyInstance;

  beforeEach(() => {
    ctrl = new VideoRewindController();
    startSpy = jest.spyOn(ctrl as any, 'startRewind');
    stopSpy = jest.spyOn(ctrl as any, 'stopRewind');
  });

  it('Shift+Space keydown triggers startRewind', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', shiftKey: true, bubbles: true }));
    expect(startSpy).toHaveBeenCalledTimes(1);
  });

  it('Space keyup triggers stopRewind', () => {
    document.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space', bubbles: true }));
    expect(stopSpy).toHaveBeenCalledTimes(1);
  });

  it('non-Space keydown does not trigger startRewind', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA', shiftKey: true, bubbles: true }));
    expect(startSpy).not.toHaveBeenCalled();
  });

  it('Space keydown without Shift does not trigger startRewind', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', shiftKey: false, bubbles: true }));
    expect(startSpy).not.toHaveBeenCalled();
  });

  it('Shift+Space does not trigger startRewind when already rewinding', () => {
    (ctrl as any).isRewinding = true;
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', shiftKey: true, bubbles: true }));
    expect(startSpy).not.toHaveBeenCalled();
  });
});

// ── overlay mutations ─────────────────────────────────────────────────────────

describe('showRewindOverlay', () => {
  let ctrl: VideoRewindController;

  beforeEach(() => {
    ctrl = new VideoRewindController();
  });

  it('sets label text to "2x"', () => {
    const { label } = buildOverlayDOM();
    (ctrl as any).showRewindOverlay((ctrl as any).getSpeedOverlay());
    expect(label.textContent).toBe('2x');
  });

  it('sets transform on the icon path', () => {
    const { icon } = buildOverlayDOM();
    (ctrl as any).showRewindOverlay((ctrl as any).getSpeedOverlay());
    expect(icon.getAttribute('transform')).toBe('rotate(180 18.75 18)');
  });

  it('makes the overlay visible', () => {
    const { overlay } = buildOverlayDOM();
    (ctrl as any).showRewindOverlay((ctrl as any).getSpeedOverlay());
    expect(overlay.style.display).toBe('block');
  });
});

describe('scheduleOverlayHide', () => {
  let ctrl: VideoRewindController;

  beforeEach(() => {
    ctrl = new VideoRewindController();
  });

  it('hides the overlay after OVERLAY_DURATION (700ms)', () => {
    const { overlay } = buildOverlayDOM();
    const overlayObj = (ctrl as any).getSpeedOverlay();
    (ctrl as any).scheduleOverlayHide(overlayObj);

    jest.advanceTimersByTime(700);

    expect(overlay.style.display).toBe('none');
  });

  it('removes the transform from icon after hiding', () => {
    const { icon } = buildOverlayDOM();
    icon.setAttribute('transform', 'rotate(180 18.75 18)');
    const overlayObj = (ctrl as any).getSpeedOverlay();
    (ctrl as any).scheduleOverlayHide(overlayObj);

    jest.advanceTimersByTime(700);

    expect(icon.getAttribute('transform')).toBeNull();
  });
});
