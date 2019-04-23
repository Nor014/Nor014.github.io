'use strict';

function loadData(url) {
  return new Promise((done, fail) => {
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  })
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(callback)

function callback(data) {
  //console.log(data);
  const wallpaper = document.querySelector('[data-wallpaper]'),
    username = document.querySelector('[data-username]'),
    description = document.querySelector('[data-description]'),
    pic = document.querySelector('[data-pic]'),
    followers = document.querySelector('[data-followers]'),
    following = document.querySelector('[data-following]'),
    tweets = document.querySelector('[data-tweets]');

  wallpaper.src = data.wallpaper;
  username.textContent = data.username;
  description.textContent = data.description;
  pic.src = data.pic;
  tweets.textContent = data.tweets;
  followers.textContent = data.followers;
  following.textContent = data.following;
}


