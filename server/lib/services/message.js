const dbClient = require('../drivers/postgreSQL');
const log = require('../utils/log');
const format = require('../utils/format.js');

/**
 * Creates a new message in the DB
 * @param {String} chatId - Name of chat
 * @param {UUID} fromChatUserId creator user Id
 * @param {UUID} toChatUserId destination user Id (use fromChatUserId if none)
 * @param {String} content message content
 * @return {Object} Query result on success or error object on fail.
 */
async function createMessage(chatId, fromChatUserId, toChatUserId, content) {
  const result = await dbClient
      .createMessage(chatId, fromChatUserId, toChatUserId, content)
      .then((data) => {
        return {data: data};
      })
      .catch((error) => {
        log('createChat query failed:', error);
        return {error: error};
      });

  if (result.error) {
    return {error: format.errorData(500, result.error)};
  }

  if (result.data.rowCount !== 1) {
    return {error: format.errorData(400, 'Chat already exists?')};
  }

  return {data: result.rows};
}


module.exports = {
  createMessage,
};
