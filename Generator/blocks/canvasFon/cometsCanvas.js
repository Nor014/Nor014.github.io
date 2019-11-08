let cometCanvas = document.querySelector('#canvas-comets'),
  cometCtx = cometCanvas.getContext('2d')

class Comet {
  constructor() {
    this.x = Math.round(Math.random() * cometCanvas.width)
    this.y = Math.round(Math.random() * cometCanvas.height)
    this.startX = this.x
    this.startY = this.y
    this.finishX = Math.round(Math.random() * cometCanvas.width)
    this.finishY = Math.round(Math.random() * cometCanvas.height)
    this.iterations = 300
    this.stepX = +((this.finishX - this.x) / this.iterations).toFixed(2)
    this.stepY = +((this.finishY - this.y) / this.iterations).toFixed(2)

    this.opacity = 1;
    this.opacityStep = +(1 / (this.iterations - 90)).toFixed(3)
    this.shadowBlur = +(Math.random() * (1 - 0.5) + 0.5).toFixed(2)

    this.radius = 1
    this.timeout = Math.round(Math.random() * (25000 - 1000) + 1000)
  }

  drawComet = () => {
    if (this.timeout < 0) {
      cometCtx.beginPath();

      cometCtx.moveTo(this.startX, this.startY)
      cometCtx.lineTo(this.x, this.y)
      cometCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      cometCtx.closePath()

      cometCtx.shadowBlur = 15;
      cometCtx.shadowColor = '#fff';
      cometCtx.fillStyle = `rgba(204, 204, 201, ${this.opacity})`;
      cometCtx.fill();
    }
  }

  updateComet = () => {
    if (this.timeout < 0) {
      if (this.opacity > 0) {
        this.x += this.stepX
        this.y += this.stepY
        this.startX += this.stepX / 2
        this.startY += this.stepY / 2
        this.opacity -= this.opacityStep;
      } else return
    }
    this.timeout -= 100
  }
}

let cometsMass = [];
let cometInterval;

function createComets(amount, createNewComets = false) {
  cometCtx.clearRect(0, 0, cometCanvas.width, cometCanvas.height)
  if (createNewComets) {

    cometsMass = [];

    for (let i = 0; i <= amount; i++) {
      let comet = new Comet();
      cometsMass.push(comet)
    }

    clearInterval(cometInterval)
    cometInterval = setInterval(() => createComets(amount), 1000 / 60)
  }

  cometsMass.forEach(el => {
    el.drawComet()
    el.updateComet()
  })
}

