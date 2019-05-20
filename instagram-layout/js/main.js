const addClass = (className, context) => context.classList.add(className),
  removeClass = (className, context) => context.classList.remove(className),
  hasClass = (className, context) => context.classList.contains(className);
class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector('.layout__positions');
    this.actionButton = container.querySelector('.layout__button');
    this.result = container.querySelector('.layout__result');
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }

  registerEvents() {
    Array.from(this.positionsContainer.children).forEach((el) => {
      el.addEventListener('dragover', (event) => {
        event.preventDefault()
      })
      el.addEventListener('dragenter', this.dragenter)
      el.addEventListener('dragleave', this.dragleave)
      el.addEventListener('drop', this.drop)
    })

    this.actionButton.addEventListener('click', this.getImg.bind(this))

  }

  dragenter() {
    this.classList.add('layout__item_active')
  }

  dragleave() {
    this.classList.remove('layout__item_active')
  }

  drop() {
    event.preventDefault()
    this.classList.remove('layout__item_active')
    const file = event.dataTransfer.files[0]

    const imageTypeRegExp = /^image\//;

    if (imageTypeRegExp.test(file.type)) {

      const img = document.createElement('img')
      img.src = URL.createObjectURL(file)
      img.classList.add('layout__image');

      this.appendChild(img)

    } else {
      this.innerText = 'неподходящий формат файла'
    }

  }

  getImg() {
    Array.from(this.positionsContainer.children).forEach(el => {
      const coords = el.getBoundingClientRect();
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d');

      canvas.width = coords.width
      canvas.height = coords.height
      canvas.style.left = coords.left + 'px'
      canvas.style.top = coords.top + 'px'

      ctx.drawImage(el.firstChild, 0, 0)
      this.container.appendChild(canvas)
      console.log(el.firstChild)

    })
  }
}

new iLayout(document.getElementById('layout'));
