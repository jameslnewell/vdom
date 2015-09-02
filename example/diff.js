var
  util = require('util'),
  vdom = require('..'),
  vtext = vdom.VirtualText,
  velement = vdom.VirtualElement
;

var vnode1 = velement('header', {class: 'nib-header'}, [
  velement('h1', {class: 'v2-title v2-title--1'}, [
    vtext('Hello'),
    vtext('Universe'),
    vtext('!!!')
  ])
]);

var vnode2 = velement('header', {class: 'nib-header'}, [
  velement('h1', {class: 'v2-title v2-title--1'}, [
    vtext('Hello')
  ])
]);

var diff = vdom.diff(vnode1, vnode2);

console.log(util.inspect(diff, false, null));