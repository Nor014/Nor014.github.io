'use strict';
const longPoolingDivs = document.querySelectorAll('.long-pooling div')

function longPooling() {
  fetch('https://neto-api.herokuapp.com/comet/long-pooling')
    .then(res => res.json())
    .then(data => {
      longPoolingDivs.forEach(div => div.classList.remove('flip-it'));
      longPoolingDivs[data - 1].classList.add('flip-it');
      longPooling()
    })
}

longPooling()