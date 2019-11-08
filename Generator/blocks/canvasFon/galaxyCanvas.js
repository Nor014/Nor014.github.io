let galaxyCanvas = document.querySelector('#canvas-galaxy'),
  galaxyCtx = galaxyCanvas.getContext('2d')

function colorRandom() {
  let colors = ['#4ddff6', '#e61115', '#017bc8', '#017bc8', '#d3919f', '#9f1c22']
  return colors[Math.round(Math.random() * colors.length - 1)]
}

class Galaxy {
  constructor() {
    this.x = Math.round(Math.random() * galaxyCanvas.width);
    this.y = Math.round(Math.random() * galaxyCanvas.height);
    this.radius = Math.round(Math.random() * (200 - 150) + 150)
    this.color = colorRandom();
    this.shadowBlur = Math.round(Math.random() * (200 - 100) + 100)
  }

  drawGalaxy = () => {
    for (let i = 0; i <= 3; i++) {
      galaxyCtx.beginPath();
      galaxyCtx.globalAlpha = 0.1;

      let color = colorRandom()

      galaxyCtx.fillStyle = color;
      galaxyCtx.filter = 'blur(80px)'

      galaxyCtx.shadowColor = color;
      galaxyCtx.shadowBlur = 100;

      if (i === 0) {
        galaxyCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      }

      if (i === 1) {
        galaxyCtx.rect(this.x, this.y, this.x / 4, this.y / 4);
      }

      if (i === 2) {
        galaxyCtx.arc(this.x - this.radius * Math.random(), this.y + this.radius * Math.random(), this.radius, 0, Math.PI * 2);
      }

      if (i === 3) {
        galaxyCtx.rect(this.x, this.y, this.x + 50, this.y + 50);
      }

      galaxyCtx.fill();
    }
  }
}

let galaxyMass = []

function createGalaxy(amount, createNewGalaxy = false) {
  galaxyCtx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height)

  if (createNewGalaxy) {
    galaxyMass = [];

    for (let i = 0; i <= amount - 1; i++) {
      galaxyMass.push(new Galaxy())
    }
  }

  galaxyMass.forEach(el => el.drawGalaxy())

}

