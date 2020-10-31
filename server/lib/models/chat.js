/**
 *
 * @param {Object} o
 * @param {UUID} [params.id] - (Optional) userid generated on server
 * @param {String} [params.name] - Chat name used as a label
 */
function Chat(o={}) {
  this.id = o.id;
  this.name = o.id;
}

module.exports = Chat;
