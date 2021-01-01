const {sqlEngine} = require('../engines/sqlEngine');
const {getRosterQuery, addUserQuery, getChatUserQuery} = require('../engines/sqlQueries');
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

  const result = await sqlEngine.query(getRosterQuery(id));

  if (result === undefined) {
    throw new BadRequest('getRoster result Rows was oddly undefined.');
  }

  const sortedResult = result.sort(function(userA, userB) {
    const userAi = userA.username.toLowerCase();
    const userBi = userB.username.toLowerCase();
    // A < B
    if (userAi < userBi) {
      return -1;
    }
    // A > B
    if (userAi > userBi) {
      return 1;
    }
    // A == B
    return 0;
  });

  // Roster is empty until it has users, so set a default if none
  return {data: sortedResult.length > 0 ? sortedResult : []};
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

  const result = await sqlEngine.queryPromise(addUserQuery(accountId, chatId))
      .then((data) => data)
      .catch((e) => {
        // User already added error - note this so can try getting user
        if (e.code === '23503' || e.code === '23505') {
          // throw new BadRequest('addUserTochat failed. User already added to chat');
          return {error: 'USER_EXISTS'};
        } else {
          // Generic error
          throw e;
        }
      });

  // Try to handle this error in the app elsewhere
  if (result.error === 'USER_EXISTS') {
    return result;
  }

  if (result.rowCount !== 1) {
    throw new BadRequest('addUserTochat failed. Probably a Client error. Was accountId and chatId correct?');
  }

  return result.rows[0];
}

/**
 * Gets a user to a chat for use with the roster
 * @param {UUID} accountId creator user Id
 * @param {UUID} chatId - Name of chat
 * @return {Object} Query result on success or error object on fail.
 */
async function getChatUser(accountId, chatId) {
  if (!accountId || !chatId) {
    throw new BadRequest('getChatUser requires accountId, chatId');
  }

  const result = await sqlEngine.queryPromise(getChatUserQuery(accountId, chatId))
      .then((data) => data)
      .catch((e) => {
      // Generic error
        throw e;
      });

  if (result.rowCount !== 1) {
    throw new BadRequest('getChatUser failed. Probably a Client error. Was accountId and chatId correct?');
  }

  return result.rows[0];
}

module.exports = {
  getRoster,
  addUserTochat,
  getChatUser,
};
