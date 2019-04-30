'use strict';

const canvas = document.getElementById('draw');
let ctx;
let maxLineWidth;
let minLineWidth;


function createCanvas() {
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

document.addEventListener('DOMContentLoaded', onLoad);
window.addEventListener('resize', clearCanvas);

function onLoad() {
  createCanvas();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createCanvas();
}

canvas.addEventListener('mousedown', onMousedown);
let mousedown = false;

function onMousedown() {
  mousedown = true;
}

function onMousedown() {
  mousedown = true;
}

canvas.addEventListener('mousemove', draw);

let moveToX;
let moveToY;
let lineWidth = 5;

let color = 1;
let maxColor = false;
let minColor = true;

function draw() {
  if (mousedown) {
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // толщина кисти

    if (lineWidth === 100) {
      maxLineWidth = true;
      minLineWidth = false;
    }

    if (lineWidth === 5) {
      minLineWidth = true;
      maxLineWidth = false;
    }

    maxLineWidth ? lineWidth-- : lineWidth++;
    ctx.lineWidth = lineWidth;

    //  цвет кисти

    ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;

    if (!event.shiftKey) {
      color === 359 ? color = 0 : color++
    } else {
      (event.shiftKey && color === 0) ? color = 359 : color--
    }

    // отрисовка

    if (moveToX !== undefined) {
      ctx.moveTo(moveToX, moveToY)
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      ctx.closePath();
    }

    moveToX = event.offsetX;
    moveToY = event.offsetY;
  }
}

canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseleave', stopDraw)

function stopDraw() {
  mousedown = false;
  moveToX = undefined;
  moveToY = undefined;
}


canvas.addEventListener('dblclick', () => {
  clearCanvas();
});


