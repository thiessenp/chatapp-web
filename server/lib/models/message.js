/**
 * Message data object - used in a Transcript (probably)
 * @param {Object} o - message object data
 */
function Message(o={}) {
  this.id = o.id; // uuid
  // Note separate message_id for Client to have ordered message sequence
  this.message_id = o.message_id; // Number
  this.chat_id = o.chat_id; // uuid
  this.timestamp = o.timestamp; // Date
  this.from_chat_user_id = o.from_chat_user_id; // uuid
  this.to_chat_user_id = o.to_chat_user_id; // uuid
  this.content = o.content; // string message
  this.attachments = o.attachments; // JSON
}

module.exports = {Message};
