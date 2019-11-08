let canvas = document.querySelector('#canvas-planets'),
  ctx = canvas.getContext('2d');

window.addEventListener('resize', getCanvasSize);
window.onload = getCanvasSize();

function getCanvasSize() {
  let canvasWrapData = document.querySelector('.canvas-wrap').getBoundingClientRect();

  document.querySelectorAll('.canvas').forEach(canvas => {
    canvas.width = canvasWrapData.width;
    canvas.height = canvasWrapData.height;
  })
}

function colorRandom() {
  let colors = ['#FFF', '#4ddff6', '#e61115', '#017bc8', '#017bc8', '#d3919f', '#9f1c22']
  return colors[Math.round(Math.random() * colors.length - 1)]
}

function createTextureData(x, y, radius, amount) {
  let texturesMass = [];

  for (let i = 0; i <= amount; i++) {
    let textura = {
      x: x + (Math.random() * radius),
      y: y + (Math.random() * radius),
      radius: radius / Math.random() * (5 - 1) + 1,
      color: 'grey'
    }

    texturesMass.push(textura)
  }

  return texturesMass;
}

class Point {
  constructor() {
    this.x = Math.round(Math.random() * canvas.width);
    this.y = Math.round(Math.random() * canvas.height);
    this.radius = Math.round(Math.random() * (30 - 10) + 10);
    this.color = '#fff';
    this.shadowBlur = Math.round(Math.random() * (20 - 10) + 10);
    this.impulse = this.radius + 3;
    this.impulseOpacity = 0.9;
    this.impulseColor = `rgba(255, 255, 255, ${this.impulseOpacity})`;
    // this.texturesMass = createTextureData(this.x, this.y, this.radius, 5);
  }

  drawPoint = () => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  drawImpulse = () => {
    ctx.beginPath();
    ctx.fillStyle = this.impulseColor;
    ctx.arc(this.x, this.y, this.impulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    this.impulse += 2;
    this.impulseOpacity -= 0.05;
    this.impulseColor = `rgba(255, 255, 255, ${this.impulseOpacity})`;
  }
}

let points = [];

function drawPoints(number = 10, createNewPoints = false, impulse = false, impulseElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (createNewPoints) {
    points = [];

    for (let i = 0; i < number; i++) {
      points.push(new Point())
    }
  }

  points.forEach((el, index) => {
    el.drawPoint()
  })

  if (impulse) {
    impulseElement.drawImpulse();
  }
}