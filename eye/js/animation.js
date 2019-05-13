'use strict';

const eye = document.querySelector('.big-book__eye');

let eyeCoords,
  bodyCoords,
  pageX,
  pageY

document.addEventListener('mousemove', () => {
  pageX = event.pageX;
  pageY = event.pageY;
});

function tick() {

  let centerX = document.body.getBoundingClientRect().width / 2
  let centerY = document.body.getBoundingClientRect().height / 2

  let positionX = (100 - pageX / centerX * 100).toFixed(0) * -0.3
  let positionY = (100 - pageY / centerY * 100).toFixed(0) * -0.3

  document.querySelector('.big-book__pupil').style.setProperty('--pupil-x', positionX + 'px');
  document.querySelector('.big-book__pupil').style.setProperty('--pupil-y', positionY + 'px');

  let max = Math.max(Math.abs(positionX), Math.abs(positionY))
  // console.log(max)

  if (Math.abs(30 / max) <= 3) {
    document.querySelector('.big-book__pupil').style.setProperty('--pupil-size', Math.abs(30 / max))
  }

  window.requestAnimationFrame(tick);

}

tick()



