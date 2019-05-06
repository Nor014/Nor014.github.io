'use strict';

const pollingDivs = document.querySelectorAll('.pooling div')

setInterval(function () {
  fetch('https://neto-api.herokuapp.com/comet/pooling')
    .then(res => res.json())
    .then(data => {
      pollingDivs.forEach(el => el.classList.remove('flip-it'))
      pollingDivs[data - 1].classList.add('flip-it')
    })
}, 5000)

