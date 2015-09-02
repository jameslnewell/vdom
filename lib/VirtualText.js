
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