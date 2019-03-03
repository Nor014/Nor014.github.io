'use strict';
const outputs = document.querySelectorAll('.error-message'),
      registForms = document.querySelector('.sign-up-htm'),
      loginForms = document.querySelector('.sign-in-htm');

registForms.addEventListener('submit', onSubmit);
loginForms.addEventListener('submit', newSubmit)

function onSubmit() {
  event.preventDefault();

  let registFormData = new FormData(document.querySelector('.sign-up-htm'));
  let obj = {};
  for (let [key, value] of registFormData) {
    obj[key] = value;
  }

  const requst = fetch('https://neto-api.herokuapp.com/signup', {
    body: JSON.stringify(obj),
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => { return (res.json()) })
    .then((data) => data.error ? outputs[1].innerHTML = data.message : outputs[1].innerHTML = `Пользователь ${data.name} успешно зарегистрирован`)
}

function newSubmit() {
  event.preventDefault();

  let registFormData = new FormData(document.querySelector('.sign-in-htm'));
  let obj = {};
  for (let [key, value] of registFormData) {
    obj[key] = value;
  }

  const requst = fetch('https://neto-api.herokuapp.com/signin', {
    body: JSON.stringify(obj),
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => { return (res.json()) })
    .then((data) => data.error ? outputs[0].innerHTML = data.message : outputs[0].innerHTML = `Пользователь ${data.name} успешно авторизован`)
}

