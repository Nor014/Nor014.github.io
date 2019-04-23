'use strict';

function loadData(url) {
  return new Promise((done, fail) => {
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  })
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(callback)

function callback(data) {

  if (data.id) {
    console.log(data);

    const name = document.querySelector('[data-name]'),
      description = document.querySelector('[data-description]'),
      pic = document.querySelector('[data-pic]'),
      position = document.querySelector('[data-position]');

    name.innerHTML = data.name;
    description.innerHTML = data.description;
    pic.src = data.pic;
    position.innerHTML = data.position

    return new Promise((done, fail) => {
      let url = `https://neto-api.herokuapp.com/profile/${data.id}/technologies`;
      let newScript = document.createElement('script');
      newScript.src = url;
      document.body.appendChild(newScript);
    })
  } else {

    console.log(data);

    const tecnologies = document.querySelector('[data-technologies]');
    tecnologies.innerHTML = data.length;
    data.forEach(element => {
      let span = document.createElement('span');
      span.className = `devicons devicons-${element}`;
      tecnologies.appendChild(span);
    });
  }

  document.querySelector('.content').style.display = 'initial';
}

