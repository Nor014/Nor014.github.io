'use strict';
const webSocetConnection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket')
const webSocetDivs = document.querySelectorAll('.websocket div')


webSocetConnection.addEventListener('open', () => {
  console.log('websocet open')
})

webSocetConnection.addEventListener('message', (event) => {
  webSocetDivs.forEach(el => el.classList.remove('flip-it'))
  webSocetDivs[event.data - 1].classList.add('flip-it')
})