'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  // const comments = list.map(createComment).join('');
  const comments = list.map(el => createComment(el))
  comments.forEach(el => {
    commentsContainer.appendChild(commentEngine(el))
  });
  // commentsContainer.innerHTML += comments;
}

// function createComment(comment) {
//   return `<div class="comment-wrap">
//     <div class="photo" title="${comment.author.name}">
//       <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
//     </div>
//     <div class="comment-block">
//       <p class="comment-text">
//         ${comment.text.split('\n').join('<br>')}
//       </p>
//       <div class="bottom-comment">
//         <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
//         <ul class="comment-actions">
//           <li class="complain">Пожаловаться</li>
//           <li class="reply">Ответить</li>
//         </ul>
//       </div>
//     </div>
//   </div>`
// }

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);

function createComment(comment) {
  return {
    tag: 'div',
    class: "comment-wrap",
    content: [
      {
        tag: 'div', class: 'photo', attrs: { title: comment.author.name }, content: {
          tag: 'div', class: 'avatar', attrs: { style: `background-image: url('${comment.author.pic}')` }
        }
      },
      {
        tag: 'div',
        class: "comment-block",
        content: [
          {
            tag: 'p', class: "comment-text", content: comment.text
          },
          {
            tag: 'div', class: "bottom-comment", content: [
              {
                tag: 'div',
                class: "comment-date",
                content: new Date(comment.date).toLocaleString('ru-Ru')
              },
              {
                tag: 'ul',
                class: "comment-actions",
                content: [
                  { tag: 'li', class: "complain", content: 'Пожаловаться' },
                  { tag: 'li', class: "reply", content: 'Ответить' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function commentEngine(obj) {
  // Проверка типов данных
  if ((obj === undefined) || (obj === null) || (obj === false)) {
    return document.createTextNode('');
  }

  if ((typeof obj === 'string') || (typeof obj === 'number') || (typeof obj === 'true')) {
    if (typeof obj === 'string') {
      // Если стринга, текст бьем на отдельные элементы до каждой красной строки, разделяем текст ноды <br> тегом
      let textArray = obj.split('\n');
      const fragment = document.createDocumentFragment();

      for (let i = 0; i <= textArray.length - 1; i++) {
        if (i === textArray.length - 1) {
          fragment.appendChild(document.createTextNode(textArray[i]));
        } else {
          let br = document.createElement('br');
          fragment.appendChild(document.createTextNode(textArray[i]));
          fragment.appendChild(br);
        }
      }
      return fragment
    }

    return document.createTextNode(obj);
  }

  const element = document.createElement(obj.tag);

  // Если объект - массив, для каждого эфемента рекурсия и пушим во фрагмент, возвращаем его
  if (Array.isArray(obj)) {
    const fragment = document.createDocumentFragment();
    obj.forEach(el => {
      fragment.appendChild(commentEngine(el))
    });
    return fragment
  }

  // Добавление классов
  const classes = Array.isArray(obj.class) ? obj.class : [obj.class];

  classes.forEach(el => {
    if (!el || el === undefined) return;
    element.classList.add(el)
  });

  element.classList.add(obj.class);

  // Проверка аттрибутов
  if (obj.attrs) {
    Object.keys(obj.attrs).forEach(el => {
      element.setAttribute(el, obj.attrs[el]);
    })
  }

  element.appendChild(commentEngine(obj.content));
  // console.log(element)
  return element
}