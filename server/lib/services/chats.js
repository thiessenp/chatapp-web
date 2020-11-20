const {query} = require('../drivers/postgreSQL');
const {createChatQuery, getChatsQuery, getChatQuery} = require('./sqlQueries');
// const log = require('../utils/log');
// const format = require('../utils/format.js');
const {BadRequest, NotFound, GeneralError} = require('../utils/errors');


/**
 * Creates a new chat in the DB
 * @param {String} name - Name for new chat
 * @return {Boolean} true on success (error on fail).
 */
async function createChat(name) {
  if (!name) {
    throw new BadRequest('Name param must be sent.');
  }

  const result = await query(createChatQuery(name));

  if (result.length !== 1) {
    throw new BadRequest('Chat failed to create. Already exists?');
  }

  const chatId = result[0].id;
  return chatId;
}

/**
   * Gets all chats
   * @param {String} name - Name for new chat
   * @return {Object} Query result on success or error object on fail.
   */
async function getChats() {
  const result = await query(getChatsQuery());

  if (result === undefined || result.length === 0) {
    throw new GeneralError('No chats found but default should exist.');
  }

  const chats = result;
  return chats;
}

/**
   * Gathers all chat data for chat based on chat id
   * @param {UUID} id - chat id
   * @return {Object} all Chat data
   */
async function getChat(id) {
  if (!id) {
    throw new BadRequest('getChat id must be valid');
  }

  const result = await query(getChatQuery(id));

  if (result === undefined || result.length === 0) {
    throw new NotFound(`Chat with id ${id} not found.`);
  }

  // 0 since Should only be one chat
  return {data: result[0]};
}


module.exports = {
  createChat,
  getChats,
  getChat,
};
