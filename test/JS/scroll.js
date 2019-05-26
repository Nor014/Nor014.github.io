const edHeadline = document.querySelector('.ED_information'),
  schemeBlock = document.querySelector('.scheme_block'),
  reviewsSection = document.querySelector('.reviews_section'),
  dawnBlock = document.querySelector('.ED_information'),

  edScrollButton = document.querySelector('.scroll_ED'),
  shemeScrollButton = document.querySelector('.scroll_Sheme'),
  reviewButton = document.querySelector('.scroll_reviews'),
  dawnButton = document.querySelector('.to_down'),

  hiddenBlock = document.querySelector('.hidden_block'),
  menu = document.querySelector('.menu')

let massOfLinks = [edHeadline, schemeBlock, reviewsSection, dawnBlock]

let massOfButtons = [edScrollButton, shemeScrollButton, reviewButton, dawnButton]

function scroll(links, buttons) {
  links.forEach((el, index) => {
    buttons[index].addEventListener('click', () => {
      event.preventDefault();
      el.scrollIntoView({ block: "start", behavior: "smooth" })
    })
  });
}

scroll(massOfLinks, massOfButtons)

const joinButton = document.querySelector('.join_button')

joinButton.addEventListener('mouseenter', () => {
  joinButton.style.fontSize = '1.4em'
  joinButton.innerText = 'похудеть за неделю'
})

joinButton.addEventListener('mouseleave', () => {
  joinButton.style.fontSize = '1.8em'
  joinButton.innerText = 'похудеть'
})

document.addEventListener('scroll', () => {
  
  if (window.pageYOffset > 50) {
    menu.classList.add('sticky');
    hiddenBlock.style.display = 'block'
  } else {
    menu.classList.remove('sticky');
    hiddenBlock.style.display = 'none'
  }
})