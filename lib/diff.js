var isVText = require('./isVirtualText');
var isVElement = require('./isVirtualElement');

function diff(vnode1, vnode2) {

  if (isVText(vnode1) && isVText(vnode2)) {
    return diffText(vnode1, vnode2);
  }

  if (isVElement(vnode1) && isVElement(vnode2)) {
    return diffElement(vnode1, vnode2);
  }

  return [];
}

function diffText(vnode1, vnode2) {

  if (vnode1.text === vnode2.text) {
    return [];
  } else {
    return [{type: 'REPLACE_TEXT', text: vnode2.text}];
  }

}

function diffElement(vnode1, vnode2) {

  if (vnode1.tag !== vnode2.tag) {
    return [{type: 'REPLACE_ELEMENT', element: vnode2}];
  }

  var patches = diffAttributes(vnode1, vnode2);

  var children = diffChildren(vnode1, vnode2);
  if (children) {
    patches.push({type: 'PATCH_CHILDREN', patches: children});
  }

  return patches;
}

function diffAttributes(vnode1, vnode2) {
  var checked = [];

  for (var name in vnode2.attributes) {
    if (vnode2.attributes.hasOwnProperty(name)) {
      if (vnode1.attributes[name] !== vnode2.attributes[name]) {
        return [{type: 'REPLACE_ATTRIBUTES', attributes: vnode2.attributes}];
      }
    }
  }

  for (var name in vnode1.attributes) {
    if (vnode1.attributes.hasOwnProperty(name)) {
      if (vnode2.attributes[name] !== vnode1.attributes[name]) {
        return [{type: 'REPLACE_ATTRIBUTES', attributes: vnode2.attributes}];
      }
    }
  }

  return [];
}

function diffChildren(vnode1, vnode2) {

  var
    i,
    patches = [],
    len     = Math.min(vnode1.children.length, vnode2.children.length)
  ;

  for (i=0; i<len; ++i) {

    var
      vchild1 = vnode1.children[i],
      vchild2 = vnode2.children[i]
    ;

    patches = patches.concat(diff(vchild1, vchild2));

  }

  for (i=len; i<vnode1.children.length; ++i) {
    patches.push({type: 'REMOVE_CHILD', element: vnode1.children[i]});
  }

  for (i=len; i<vnode2.children.length; ++i) {
    patches.push({type: 'APPEND_CHILD', element: vnode2.children[i]});
  }

  //iterate over remaining children

  return patches;
}

module.exports = diff;