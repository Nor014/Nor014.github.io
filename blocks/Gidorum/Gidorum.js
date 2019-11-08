let gidoraInterval;

function cubeMove(stop = false) {
  const cubeInnerData = document.querySelector('.gidorum__cube-inner').getBoundingClientRect();
  const gidorumCube = document.querySelector('.gidorum__cube');

  if (!stop) {
    gidoraInterval = setInterval(() => {
      gidorumCube.style.transform = `translate(${Math.random() * (cubeInnerData.width - 20)}px, ${Math.random() * (cubeInnerData.height - 20)}px )`
    }, 500)
  } else {
    clearInterval(gidoraInterval)
  }
}

// Передвижение блока мышкой
// const cubeWrap = document.querySelector('.gidorum__wrap'),
//   gidorumBlock = document.querySelector('.gidorum');

// let data, currentTransform = 0;

// cubeWrap.addEventListener('mousedown', () => {
//   data = cubeWrap.getBoundingClientRect();
//   gidorumBlock.addEventListener('mousemove', moveWrap);
// })

// cubeWrap.addEventListener('mouseup', () => {
//   mouseDown = false;
//   gidorumBlock.removeEventListener('mousemove', moveWrap);
//   // Получаем текущий трансформ
//   currentTransform = moveWrap(true);
// })

// function moveWrap(givePathX = false) {
//   let pathX = currentTransform + event.pageX - data.x - data.width / 2;
//   cubeWrap.style.transform = `translateX(${pathX}px)`;

//   // возвращаем текущий трансформ для дальнейшей корректировки при новом клике
//   if (givePathX) return pathX
// }

// document.addEventListener('dblclick', () => {
//   console.log(event.target.getBoundingClientRect())
// })
