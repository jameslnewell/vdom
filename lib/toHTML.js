var isVText = require('./isVirtualText');
var isVElement = require('./isVirtualElement');

/**
 * Represent the virtual node as a HTML string
 * @param   {VirtualText|VirtualElement} vnode
 * @returns {string}
 */
function toHTML(vnode) {

  if (isVText(vnode)) {
    return vtext(vnode);
  } else if (isVElement(vnode)) {
    return velement(vnode);
  } else {
    throw new Error('Unsupported type of virtual node.');
  }

}

function vtext(vnode) {
  return vnode.text;
}

function velement(vnode) {
  var html = '';

  html += '<'+vnode.tag;
  for (var name in vnode.attributes) {
    if (vnode.attributes.hasOwnProperty(name)) {
      html += ' '+name+'="'+vnode.attributes[name]+'"'; //TODO: escape attr name and value
    }
  }
  html += '>';

  for (var i=0; i<vnode.children.length; ++i) {
    html += toHTML(vnode.children[i]);
  }

  html += '<'+vnode.tag+'>';

  return html;
}

module.exports = toHTML;