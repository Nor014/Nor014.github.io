'use strict';

document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
  counter.innerHTML = localStorage.counter ? localStorage.counter : 0;
  localStorage.setItem('counter', counter.innerHTML);
}

let buttons = document.querySelector(".wrap-btns");
let counter = document.getElementById('counter');

buttons.addEventListener('click', onClick);

// function onClick() {
//   if (event.target.id === 'increment') counter.innerHTML++
//   if (event.target.id === 'decrement' && counter.innerHTML > 0) counter.innerHTML--
//   if (event.target.id === 'reset') counter.innerHTML = 0;
//   localStorage.setItem('counter', counter.innerHTML);
// }

function onClick() {
  if (event.target.id === 'increment') localStorage.counter++;
  if (event.target.id === 'decrement' && localStorage.counter > 0) localStorage.counter--;
  if (event.target.id === 'reset') localStorage.counter = 0;
  counter.innerText = localStorage.counter;
}
