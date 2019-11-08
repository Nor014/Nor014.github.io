let generator = document.querySelector('.generator-button');
let gidorum = document.querySelector('.gidorum__button');

generator.addEventListener('click', closeGenerator);
gidorum.addEventListener('click', closeGidorum)

function closeGenerator() {
  document.querySelector('.generator').classList.toggle('show-generator');
  // удаляем все карточки
  document.querySelectorAll('.card').forEach(el => el.remove());
}

function closeGidorum() {
  document.querySelector('.gidorum').classList.toggle('show-gidorum');

  // при закрытии отключаем движение куба
  document.querySelector('.gidorum').classList.contains('show-gidorum')
    ? cubeMove()
    : cubeMove(true);
}

const navItems = document.querySelectorAll('.navigation_active');
navItems.forEach(el => {
  el.addEventListener('mouseenter', navHover);
  el.addEventListener('mouseleave', navHover);
})

// заглушаем Генератор при наведении на пункт меню
function navHover() {
  let generatorDiv = document.querySelector('.generator');
  generatorDiv.style.opacity = generatorDiv.style.opacity === '0.5' ? '1' : '0.5';
}