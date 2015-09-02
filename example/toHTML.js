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

var html = vdom.toHTML(vnode);

console.log(html);