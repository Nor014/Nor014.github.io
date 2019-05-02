'use strict';
function createElement(node) {

  if ((typeof node === 'string') || (typeof node === 'number')) {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.name);

  if (node.props !== null) {
    Object.keys(node.props).forEach(key => {
      element.setAttribute(key, node.props[key])
    })
  }

  node.childs.forEach(el => {
    element.appendChild(createElement(el))
  })

  console.log(element);
  return element
}