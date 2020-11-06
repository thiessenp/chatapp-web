const dbClient = require('../drivers/postgreSQL');
const {BadRequest} = require('../utils/errors');

/**
 * Creates a new message in the DB
 * @param {String} chatId - Name of chat
 * @param {UUID} fromChatUserId creator user Id
 * @param {UUID} toChatUserId destination user Id (use fromChatUserId if none)
 * @param {String} content message content
 * @return {Object} Query result on success or error object on fail.
 */
async function createMessage(chatId, fromChatUserId, toChatUserId, content) {
  if (!chatId || !fromChatUserId || !toChatUserId || !content) {
    throw new BadRequest('createMessage requires chatId, fromChatUserId, toChatUserId, and content');
  }

  const result = await dbClient
      .createMessage(chatId, fromChatUserId, toChatUserId, content)
      .then((data) => data)
      .catch((e) => {
        throw e;
      });

  if (result.rowCount !== 1) {
    throw new BadRequest('createMessage failed. Probably a Client error. Was fromChatUserId and toChatUserId correct?');
  }

  return true;
}


module.exports = {
  createMessage,
};
