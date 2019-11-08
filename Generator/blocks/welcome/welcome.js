// cube animation
const cube = document.querySelector('.cube'),
  cubeInner = document.querySelector('.form__content_part_rigth'),
  welcomeForm = document.querySelector('.welcome__form'),
  scoreBlock = document.querySelector('.form__score')

const welcomeFormData = welcomeForm.getBoundingClientRect();

let interval = 1000;
let transition = 1;
let score = 0;

cube.addEventListener('mousedown', cubeClick)

function cubeClick() {
  // pulse effect
  let traget = event.target;
  traget.classList.add('pulse');
  setTimeout(() => traget.classList.remove('pulse'), 1000);

  // set new Interval
  cube.style.pointerEvents = 'none'; // запрет на клик против дублирование кликов при попадании в куб
  interval -= 100;
  transition -= 0.1;

  // score
  score += 100;
  scoreBlock.innerText = score;

  // change theme
  if (interval === 300) {
    !welcomeForm.classList.contains('form_theme_dark') && changeTheme();
  }

  // screamer
  if (interval === 200) showScreamer();

  // hard-mode 
  if (interval === 100) {
    cubeInterval(interval, true);
    hardButton.disabled = false;
  } else {
    cubeInterval(interval)
  }
}

let tic;

function cubeInterval(cubeInterval, stopAnimate = false) {

  const cubeInnerData = cubeInner.getBoundingClientRect(),
    cubeData = cube.getBoundingClientRect();

  if (tic) clearInterval(tic)

  if (!stopAnimate) {

    tic = setInterval(() => {
      let xRandom = Math.random() * (cubeInnerData.width - cubeData.width);
      let yRandom = Math.random() * (cubeInnerData.height - cubeData.height);
      let rotate = Math.random() * 10 > 8 ? 2 : 0;

      cube.style.transition = `${transition}s transform`;

      if (cubeInterval < 400) {
        let scale = Math.random() * (2 - 1) + 1;
        cube.style.transform = `translate(${xRandom}px, ${yRandom}px) scale(${scale}) rotate(${rotate}turn)`;
      } else {
        cube.style.transform = `translate(${xRandom}px, ${yRandom}px) rotate(${rotate}turn)`;
      }

      //разрешаем клик после начала движения куба с новой скоростью
      if (cube.style.pointerEvents === 'none') cube.style.pointerEvents = 'auto';
    }, cubeInterval)

  } else {
    interval = 1000;
    transition = 1;
    score = 0;
  }
}

function showScreamer() {
  let timer = Math.random() * (2000 - 1000) + 1000;

  let screamer = new Audio('./blocks/screamer/3.mp3');

  setTimeout(() => {
    document.querySelector('.screamer').classList.add('sreamer_active');
    screamer.play()
  }, timer);

  setTimeout(() => document.querySelector('.screamer').classList.remove('sreamer_active'), timer + 800);
}

cubeInterval(interval);

// submit animation
const submit = document.querySelector('.form__submit-button');


// submit.addEventListener('click', submitAnimation)

function submitAnimation() {
  interval = 400;
  transition = 0.4;
  cubeInterval(interval, true);
  cubeBoost()
}

function cubeBoost() {
  if (interval > 0) {
    setTimeout(() => {
      cube.click();
      setTimeout(() => cubeBoost(), 500)
    }, 500)
  } else cubeInterval(interval, true)
}

// hard mode

const hardButton = document.querySelector('.form__hard-mode-button')
hardButton.addEventListener('click', onHardMode);

function onHardMode() {
  //останавливаем cube
  cubeInterval(interval, true);
  // увеличиваем поле
  document.querySelector('.form').classList.add('form_hard-mode');
  document.querySelector('.welcome__wrap').classList.add('wrap_hard-mode')
  document.querySelector('.form__content_part_rigth').classList.add('form__content_hard-mode');
  // запускаем cube
  cubeClick()

  hardButton.disabled = true;
}

// radio animation
const radio = document.querySelectorAll('.radio__lable')
radio.forEach(el => el.addEventListener('click', cubeFlight))

let transformMatrixArray,
  getTranslateXNumberValue,
  getTranslateYNumberValue;

function getTransform(element) {
  stringsArray = window.getComputedStyle(element).getPropertyValue('transform').split(',');
  xValue = parseFloat(stringsArray[stringsArray.length - 2]);
  yValue = parseFloat(stringsArray[stringsArray.length - 1]);
  return { x: xValue, y: yValue };
};

function cubeFlight() {
  if (event.target.classList.contains('radio__input')) {
    let target = event.target,
      targetData = target.getBoundingClientRect(),
      cubeData = cube.getBoundingClientRect(),
      cloneCube = document.querySelector('.clone-cube'),
      cloneCubeData;

    if (!cloneCube) {
      cloneCube = cube.cloneNode();

      cloneCube.className = cube.classList.contains('cube_theme_dark')
        ? 'cube clone-cube cube_theme_dark'
        : 'cube clone-cube';

      // отнимаем у позиции Y клона высоту оригинального куба
      var newYPos = getTransform(cube).y - 20;

      cloneCube.style.transform = 'translate(' + getTransform(cube).x + 'px, ' + newYPos + 'px)';
      cubeInner.appendChild(cloneCube);

      cloneCubeData = cloneCube.getBoundingClientRect();
      let pathX = targetData.x - cloneCubeData.x + getTransform(cube).x;
      let pathY = targetData.y - cloneCubeData.y + newYPos;

      cloneCube.style.transform = `translate(${pathX}px, ${pathY}px)`;

      target.classList.add('active');

    } else {
      if (!target.classList.contains('active')) {
        document.querySelectorAll('.radio__input').forEach(el => el.classList.remove('active'));

        cloneCubeData = cloneCube.getBoundingClientRect();

        let pathX = targetData.x - cloneCubeData.x + getTransform(cloneCube).x;
        let pathY = targetData.y - cloneCubeData.y + getTransform(cloneCube).y;

        cloneCube.style.transition = '0.6s'
        cloneCube.style.transform = `translate(${pathX}px, ${pathY}px)`;

        target.classList.add('active');
      }
    }
  }
}

// смена темы
let themeBtn = document.querySelector('.form__theme-change-button')

themeBtn.addEventListener('click', changeTheme)

function changeTheme() {

  document.querySelector('.welcome__wrap').classList.toggle('welcome_theme_dark');
  document.querySelector('.welcome__form').classList.toggle('form_theme_dark');
  document.querySelector('.form__submit-button').classList.toggle('button_theme_dark');
  document.querySelector('.cube').classList.toggle('cube_theme_dark');

  let cloneCube = document.querySelector('.clone-cube');

  if (cloneCube) {
    cloneCube.classList.contains('cube_theme_dark') ? cloneCube.classList.remove('cube_theme_dark')
      : cloneCube.classList.add('cube_theme_dark')
  }

  themeBtn.innerText = themeBtn.innerText === 'Dark theme' ? 'Light theme' : 'Dark theme';
}

// hover submit
const form = document.querySelector('.welcome__form'),
  welcomeWrap = document.querySelector('.welcome__wrap')

submit.addEventListener('mouseenter', () => {
  form.classList.contains('form_theme_dark') && form.classList.add('submit-mouse-in');
  welcomeWrap.classList.contains('welcome_theme_dark') && welcomeWrap.classList.add('submit-mouse-in');
})
submit.addEventListener('mouseleave', () => {
  form.classList.contains('form_theme_dark') && form.classList.remove('submit-mouse-in');
  welcomeWrap.classList.contains('welcome_theme_dark') && welcomeWrap.classList.remove('submit-mouse-in');
})