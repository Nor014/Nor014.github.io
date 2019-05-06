'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

connection.addEventListener('open', () => {
  console.log('open')
})

window.editor.addEventListener('update', callback)

function callback(data) {
  data.canvas.toBlob(blob => {
    console.log(blob);
    connection.send(blob)
  })
}





