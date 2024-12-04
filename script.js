let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.rotating = false;
    this.init();
  }

  init() {
    this.paper.addEventListener('mousedown', this.startDrag.bind(this));
    this.paper.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });

    window.addEventListener('mousemove', this.drag.bind(this));
    window.addEventListener('touchmove', this.drag.bind(this), { passive: false });

    window.addEventListener('mouseup', this.endDrag.bind(this));
    window.addEventListener('touchend', this.endDrag.bind(this));
  }

  startDrag(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    if (e.type === 'mousedown') {
      this.startX = e.clientX;
      this.startY = e.clientY;
    } else if (e.type === 'touchstart') {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    }

    this.prevX = this.startX;
    this.prevY = this.startY;

    this.paper.style.zIndex = highestZ;
    highestZ += 1;
  }

  drag(e) {
    if (!this.holdingPaper) return;

    if (e.type === 'mousemove') {
      this.currentX = e.clientX;
      this.currentY = e.clientY;
    } else if (e.type === 'touchmove') {
      e.preventDefault();
      this.currentX = e.touches[0].clientX;
      this.currentY = e.touches[0].clientY;
    }

    this.velX = this.currentX - this.prevX;
    this.velY = this.currentY - this.prevY;

    this.prevX = this.currentX;
    this.prevY = this.currentY;

    this.paper.style.transform = `translate(${this.currentX - this.startX}px, ${this.currentY - this.startY}px) rotate(${this.rotation}deg)`;
  }

  endDrag() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));
