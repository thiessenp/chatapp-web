const dbClient = require('../drivers/postgreSQL');
const log = require('../utils/log');
const format = require('../utils/format.js');

/**
 * Creates a new chat in the DB
 * @param {String} name - Name for new chat
 * @return {Object} Query result on success or error object on fail.
 */
async function createChat(name) {
  const result = await dbClient.createChat(name)
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

/**
   * Creates a new chat in the DB
   * @param {String} name - Name for new chat
   * @return {Object} Query result on success or error object on fail.
   */
async function getChats() {
  const result = await dbClient.getChats()
      .then((data) => data)
      .catch((error) => {
        log('createChat query failed:', error);
        return {error: error};
      });

  if (result.error) {
    return {error: format.errorData(500, result.error)};
  }

  if (result.rows === undefined || result.rows.length === 0) {
    return {error: format.errorData(404)};
  }

  return {data: result.rows};
}

/**
   * Gathers all chat data for chat based on chat id
   * @param {UUID} id - chat id
   * @return {Object} all Chat data
   */
async function getChat(id) {
  const result = await dbClient.getChat(id)
      .then((data) => data)
      .catch((error) => {
        log('getChat query failed:', error);
        return {error: error};
      });

  if (result.error) {
    return {error: format.errorData(500, result.error)};
  }

  if (result.rows === undefined || result.rows.length === 0) {
    return {error: format.errorData(404)};
  }

  // 0 since Should only be one chat
  return {data: result.rows[0]};
}


module.exports = {
  createChat,
  getChats,
  getChat,
};
