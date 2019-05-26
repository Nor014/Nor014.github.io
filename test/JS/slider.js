'use strict'

const forwardButton = document.querySelector('.forward_button'),
  backButton = document.querySelector('.back_button'),
  reviewBlock = document.querySelectorAll('.review'),
  authorAvatar = document.querySelector('.author_avatar'),
  authorName = document.querySelector('.author_name'),
  authorCareer = document.querySelector('.author_career'),
  pagination = document.querySelectorAll('.pagination_item')


let reviewAuthors = [
  {
    avatar: './img/Timur.png',
    name: 'Тимур Родригез',
    career: 'Шоумен, певец,<br>телеведущий'
  },
  {
    avatar: './img/Wild.jpg',
    name: 'Алена Заварзина и Вик Уайлд',
    career: 'Призеры Олимпийских игр-2014, сноубордисты, <br>заслуженные мастера спорта России'
  },
  {
    avatar: './img/Semenihin.jpg',
    name: 'Денис Семенихин',
    career: 'Телеведущий, эксперт в области фитнеса <br>и правильного питания'
  },
  {
    avatar: './img/Photo1.jpg',
    name: 'Костя Цзю',
    career: 'Абсолютный чемпион мира по боксу, <br>заслуженный мастер спорта СССР'
  }
]

forwardButton.addEventListener('click', slideForward)
backButton.addEventListener('click', slideBack)


let counter = 0;

function slideForward() {

  if (counter === reviewBlock.length - 1) return;

  reviewBlock[counter].classList.remove('active')
  reviewBlock[counter].classList.add('slide_back')
  pagination[counter].classList.remove('current')

  counter++

  reviewBlock[counter].classList.add('active')
  pagination[counter].classList.add('current')


  authorAvatar.style.backgroundImage = `url(${reviewAuthors[counter].avatar})`;
  authorName.innerHTML = reviewAuthors[counter].name;
  authorCareer.innerHTML = reviewAuthors[counter].career;
}

function slideBack() {

  if (counter === 0) return

  reviewBlock[counter].classList.remove('active')
  pagination[counter].classList.remove('current')

  counter--

  pagination[counter].classList.add('current')
  reviewBlock[counter].classList.remove('slide_back')
  reviewBlock[counter].classList.add('active')

  authorAvatar.style.backgroundImage = `url(${reviewAuthors[counter].avatar})`;
  authorName.innerHTML = reviewAuthors[counter].name;
  authorCareer.innerHTML = reviewAuthors[counter].career;
}