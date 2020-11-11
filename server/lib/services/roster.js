const dbClient = require('../drivers/postgreSQL');
const {BadRequest} = require('../utils/errors');


/**
   * Get chat roster data from chat with id
   * @param {UUID} id - chat id
   * @return {Object} roster user list data
   */
async function getRoster(id) {
  if (!id) {
    throw new BadRequest('getRoster id must be valid');
  }

  const result = await dbClient.getRoster(id)
      .then((data) => data)
      .catch((e) => {
        throw e;
      });

  if (result.rows === undefined) {
    throw new BadRequest('getRoster result Rows was oddly undefined.');
  }

  // Roster is empty until it has users, so set a default if none
  return {data: result.rowCount > 0 ? result.rows : []};
}

/**
 * Adds a user to a chat for use with the roster
 * @param {UUID} accountId creator user Id
 * @param {UUID} chatId - Name of chat
 * @return {Object} Query result on success or error object on fail.
 */
async function addUserTochat(accountId, chatId) {
  if (!accountId || !chatId) {
    throw new BadRequest('addUser requires accountId, chatId');
  }

  const result = await dbClient.addUser(accountId, chatId)
      .then((data) => data)
      .catch((e) => {
        // User already added error
        if (e.code === '23505') {
          throw new BadRequest('addUserTochat failed. User already added to chat');
        }

        // Generic error
        throw e;
      });

  if (result.rowCount !== 1) {
    throw new BadRequest('addUserTochat failed. Probably a Client error. Was accountId and chatId correct?');
  }

  return result.rows[0];
}

module.exports = {
  getRoster,
  addUserTochat,
};
