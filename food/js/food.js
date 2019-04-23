'use strict';

const pic = document.querySelector('[data-pic]'),
  title = document.querySelector('[data-title]'),
  ingredients = document.querySelector('[data-ingredients]'),
  rating = document.querySelector('[data-rating]'),
  votes = document.querySelector('[data-votes]'),
  consumers = document.querySelector('[data-consumers]'),
  star = document.querySelector('[data-star]')


function loadData(url) {
  let functionName = 'callback' + (Math.random() * 100).toFixed(0);
  return new Promise((done, fail) => {
    window[functionName] = done;

    let script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  })
}

function functionName(data) {

  console.log(data);

  if (data.id) {
    pic.style.backgroundImage = `url(${data.pic})`;
    title.innerHTML = data.title;
    data.ingredients.forEach(el => ingredients.innerHTML += el + ', '
    );
  }

  if (data.rating) {
    rating.innerHTML = data.rating.toFixed(2);
    votes.innerHTML = data.votes + ' оценок';
  }

  if (data.consumers) {
    let width = rating.innerText / 10 * 100;
    star.style.width = width + '%';

    data.consumers.forEach(el => {
      let consumer = document.createElement('img');
      consumer.src = el.pic;
      consumer.title = el.name;
      consumers.appendChild(consumer)
    })

    let numberOfConsumers = document.createElement('span');
    numberOfConsumers.innerHTML = `(+${data.total})`;
    consumers.appendChild(numberOfConsumers)
  }
}


loadData('https://neto-api.herokuapp.com/food/42')
  .then(functionName);

loadData('https://neto-api.herokuapp.com/food/42/rating')
  .then(functionName);

loadData('https://neto-api.herokuapp.com/food/42/consumers')
  .then(functionName);