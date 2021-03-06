'use strict'

const newImgButton = document.querySelector('.menu__item.mode.new')
let currentImgStatus = false;
let urlWithId = false;


document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href)
  // если ссылка имеет параметр ID, делаем запрос по id на сервер, переходим в режим комментирования

  if (url.searchParams.get('id')) {
    preloader.style.display = 'block';
    urlWithId = true;

    getImg(url.searchParams.get('id'))
    // если есть локал сторидж делаем запрос по по id на сервер, переходим в режим поделиться
  } else if (localStorage.getItem('URL_ID')) {
    preloader.style.display = 'block';
    getImg(localStorage.getItem('URL_ID'))

  }
})

newImgButton.addEventListener('click', chooseImg);
app.addEventListener('drop', onDrop)
app.addEventListener('dragover', () => {
  event.preventDefault()
})

function chooseImg() {
  // Создаем импут файл, скрываем, вызываем по умолчанию
  let input = document.createElement('input')
  input.setAttribute('type', 'file');
  input.setAttribute('id', 'fileInput');
  input.setAttribute('accept', 'image/png, image/jpeg');

  input.style.display = 'none';

  menu.appendChild(input);

  // при получении файла отправляем его на сервер
  input.addEventListener('change', () => {
    const files = event.currentTarget.files;
    send(files)
  })

  input.click();
  menu.removeChild(input);
}

function onDrop() {
  event.preventDefault()

  if (!currentImgStatus) {
    const files = event.dataTransfer.files
    const imageTypeRegExp = /^image\//

    imageTypeRegExp.test(files[0].type) ? send(files) : showError(errorType)

  } else {
    showError(errorImgStatus)
  }
}

function send(files) {
  preloader.style.display = 'block'

  const form = new FormData();
  form.append('title', files[0].name);
  form.append('image', files[0]);

  fetch('https://neto-api.herokuapp.com/pic', {
    method: 'POST',
    credentials: 'same-origin',
    body: form
  }).then((res) => res.json())
    .then(data => {

      document.querySelectorAll('.comments__form').forEach(form => {
        form.parentNode.removeChild(form)
      })

      dataProcessing(data)
    })
}


function getImg(id) {

  document.querySelectorAll('.comments__form').forEach(form => {
    app.removeChild(form)
  })

  fetch(`https://neto-api.herokuapp.com/pic/${id}`)
    .then(res => res.json())
    .then(data => dataProcessing(data))
}


let connection;

function dataProcessing(data) {
  // устанавливаем фон
  currentImg.src = data.url;

  // если есть канвас - удаляем
  let removeCanvas = document.querySelector('canvas')
  if (removeCanvas) removeCanvas.parentNode.removeChild(removeCanvas)
  
  // формируем URL для режима поделиться
  const url = `${window.location.href}?id=${data.id}`
  menuURL.value = url;
  localStorage.setItem('URL_ID', data.id)

  currentImg.addEventListener('load', loadImg)

  // сортируем все комментарии по уникальным координатам 
  if (data.comments) {
    const forms = {};

    Object.values(data.comments).sort((a, b) => a.timestamp - b.timestamp).forEach((comment) => {
      const key = `x${comment.left}y${comment.top}`;
      if (forms[key]) return forms[key].push(comment);
      forms[key] = [comment];
    });

    // закидываем полученные упорядоченные комментарии для отрисовки на холст
    Object.values(forms).forEach((formComments) => {
      createCommentBlock(formComments[0].left, formComments[0].top, formComments);
    })

  }

  connection = new WebSocket(`wss://neto-api.herokuapp.com/pic/${data.id}`);

  connection.addEventListener('open', () => {
    console.log('open')
  })

  connection.addEventListener('message', () => {
    const data = JSON.parse(event.data)
    console.log(data)

    if (data.event === 'pic') {
      const picData = data.pic
      if (picData.mask) {
        canvas.style.backgroundImage = `url(${picData.mask})`
        // ctx.clearRect(0, 0, canvas.width, canvas.height) 
      } else {
        // canvas.style.backgroundImage = ``
        // ctx.clearRect(0, 0, canvas.width, canvas.height) 
      }
    }

    if (data.event === 'comment') {

      let x = data.comment.left
      let y = data.comment.top
      let timestamp = data.comment.timestamp
      let message = data.comment.message

      let comment = data.comment

      // находим форму
      let forms = document.querySelectorAll('[data-left]')
      let form = Array.from(forms).find(form => ((+form.dataset.left === x) && (+form.dataset.top === y)))

      // если формы нет на холсте, создаем
      if (form === undefined) {
        return createCommentBlock(x, y, [comment])
      }

      // если есть, отображаем комментарий
      createComment({ message, timestamp }, form)
    }

    if (data.event === 'mask') {
      console.log(data.url)
      canvas.style.backgroundImage = `url(${data.url})`
      // ctx.clearRect(0, 0, canvas.width, canvas.height) 
    }

  })
}

// функция показа ошибки

function showError(errorType) {
  error.innerText = errorType;
  error.style.display = 'block';

  setTimeout(() => {
    error.style.display = 'none';
  }, 5000)
}

// функция копирования

const copyButton = document.querySelector('.menu_copy')

copyButton.addEventListener('click', () => {
  menuURL.select()

  try {
    document.execCommand('copy');
  } catch (err) {
    console.log('Can`t copy');
  }
})


function loadImg() {
  preloader.style.display = 'none'
  // изображение загруженно, условие для вывода ошибки при новом дропе
  currentImgStatus = true;
  // если перешли по ссылке из режима поделиться открываем режим коментария, иначе режим поделиться
  if (urlWithId) {
    clearMenu()
    showMenuTool(commentButton)
    commentButton.click()
    showComments()
  } else {
    clearMenu()
    showMenuTool(shareButton)
    shareButton.click()
  }
  
  createCanvas()
}

// создаем контейнер для канваса
const commentsContainerElement = document.createElement('div');
commentsContainerElement.classList.add('comments_container')
commentsContainerElement.style.position = 'absolute';
commentsContainerElement.style.top = '50%';
commentsContainerElement.style.left = '50%';
commentsContainerElement.style.display = 'block';
commentsContainerElement.style.transform = 'translate(-50%, -50%)'

app.appendChild(commentsContainerElement)

const commentsContainer = document.querySelector('.comments_container')

// создаем канвас, вешаем основные обработчики
function createCanvas() {
  commentsContainerElement.style.width = currentImg.width + 'px';
  commentsContainerElement.style.height = currentImg.height + 'px';

  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  const currentImgBounds = currentImg.getBoundingClientRect();

  canvas.width = currentImgBounds.width;
  canvas.height = currentImgBounds.height;

  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.display = 'block';
  canvas.style.zIndex = '1';

  commentsContainer.appendChild(canvas);

  canvas.addEventListener('click', canvasClick);
  canvas.addEventListener('mousedown', beginDraw)
  canvas.addEventListener('mouseup', stopDraw)
  canvas.addEventListener('mousemove', throttle(draw))
}

