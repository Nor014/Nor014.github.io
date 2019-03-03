'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

showBubbles(connection);

document.addEventListener('click', onClick);

function onClick(event) {
  connection.send(JSON.stringify({ x: event.pageX, y: event.pageY }));
}


