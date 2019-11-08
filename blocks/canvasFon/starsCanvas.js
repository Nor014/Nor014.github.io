let starCanvas = document.querySelector('#canvas-stars'),
  starCtx = starCanvas.getContext('2d')

class Star {
  constructor() {
    this.x = Math.round(Math.random() * canvas.width);
    this.y = Math.round(Math.random() * canvas.height);
    this.radius = Math.random() * (1.5 - 0.5) + 0.5;
    this.opacity = +Math.random().toFixed(1);
    this.opacityStep = 0.1;
    this.color = `rgba(255, 255, 255, ${this.opacity}`;
  }

  drawStar = () => {
    starCtx.beginPath();
    starCtx.fillStyle = this.color;
    starCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    starCtx.fill();
    starCtx.closePath();
  }

  updateStar = () => {
    this.x = this.x + 0.5;
    this.y = this.y + 0.1;
  }

  shineStar = () => {
    this.opacity = this.opacity + this.opacityStep;
    this.color = `rgba(255, 255, 255, ${this.opacity}`;

    if (+this.opacity.toFixed(2) === 1.00) this.opacityStep = this.opacityStep * -1;
    if (+this.opacity.toFixed(2) === -0.50) this.opacityStep = this.opacityStep * -1;
  }
}


// Stars drawing
let starsMass = [];
let starsInterval;

function drawStars(amount, createNewStars = false) {
  starCtx.clearRect(0, 0, canvas.width, canvas.height);

  if (createNewStars) {
    starsMass = [];

    for (let i = 0; i < amount; i++) {
      starsMass.push(new Star())
    }

    clearInterval(starsInterval);
    starsInterval = setInterval(() => drawStars(1200), 100);
  }

  starsMass.forEach((star, index) => {
    star.updateStar()
    if (index % 5 === 0) star.shineStar();
    star.drawStar()
  })
}





