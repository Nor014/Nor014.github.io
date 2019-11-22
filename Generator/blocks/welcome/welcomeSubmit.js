// submit animation
// const submit = document.querySelector('.form__submit-button');

let name;
let gender;

submit.addEventListener('click', welcomeSubmit)

function welcomeSubmit() {
  submitCheck();
}

function submitCheck() {
  let input = document.querySelector('.form__name-input');
  let radio = document.querySelectorAll('.radio__input');

  let inputValue = (input.value.length > 0);
  let radioValue = Array.from(radio).find(el => el.checked);

  if (inputValue && radioValue) {
    // запоминаем данные пользователя
    name = input.value;
    gender = Array.from(radio).find(el => el.checked).dataset.gender;
    // останавливаем куб
    cubeInterval(interval, true);

    // переключаемся на основной экран
    document.querySelector('.header').classList.add('show-header');
    document.querySelector('.welcome').classList.add('hide-welcome');

    // включаем spaceTheme
    // let spaceTheme = new Audio('blocks/welcome/spaceTheme.mp3');
    spaceTheme.loop = true;
    setTimeout(() => spaceTheme.play(), 500)
  } else {

    if (!inputValue) {
      input.classList.add('wrong-input');
      setTimeout(() => input.classList.remove('wrong-input'), 500)
    }

    if (!radioValue) {
      radio.forEach(el => {
        el.classList.add('wrong-input');
        setTimeout(() => el.classList.remove('wrong-input'), 500)
      })
    }
  }
  console.log(name, gender)
}

