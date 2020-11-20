const {query} = require('../drivers/postgreSQL');
const {getTranscriptQuery, createMessageQuery} = require('./sqlQueries');
const {BadRequest} = require('../utils/errors');


/**
   * Get chat transcript data from chat with id
   * @param {UUID} id - chat id
   * @return {Object} transcript list data
   */
async function getTranscript(id) {
  if (!id) {
    throw new BadRequest('getTranscript id must be valid');
  }

  const result = await query(getTranscriptQuery(id));

  if (result === undefined) {
    throw new BadRequest('getTranscript result Rows was oddly undefined.');
  }

  // Transcript is empty until it has messges, so set a default if none
  return {data: result.length > 0 ? result : []};
}

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

  const result = await query(createMessageQuery(chatId, fromChatUserId, toChatUserId, content), true)
      .then((data) => data)
      .catch((e) => {
        // Constraint error
        if (e.code === '23503') {
          throw new BadRequest('createMessage failed. Are the to and from user IDs right?');
        }

        // Generic error
        throw e;
      });

  if (result.rowCount !== 1) {
    throw new BadRequest('createMessage failed. Probably a Client error. Was fromChatUserId and toChatUserId correct?');
  }

  return result.rows[0];
}


module.exports = {
  getTranscript,
  createMessage,
};
