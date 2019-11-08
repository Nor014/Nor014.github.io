// Lines drawing
let linesCanvas = document.querySelector('#canvas-lines'),
  linesCtx = linesCanvas.getContext('2d');

class Line {
  constructor(points, index) {
    // внешний вид
    this.width = 3;
    this.color = '#FFF';
    this.lineJoin = 'round';
    this.lineCup = 'round';
    // кординаты движения
    this.points = points;
    this.index = index;
    this.startX = points[index].x;
    this.startY = points[index].y;
    this.finishX = points[index + 1].x;
    this.finishY = points[index + 1].y;

    this.stepX = +((this.finishX - this.startX) / 35).toFixed(2);
    this.stepY = +((this.finishY - this.startY) / 35).toFixed(2);
    this.currentLineX = Math.round(this.startX + this.stepX);
    this.currentLineY = Math.round(this.startY + this.stepY);

    this.fullLile = false;
  }

  drawLine = () => {
    linesCtx.beginPath();

    linesCtx.lineWidth = this.width;
    linesCtx.strokeStyle = this.color;
    linesCtx.lineJoin = this.lineJoin;
    linesCtx.LineCup = this.lineCup;
    linesCtx.shadowBlur = 20;
    linesCtx.shadowColor = "#FFF";

    linesCtx.moveTo(this.startX, this.startY);
    linesCtx.lineTo(this.currentLineX, this.currentLineY);
    linesCtx.closePath();
    linesCtx.stroke();
    // console.log(this.currentLineX)
  }

  updateLine = () => {
    if (+this.currentLineX.toFixed(0) !== this.finishX) {
      this.currentLineX = +(this.currentLineX + this.stepX).toFixed(2);
      this.currentLineY = +(this.currentLineY + this.stepY).toFixed(2);
    } else {
      if (!this.fullLile) {
        activeLines++;
        this.fullLile = true;

        // Импульс волны от планет, устанавливаем интервал, передаем в него функцию отристовки планет
        let interval = setInterval(() => drawPoints(10, false, true, this.points[this.index + 1]), 1000 / 60);
        // Очищаем интервал 
        setTimeout(() => { clearInterval(interval), drawPoints(10, false, false) }, 300)
      } else return
    }
  }
}

let lines = [];
// можно регулировать одновременное рисование разным количеством линий меняя активные, по умолчанию одна
let activeLines = 0;

function createLines() {
  lines = [];

  for (let i = 0; i < points.length - 1; i++) {
    lines.push(new Line(points, i))
  }
}

function draw() {
  linesCtx.clearRect(0, 0, canvas.width, canvas.height);

  if (activeLines !== lines.length) {
    for (let i = 0; i <= activeLines; i++) {
      if (lines[i] !== undefined) {
        lines[i].drawLine(points, i)
        lines[i].updateLine();
      } else return window.requestAnimationFrame(draw)
    }
  } else {
    // инициализируется отрисовка всех канвасов
    drawStars(1200, 5, true);
    drawPoints(10, true);
    createComets(3, true);
    createGalaxy(3, true)
    createLines();
    activeLines = 0;
  }

  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)

