'use strict'

const seatMapDiv = document.querySelector('#seatMapDiv'),
  totalPax = document.querySelector('#totalPax'),
  totalAdult = document.querySelector('#totalAdult'),
  totalHalf = document.querySelector('#totalHalf'),
  btnSetFull = document.querySelector('#btnSetFull'),
  btnSetEmpty = document.querySelector('#btnSetEmpty')


let mass = [];
btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

function onClick(event) {
  if (event.altKey && (!(this.classList.contains('adult')))) {
    if (this.classList.contains('half')) {
      this.classList.remove('half');
      totalPax.innerHTML--;
      totalHalf.innerHTML--;
    } else {
      this.classList.add('half');
      totalPax.innerHTML++;
      totalHalf.innerHTML++;
    }
  } else if (!event.altKey && !(this.classList.contains('half'))) {
    if (this.classList.contains('adult')) {
      this.classList.remove('adult');
      totalPax.innerHTML--;
      totalAdult.innerHTML--;
    } else {
      this.classList.add('adult');
      totalPax.innerHTML++;
      totalAdult.innerHTML++;
    }
  }
}

const btnSeatMap = document.querySelector('#btnSeatMap'),
  allPlanes = document.querySelectorAll('option');
btnSeatMap.addEventListener('click', selectPlane);

function selectPlane() {
  event.preventDefault();
  // отчищаем схему
  seatMapDiv.innerHTML = '';
  mass = [];

  // запрашиваем данные, создаем шаблон, формируем массив объектов, закидываем в шаблонизатор
  let activePlane = Array.from(allPlanes).filter(plane => plane.selected === true)

  fetch(`https://neto-api.herokuapp.com/plane/${activePlane[0].value}`)
    .then(res => res.json())
    .then(data => showSeats(data))
}

function showSeats(data) {
  data.scheme.forEach(function (seat, index) {
    if (seat === 6) {
      let obj = {
        tag: 'div',
        cls: ['row', 'seating-row', 'text-center'],
        content: [
          {
            tag: 'div', cls: ['col-xs-1', 'row-number'], content: {
              tag: 'h2', cls: '', content: index + 1
            }
          },
          {
            tag: 'div', cls: 'col-xs-5', content: [
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[0]
                }
              },
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[1]
                }
              },
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[2]
                }
              }
            ]
          },
          {
            tag: 'div', cls: 'col-xs-5', content: [
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[3]
                }
              },
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[4]
                }
              },
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[5]
                }
              }
            ]
          }
        ]
      }
      mass.push(obj)
    }

    if (seat === 4) {
      let obj = {
        tag: 'div',
        cls: ['row', 'seating-row', 'text-center'],
        content: [
          {
            tag: 'div', cls: ['col-xs-1', 'row-number'], content: {
              tag: 'h2', cls: '', content: index + 1
            }
          },
          {
            tag: 'div', cls: 'col-xs-5', content: [
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[0]
                }
              },
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[1]
                }
              },
              {
                tag: 'div', cls: ['col-xs-4', 'no-seat'], content: ''
              }
            ]
          },
          {
            tag: 'div', cls: 'col-xs-5', content: [
              {
                tag: 'div', cls: ['col-xs-4', 'no-seat'], content: ''
              },
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[4]
                }
              },
              {
                tag: 'div', cls: ['col-xs-4', 'seat'], content: {
                  tag: 'span', cls: 'seat-label', content: data.letters6[5]
                }
              }
            ]
          }
        ]
      }
      mass.push(obj)
    }

    if (seat === 0) {
      let obj = {
        tag: 'div',
        cls: ['row', 'seating-row', 'text-center'],
        content: [
          {
            tag: 'div', cls: ['col-xs-1', 'row-number'], content: {
              tag: 'h2', cls: '', content: index + 1
            }
          },
          {
            tag: 'div', cls: 'col-xs-5'
          },
          {
            tag: 'div', cls: 'col-xs-5'
          }
        ]
      }
      mass.push(obj)
    }
  })

  mass.forEach(el => seatMapDiv.appendChild(htmlEngine(el)));

  const seats = document.querySelectorAll('.seat');
  seats.forEach(el => el.addEventListener('click', onClick));

  totalPax.innerText = 0;
  totalAdult.innerText = 0;
  totalHalf.innerText = 0;

  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;

  btnSetFull.addEventListener('click', chooseAllSeats);
  btnSetEmpty.addEventListener('click', cleenAllSeats)
}

function htmlEngine(obj) {
  if ((obj === undefined) || (obj === null) || (obj === false)) {
    return document.createTextNode('')
  }

  if ((typeof obj === 'string') || (typeof obj === 'number')) {
    return document.createTextNode(obj)
  }

  let element = document.createElement(obj.tag);
  let classes = Array.isArray(obj.cls) ? obj.cls : [obj.cls];

  classes.forEach(cls => {
    if (!cls) return
    element.classList.add(cls)
  });

  let content = Array.isArray(obj.content) ? obj.content : [obj.content];

  content.forEach(el => {
    element.appendChild(htmlEngine(el))
  })

  // console.log(element)
  return element
}

function chooseAllSeats() {
  event.preventDefault()
  const seats = document.querySelectorAll('.seat');
  seats.forEach(el => {
    el.classList.remove('half')
    el.classList.add('adult');
  });
  totalPax.innerText = seats.length;
  totalAdult.innerText = seats.length;
  totalHalf.innerText = 0;
}

function cleenAllSeats() {
  event.preventDefault()
  const seats = document.querySelectorAll('.seat');
  seats.forEach(el => {
    el.classList.remove('adult');
    el.classList.remove('half');
  });
  totalPax.innerText = 0;
  totalAdult.innerText = 0;
  totalHalf.innerText = 0;
}
