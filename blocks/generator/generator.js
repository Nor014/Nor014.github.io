const pidorBlock = document.querySelector('.pidor-block');
const container = document.querySelector('.cards');
const textarea = document.querySelector('.block');
const button = document.querySelector('.generator__button');

const base = ['ты пидор', 'хули ты смотришь', 'грешный пес', 'ебать ты лох', 'камеру вырубай нахуй', 'ты прекрасен', 'прекращай дрочить', 'обосратый гусь']
const testMass = ['Рысь, питон и их девченки вздумали устроить тусу...',
  'Холить и лелеять, смеяться с женщиной, уважить этническим танцем с тыквою в руках, шире смотреть на ее тело',
  'Непосредственному наставнику необходимо заполнить форму: указать ID менеджера, договор которого нужно перенести, и ID нового наставника. Затем заявка будет отправлена на подтверждение менеджеру, договор которого переносится.  После получения подтверждения от менеджера перенос будет сразу же осуществлен.'];

let WORD;
let i = 0; // Итератор для рекурсии функции, против бесконечного цикла

function wordRandom() {
  WORD = base[(Math.random() * (base.length - 1)).toFixed(0)]
}

button.addEventListener('click', createCard)

function createCard() {
  wordRandom() // устанавливаем искомое слово
  i++;
  console.log(WORD);

  let card = document.createElement('div'); // создаем карточку с текстом
  card.className = 'card';

  let letterDiv = document.createElement('div');
  letterDiv.className = 'card__letter-wrap'

  const blockText = document.querySelector('.generator__textarea').value,
    letters = blockText.split('');
  let includedLetters = [];

  letters.forEach(letter => { // для каждой буквы отдельный тег
    let p = document.createElement('p');

    p.innerText = letter;
    p.style.display = 'inline-block';
    p.style.transition = `all ${Math.random() * 2}s ease-out`;
    p.className = 'letter'

    if (letter === ' ') p.style.width = '5px'; // если пробел, необходимо задать физический размер во избежание схлопования пространства
    if (WORD.includes(letter)) p.classList.add('pidor-letter'); includedLetters.push(p); // формируем массив подходящих букв, задаем им особый класс 

    letterDiv.appendChild(p); // закидываем результат в карточку
  })

  card.appendChild(letterDiv)

  // тут - проверка достаточности букв, иначе рекурсия этой же функции с новым искомым выражением
  let sortedLetters = [];
  let desiredLetters = WORD.split('');

  // сортируем массив искомых букв в нужном порядке
  for (let i = 0; i <= desiredLetters.length; i++) {
    for (let y = 0; y < includedLetters.length; y++) {
      if (includedLetters[y].innerHTML === desiredLetters[i] && !sortedLetters.includes(includedLetters[y])) {
        sortedLetters.push(includedLetters[y]);
        break // ищем до первого совпадения, иначе будут задвоения букв 
      }
    }
  }

  let letter = card.querySelectorAll('.letter')

  let button = document.createElement('button');
  button.className = 'button card__button';
  button.innerText = 'Найти скрытый смысл';
  button.addEventListener('click', () => animate(letter, sortedLetters, WORD, card)) // обработчик анимации разброса букв

  card.appendChild(button);

  if (sortedLetters.length !== desiredLetters.length) {
    includedLetters = []; // обнуляем includedLetters массив для последующих проверок;
    sortedLetters = []; // обнуляем sortedLetters массив для последующих проверок;

    if (i > base.length * 2) {
      document.querySelector('.generator__textarea').value = 'данный текст не содержит тайного смысла';
      i = 0;
      return;
    } else createCard();

  } else {
    container.appendChild(card);
    document.querySelector('.generator__textarea').value = ''; //обнуляем textarea
    i = 0;
  }
}

function animate(letter, sortedLetters = [], word, card) { // разброс букв в цикле
  let letterAreaData = document.querySelector('.letters-area').getBoundingClientRect();
  let cardData = card.getBoundingClientRect();

  letter.forEach(el => {
    let letterData = el.getBoundingClientRect();
    let pathX = letterAreaData.x - letterData.x;
    let pathY = letterAreaData.y - letterData.y;

    // трансформация с учетом контейнера
    let randomX = Math.random() * letterAreaData.width + pathX + 'px';
    let randomY = Math.random() * letterAreaData.height + pathY + 'px';

    setTimeout(() => el.style.transform = `translate(${randomX}, ${randomY})`, Math.random() * 2000);
    setTimeout(() => el.style.transform = `translate(0, 0)`, 3000);
  })

  // Находим центр контейнера для букв
  let xCounter = (letterAreaData.x - cardData.x) + letterAreaData.width / 2 - 100;
  let yCounter = (letterAreaData.y - cardData.y) + letterAreaData.height / 2;

  sortedLetters.forEach(el => {
    let scale = Math.random() * (2.5 - 2) + 2;

    setTimeout(() => {
      el.classList.add('absolute');
      el.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
      el.style.transform = `translate(${xCounter}px, ${yCounter + Math.random() * (20 - 1) + 1}px) scale(${scale})`;
      xCounter += 20;
    }, 3000);

    setTimeout(() => { el.style.transform = `translate(0, 0) scale(1)`; el.classList.remove('absolute'); }, 6000);
  })
}

// close generator
const closeButton = document.querySelector('.generator__exit-button');
closeButton.addEventListener('click', closeGenerator)
