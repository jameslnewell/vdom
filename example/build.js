(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var
  vdom = require('..'),
  vtext = vdom.VirtualText,
  velement = vdom.VirtualElement
;

var vnode = velement('header', {class: 'nib-header'}, [
  velement('h1', {class: 'v2-title v2-title--1'}, [
    vtext('Hello World!')
  ])
]);

var dom = vdom.toDOM(vnode);

document.body.appendChild(dom);
},{"..":2}],2:[function(require,module,exports){
module.exports = {
  VirtualText:    require('./lib/VirtualText'),
  VirtualElement: require('./lib/VirtualElement'),
  toDOM:          require('./lib/toDOM'),
  toHTML:         require('./lib/toHTML')
};
},{"./lib/VirtualElement":3,"./lib/VirtualText":4,"./lib/toDOM":7,"./lib/toHTML":8}],3:[function(require,module,exports){

/**
 * Create a new virtual element node
 * @constructor
 * @param {string}  tag
 * @param {Object}  attributes
 * @param {Array}   children
 */
function VirtualElement(tag, attributes, children) {

  if (!(this instanceof VirtualElement)) {
    return new VirtualElement(tag, attributes, children);
  }

  this.tag        = tag;
  this.attributes = attributes || {};
  this.children   = children || [];

}

VirtualElement.prototype.type = 'VirtualElement';

module.exports = VirtualElement;
},{}],4:[function(require,module,exports){

/**
 * Create a new virtual text node
 * @constructor
 * @param {string}  text
 */
function VirtualText(text) {

  if (!(this instanceof VirtualText)) {
    return new VirtualText(text);
  }

  this.text = text;

}

VirtualText.prototype.type = 'VirtualText';

module.exports = VirtualText;
},{}],5:[function(require,module,exports){

module.exports = function(node) {
  return node.type === 'VirtualElement';
};
},{}],6:[function(require,module,exports){

module.exports = function(node) {
  return node.type === 'VirtualText';
};
},{}],7:[function(require,module,exports){
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
},{"./isVirtualElement":5,"./isVirtualText":6}],8:[function(require,module,exports){
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
},{"./isVirtualElement":5,"./isVirtualText":6}]},{},[1]);
