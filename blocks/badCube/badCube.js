const enemyButton = document.querySelector('.gidorum__btn'),
  badCube = document.querySelector('.bad-cube'),
  descriptionBlock = document.querySelector('.gidorum__description'),
  wrap = document.querySelector('.gidorum__wrap'),
  gidorumBlock = document.querySelector('.gidorum')

let level = 0;
let levelStage = 0;
let levelUp = false;

enemyButton.addEventListener('click', startLevel);

// уровни игры
function startLevel() {
  // отключаем описание
  if (levelStage === 0) descriptionBlock.style.display = 'none';

  let levelData = getLevelParams(level);

  if (levelData.stage[levelStage] !== undefined) { // смещаем врап, если есть следующая стадия левела
    wrap.style.transform = `translateX(${levelData.stage[levelStage].translateX}px)`;
  }
  // вызываем кубы
  setTimeout(() => {
    if (levelStage !== levelData.stage.length) {
      createEnemy(levelData.stage[levelStage].cubesAmount, 'gidorum', levelStage);
      levelStage++;
    } else {
      changeLevel()
      // активируем анимацию перка
      refreshShields()
    }
  }, 2000);
}

function restartLevel() {
  let levelData = getLevelParams(level);

  document.querySelectorAll('.bad-cube-clone').forEach(el => cubeBoom(el));
  wrap.style.transform = `translateX(${levelData.startWrapPosition}px)`;
  descriptionBlock.style.display = 'block';
  levelUp = true;
  setTimeout(() => levelUp = false, 2000);
  levelStage = 0;
}

function changeLevel() {
  level++;
  levelStage = 0;
  let levelParams = getLevelParams(level);

  wrap.style.transform = `translateX(${levelParams.startWrapPosition}px)`;
  descriptionBlock.style.transform = `translate(${levelParams.descriptionX}px, -50%)`;

  let descriptionBlockTitle = descriptionBlock.querySelector('.gidorum__title');
  descriptionBlockTitle.innerText = levelParams.title;

  let descriptionBlockText = descriptionBlock.querySelector('.gidorum__text');
  descriptionBlockText.innerText = levelParams.description;
  descriptionBlock.style.display = 'block';

  healing();

  if (levelParams.lastLevel) {
    enemyButton.innerHTML = 'Продолжить путешествие';
    enemyButton.removeEventListener('click', startLevel);

    enemyButton.addEventListener('click', () => {
      gidorumBlock.classList.remove('show-gidorum')
    })
  }
}

function createEnemy(amount, parentClass, levelStage) {
  let parent = document.querySelector(`.${parentClass}`);
  let parendData = parent.getBoundingClientRect();
  let gidorumWrapData = document.querySelector('.gidorum__wrap').getBoundingClientRect();
  let levelData = getLevelParams(level);

  for (let i = 1; i <= amount; i++) {
    let badCubeClone = badCube.cloneNode(true);
    badCubeClone.className = 'bad-cube bad-cube-clone';

    // Нахождение точки появления в зависимости от уровня
    badCubeClone.style.top = Math.random() * (parendData.height - 20) + 'px';

    if (levelStage === 0) {
      badCubeClone.style.right = Math.random() * 200 + 'px';
    } else if (levelStage === 1) {
      badCubeClone.style.right = Math.random() * 200 + 'px';
    } else if (levelStage === 2) {
      badCubeClone.style.left = Math.random() * 200 + 'px';
    } else if (levelStage === 3) {
      i % 2 === 0
        ? badCubeClone.style.left = Math.random() * 200 + 'px'
        : badCubeClone.style.right = Math.random() * 200 + 'px';
    }

    parent.appendChild(badCubeClone);

    // наведение на цель
    let badCubeCloneData = badCubeClone.getBoundingClientRect();
    let transformX = gidorumWrapData.x - badCubeCloneData.x;
    // Движение в случайную точку на Y оси
    let transformY = Math.random() * gidorumWrapData.height + gidorumWrapData.y - badCubeCloneData.y;
    badCubeClone.style.transition = `${levelData.stage[levelStage].transition}s linear transform`;
    badCubeClone.style.transform = `translate(${transformX}px, ${transformY}px)`;

    // при клике уничтожаем куб
    badCubeClone.addEventListener('mousedown', () => cubeBoom(badCubeClone));

    // Отслеживаем движение куба, по достижению цели - взрываем
    let interval = setInterval(() => {
      badCubeCloneData = badCubeClone.getBoundingClientRect();

      if (badCubeCloneData.x + badCubeCloneData.width > gidorumWrapData.x
        && badCubeCloneData.x < gidorumWrapData.x + gidorumWrapData.width) {
        cubeBoom(badCubeClone);
        getDamage();
        clearInterval(interval);
      }
    }, 100)
  }
}

const xp = document.querySelector('.gidorum__HP-inner');
let XPLine = 100;

function healing() {
  setTimeout(() => {
    XPLine = 100;
    xp.style.width = `${XPLine}%`;
  }, 500);
}

function getDamage() {
  // мигание красным при попадании
  let gidorumWrap = document.querySelector('.gidorum__wrap');
  gidorumWrap.classList.add('gidorum_damaged');

  setTimeout(() => gidorumWrap.classList.remove('gidorum_damaged'), 100);

  if (XPLine !== 0) {
    XPLine -= 10;
    xp.style.width = `${XPLine}%`;
  } else {
    // Поражение - рестарт + востанавливаем хп
    healing();
    restartLevel();

    // востанавливаем перк
    if (getLevelParams(level).perk) refreshPerk()
  }
}


function cubeBoom(badCube) {
  badCube.querySelectorAll('.bad-cube__rect').forEach(el => {
    let transformSec = 0.8;
    let opacitySec = Math.random() * (1.5 - 1) + 1;
    let randomX = Math.random() > 0.5 ? Math.random() * (40 - 30) + 30 : - (Math.random() * (40 - 30) + 30)
    let randomY = Math.random() > 0.5 ? Math.random() * (40 - 30) + 30 : - (Math.random() * (40 - 30) + 30)
    let rotate = Math.random() > 0.8 ? 1 : 0;

    badCube.style.backgroundColor = 'transparent';
    badCube.style.boxShadow = 'none';

    el.style.transition = `transform ${transformSec}s, opacity ${opacitySec}s `
    el.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotate}turn)`;
    el.style.opacity = 0;
  })

  setTimeout(() => badCube.remove(), 1000);

  // проверка сколько кубов осталось, после удаления куба из DOM для детекта прохождения уровня
  setTimeout(() => {
    if (document.querySelectorAll('.bad-cube').length === 1 && !levelUp) {
      // Запускаем новый левел, если levelUp = false, 
      // и меняем на true на 1 секунду чтобы избежать повторного запуска уровня при одновременном взрыве кубов
      startLevel();
      levelUp = true;
      setTimeout(() => levelUp = false, 1000);
    }
  }, 1100)
}

