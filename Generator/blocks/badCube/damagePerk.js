const perkLeft = document.querySelector('.gidorum__cube_perk-left'),
  perkRight = document.querySelector('.gidorum__cube_perk-right'),
  perk = document.querySelectorAll('.gidorum__cube-perk'),
  perkBlink = document.querySelector('.gidorum__cube_perk-right_blink')

let shieldsInterval;

function damagePerk() {
  let currentPosition = perkLeft.getBoundingClientRect();

  let pathForLeft = gidorumBlock.getBoundingClientRect().x - currentPosition.x - currentPosition.width - 20;
  let pathForRight = gidorumBlock.getBoundingClientRect().x + gidorumBlock.getBoundingClientRect().width - currentPosition.x + 20;

  // реализация анимации - возращаем opacity, запускаем, display none
  clearInterval(shieldsInterval) //выключаем blink interval
  perk.forEach(el => el.classList.add('visible'));

  perkLeft.style.transition = ' 1s transform, 2.5s opacity';
  perkLeft.style.transform = `translateX(${pathForLeft}px)`;
  perkLeft.style.opacity = '0';

  perkRight.style.transition = ' 1s transform, 2.5s opacity';
  perkRight.style.transform = `translateX(${pathForRight}px)`;
  perkRight.style.opacity = '0';

  setTimeout(() => {
    perkLeft.style.display = 'none';
    perkRight.style.display = 'none';
  }, 800)

  // уничтожение кубов
  setTimeout(() => {
    document.querySelectorAll('.bad-cube-clone').forEach(el => cubeBoom(el));
  }, 200)

}

function refreshShields() {
  shieldsInterval = setInterval(() => {
    perkBlink.classList.toggle('blink');
  }, 500)
}

function refreshPerk() {
  perkLeft.style.display = 'block';
  perkRight.style.display = 'block';

  perkLeft.style.transition = ' none';
  perkLeft.style.transform = `translateX(0px)`;

  perkLeft.style.opacity = '1';
  perkLeft.classList.remove('visible')

  perkRight.style.transition = ' none';
  perkRight.style.transform = `translateX(0px)`;
  perkRight.style.opacity = '1';
  perkRight.classList.remove('visible')

  refreshShields()

  document.addEventListener('keydown', usePerk)
}

document.addEventListener('keydown', usePerk)

function usePerk() {
  let levelData = getLevelParams(level);
  if (levelData.perk && event.code === 'Space') damagePerk();

  document.removeEventListener('keydown', usePerk)
}