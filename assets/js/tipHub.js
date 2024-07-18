// tipHub.js

class TipHub {
  static show(message, duration = 2000) {
    const tipHubElement = document.createElement('div');
    tipHubElement.classList.add('tip-hub');
    tipHubElement.textContent = message;

    document.body.appendChild(tipHubElement);

    setTimeout(() => {
      tipHubElement.classList.add('visible');
    }, 10);

    setTimeout(() => {
      this.hide(tipHubElement);
    }, duration);
  }

  static hide(tipHubElement) {
    tipHubElement.classList.remove('visible');

    setTimeout(() => {
      document.body.removeChild(tipHubElement);
    }, 300);
  }
}

