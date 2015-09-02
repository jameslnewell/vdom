
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