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
// private static readonly UPDATE_INTERVAL = 16.67; // ~60fps
VideoRewindController.UPDATE_INTERVAL = 33.33; // ~30fps
VideoRewindController.OVERLAY_DURATION = 700; // ms
new VideoRewindController();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHVCQUF1QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLG9EQUFvRDtBQUNwRCwrQ0FBK0M7QUFDL0MsOENBQThDO0FBQzlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veW91dHViZS1yZXdpbmQtZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5jbGFzcyBWaWRlb1Jld2luZENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pc1Jld2luZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmV3aW5kSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGVycCA9IChzdGFydCwgZW5kLCB0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGFydCAqICgxIC0gdCkgKyBlbmQgKiB0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplS2V5Ym9hcmRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0VmlkZW9FbGVtZW50KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xyXG4gICAgfVxyXG4gICAgZ2V0U3BlZWRPdmVybGF5KCkge1xyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXRwLW92ZXJsYXkueXRwLXNwZWVkbWFzdGVyLW92ZXJsYXknKTtcclxuICAgICAgICBpZiAoIW92ZXJsYXkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IG92ZXJsYXksXHJcbiAgICAgICAgICAgIGxhYmVsOiBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy55dHAtc3BlZWRtYXN0ZXItbGFiZWwnKSxcclxuICAgICAgICAgICAgaWNvbjogb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcueXRwLXNwZWVkbWFzdGVyLWljb24gcGF0aCcpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJld2luZCgpIHtcclxuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMuZ2V0VmlkZW9FbGVtZW50KCk7XHJcbiAgICAgICAgaWYgKCF2aWRlbylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lIC09IFZpZGVvUmV3aW5kQ29udHJvbGxlci5SRVdJTkRfU1BFRUQ7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPdmVybGF5KCkge1xyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmdldFNwZWVkT3ZlcmxheSgpO1xyXG4gICAgICAgIGlmICghb3ZlcmxheSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2hvd1Jld2luZE92ZXJsYXkob3ZlcmxheSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU92ZXJsYXlIaWRlKG92ZXJsYXkpO1xyXG4gICAgfVxyXG4gICAgc2hvd1Jld2luZE92ZXJsYXkob3ZlcmxheSkge1xyXG4gICAgICAgIGNvbnN0IHsgZWxlbWVudCwgbGFiZWwsIGljb24gfSA9IG92ZXJsYXk7XHJcbiAgICAgICAgaWYgKGxhYmVsKVxyXG4gICAgICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9ICcyeCc7XHJcbiAgICAgICAgaWYgKGljb24pXHJcbiAgICAgICAgICAgIGljb24uc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLCAncm90YXRlKDE4MCAxOC43NSAxOCknKTtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG4gICAgc2NoZWR1bGVPdmVybGF5SGlkZShvdmVybGF5KSB7XHJcbiAgICAgICAgY29uc3QgeyBlbGVtZW50LCBsYWJlbCwgaWNvbiB9ID0gb3ZlcmxheTtcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsYWJlbClcclxuICAgICAgICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gJzJ4JztcclxuICAgICAgICAgICAgaWYgKGljb24pXHJcbiAgICAgICAgICAgICAgICBpY29uLnJlbW92ZUF0dHJpYnV0ZSgndHJhbnNmb3JtJyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCBWaWRlb1Jld2luZENvbnRyb2xsZXIuT1ZFUkxBWV9EVVJBVElPTik7XHJcbiAgICB9XHJcbiAgICBpbml0aWFsaXplS2V5Ym9hcmRMaXN0ZW5lcigpIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBldmVudC5jb2RlID09PSAnU3BhY2UnICYmICF0aGlzLmlzUmV3aW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UmV3aW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ1NwYWNlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wUmV3aW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXJ0UmV3aW5kKCkge1xyXG4gICAgICAgIHRoaXMuaXNSZXdpbmRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmV3aW5kSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5yZXdpbmQoKSwgVmlkZW9SZXdpbmRDb250cm9sbGVyLlVQREFURV9JTlRFUlZBTCk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPdmVybGF5KCk7XHJcbiAgICB9XHJcbiAgICBzdG9wUmV3aW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJld2luZEludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMucmV3aW5kSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aGlzLnJld2luZEludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1Jld2luZGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblZpZGVvUmV3aW5kQ29udHJvbGxlci5SRVdJTkRfU1BFRUQgPSAwLjA2NzsgLy8gfjE1IGZyYW1lcyBwZXIgc2Vjb25kXHJcbi8vIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFVQREFURV9JTlRFUlZBTCA9IDE2LjY3OyAvLyB+NjBmcHNcclxuVmlkZW9SZXdpbmRDb250cm9sbGVyLlVQREFURV9JTlRFUlZBTCA9IDMzLjMzOyAvLyB+MzBmcHNcclxuVmlkZW9SZXdpbmRDb250cm9sbGVyLk9WRVJMQVlfRFVSQVRJT04gPSA3MDA7IC8vIG1zXHJcbm5ldyBWaWRlb1Jld2luZENvbnRyb2xsZXIoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9