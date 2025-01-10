/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*************************!*\
  !*** ./src/content.tsx ***!
  \*************************/

class VideoRewindController {
    constructor() {
        this.isRewinding = false;
        this.rewindInterval = null;
        this.lerp = (start, end, t) => {
            return start * (1 - t) + end * t;
        };
        this.initializeKeyboardListener();
    }
    getVideoElement() {
        return document.querySelector('video');
    }
    getSpeedOverlay() {
        const overlay = document.querySelector('.ytp-overlay.ytp-speedmaster-overlay');
        if (!overlay)
            return null;
        return {
            element: overlay,
            label: overlay.querySelector('.ytp-speedmaster-label'),
            icon: overlay.querySelector('.ytp-speedmaster-icon path')
        };
    }
    rewind() {
        const video = this.getVideoElement();
        if (!video)
            return;
        video.currentTime -= VideoRewindController.REWIND_SPEED;
    }
    handleOverlay() {
        const overlay = this.getSpeedOverlay();
        if (!overlay)
            return;
        this.showRewindOverlay(overlay);
        this.scheduleOverlayHide(overlay);
    }
    showRewindOverlay(overlay) {
        const { element, label, icon } = overlay;
        if (label)
            label.textContent = '2x';
        if (icon)
            icon.setAttribute('transform', 'rotate(180 18.75 18)');
        element.style.display = 'block';
    }
    scheduleOverlayHide(overlay) {
        const { element, label, icon } = overlay;
        window.setTimeout(() => {
            if (label)
                label.textContent = '2x';
            if (icon)
                icon.removeAttribute('transform');
            element.style.display = 'none';
        }, VideoRewindController.OVERLAY_DURATION);
    }
    initializeKeyboardListener() {
        document.addEventListener('keydown', (event) => {
            if (event.shiftKey && event.code === 'Space' && !this.isRewinding) {
                this.startRewind();
            }
        });
        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space') {
                this.stopRewind();
            }
        });
    }
    startRewind() {
        this.isRewinding = true;
        this.rewindInterval = window.setInterval(() => this.rewind(), VideoRewindController.UPDATE_INTERVAL);
        this.handleOverlay();
    }
    stopRewind() {
        if (this.rewindInterval) {
            window.clearInterval(this.rewindInterval);
            this.rewindInterval = null;
        }
        this.isRewinding = false;
    }
}
VideoRewindController.REWIND_SPEED = 0.067; // ~15 frames per second
VideoRewindController.UPDATE_INTERVAL = 16.67; // ~60fps
VideoRewindController.OVERLAY_DURATION = 700; // ms
new VideoRewindController();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHVCQUF1QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLCtDQUErQztBQUMvQyw4Q0FBOEM7QUFDOUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95b3V0dWJlLXJld2luZC1leHRlbnNpb24vLi9zcmMvY29udGVudC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbmNsYXNzIFZpZGVvUmV3aW5kQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmlzUmV3aW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXdpbmRJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sZXJwID0gKHN0YXJ0LCBlbmQsIHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0ICogKDEgLSB0KSArIGVuZCAqIHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVLZXlib2FyZExpc3RlbmVyKCk7XHJcbiAgICB9XHJcbiAgICBnZXRWaWRlb0VsZW1lbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XHJcbiAgICB9XHJcbiAgICBnZXRTcGVlZE92ZXJsYXkoKSB7XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55dHAtb3ZlcmxheS55dHAtc3BlZWRtYXN0ZXItb3ZlcmxheScpO1xyXG4gICAgICAgIGlmICghb3ZlcmxheSlcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZWxlbWVudDogb3ZlcmxheSxcclxuICAgICAgICAgICAgbGFiZWw6IG92ZXJsYXkucXVlcnlTZWxlY3RvcignLnl0cC1zcGVlZG1hc3Rlci1sYWJlbCcpLFxyXG4gICAgICAgICAgICBpY29uOiBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy55dHAtc3BlZWRtYXN0ZXItaWNvbiBwYXRoJylcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV3aW5kKCkge1xyXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgICAgICBpZiAoIXZpZGVvKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgLT0gVmlkZW9SZXdpbmRDb250cm9sbGVyLlJFV0lORF9TUEVFRDtcclxuICAgIH1cclxuICAgIGhhbmRsZU92ZXJsYXkoKSB7XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuZ2V0U3BlZWRPdmVybGF5KCk7XHJcbiAgICAgICAgaWYgKCFvdmVybGF5KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zaG93UmV3aW5kT3ZlcmxheShvdmVybGF5KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT3ZlcmxheUhpZGUob3ZlcmxheSk7XHJcbiAgICB9XHJcbiAgICBzaG93UmV3aW5kT3ZlcmxheShvdmVybGF5KSB7XHJcbiAgICAgICAgY29uc3QgeyBlbGVtZW50LCBsYWJlbCwgaWNvbiB9ID0gb3ZlcmxheTtcclxuICAgICAgICBpZiAobGFiZWwpXHJcbiAgICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gJzJ4JztcclxuICAgICAgICBpZiAoaWNvbilcclxuICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoMTgwIDE4Ljc1IDE4KScpO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9XHJcbiAgICBzY2hlZHVsZU92ZXJsYXlIaWRlKG92ZXJsYXkpIHtcclxuICAgICAgICBjb25zdCB7IGVsZW1lbnQsIGxhYmVsLCBpY29uIH0gPSBvdmVybGF5O1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxhYmVsKVxyXG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSAnMngnO1xyXG4gICAgICAgICAgICBpZiAoaWNvbilcclxuICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlQXR0cmlidXRlKCd0cmFuc2Zvcm0nKTtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIFZpZGVvUmV3aW5kQ29udHJvbGxlci5PVkVSTEFZX0RVUkFUSU9OKTtcclxuICAgIH1cclxuICAgIGluaXRpYWxpemVLZXlib2FyZExpc3RlbmVyKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LmNvZGUgPT09ICdTcGFjZScgJiYgIXRoaXMuaXNSZXdpbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRSZXdpbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSAnU3BhY2UnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BSZXdpbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhcnRSZXdpbmQoKSB7XHJcbiAgICAgICAgdGhpcy5pc1Jld2luZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXdpbmRJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnJld2luZCgpLCBWaWRlb1Jld2luZENvbnRyb2xsZXIuVVBEQVRFX0lOVEVSVkFMKTtcclxuICAgICAgICB0aGlzLmhhbmRsZU92ZXJsYXkoKTtcclxuICAgIH1cclxuICAgIHN0b3BSZXdpbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmV3aW5kSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5yZXdpbmRJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRoaXMucmV3aW5kSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUmV3aW5kaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuVmlkZW9SZXdpbmRDb250cm9sbGVyLlJFV0lORF9TUEVFRCA9IDAuMDY3OyAvLyB+MTUgZnJhbWVzIHBlciBzZWNvbmRcclxuVmlkZW9SZXdpbmRDb250cm9sbGVyLlVQREFURV9JTlRFUlZBTCA9IDE2LjY3OyAvLyB+NjBmcHNcclxuVmlkZW9SZXdpbmRDb250cm9sbGVyLk9WRVJMQVlfRFVSQVRJT04gPSA3MDA7IC8vIG1zXHJcbm5ldyBWaWRlb1Jld2luZENvbnRyb2xsZXIoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9