var isVText = require('./isVirtualText');
var isVElement = require('./isVirtualElement');

var dom;
if (typeof document !== 'undefined') {
  dom = document;
}

/**
 * Represent the virtual node as a DOM fragment
 * @param   {VirtualText|VirtualElement} vnode
 * @returns {string}
 */
function toDOM(vnode) {

  if (isVText(vnode)) {
    return vtext(vnode);
  } else if (isVElement(vnode)) {
    return velement(vnode);
  } else {
    throw new Error('Unsupported type of virtual node.');
  }

}

function vtext(vnode) {
  return dom.createTextNode(vnode.text);
}

function velement(vnode) {
  var el = dom.createElement(vnode.tag);

  for (var name in vnode.attributes) {
    if (vnode.attributes.hasOwnProperty(name)) {
      el.setAttribute(name, vnode.attributes[name]);
    }
  }

  for (var i=0; i<vnode.children.length; ++i) {
    el.appendChild(toDOM(vnode.children[i]));
  }

  return el;
}

module.exports = toDOM;