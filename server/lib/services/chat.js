const dbClient = require('../drivers/postgreSQL');
const log = require('../utils/log');

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
  return result;
}

/**
   * Creates a new chat in the DB
   * @param {String} name - Name for new chat
   * @return {Object} Query result on success or error object on fail.
   */
async function getChats() {
  const result = await dbClient.getChats()
      .then((data) => {
        return {data: data};
      })
      .catch((error) => {
        log('createChat query failed:', error);
        return {error: error};
      });
  return result;
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

  return result;
}


module.exports = {
  createChat,
  getChats,
  getChat,
};
