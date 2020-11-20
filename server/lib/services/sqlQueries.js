/**
 * SQL Queries all stored here.
 *
 * Could also use PosgreSQL way below, but then just Postgres. So this file is
 * about keepin queries abstract.
 *
 * For example:
 * const sql = {
 *  getAccountByUsername: 'SELECT * FROM account WHERE username=$1',
 * };
 * ...
 * const queryString = sql.getAccountByUsername;
 * ...
 * const result = await dbClient.query(queryString, name)
 * ...
 * function query(queryString, params) {
 *  return pool.query(queryString, params);
 * }
 *
 */


/**
 * Checks whether the DB is UP or not. Returns data, then UP.
 *
 * @return {Object} Current time
 */
function healthQuery() {
  // General test, if anything is selectable, DB is UP
  return 'SELECT NOW()';
}

/**
   * Log a User in. Currently only need a username
   *
   * @param {String} username - username to lookup
   * @return {Object} User account data if found, or error if not found
   */
function getAccountByUsernameQuery(username) {
  return `SELECT * FROM account WHERE username='${username}'`;
}

/**
   * Log a User in. Currently only need a username
   *
   * @param {String} id - username to lookup
   * @return {Object} User account data if found, or error if not found
   */
// function getAccountById(id) {
//   return pool.query(`SELECT * FROM account WHERE id='${id}'`);
// }

/**
   * Creates a new chat
   * @param {String} name - Name of chat
   * @return {Object} result of query
   */
function createChatQuery(name) {
  return `INSERT INTO chat (name) VALUES ('${name}') RETURNING id`;
}

/**
   * Gets all chats
   * @return {Object} result of query, a list of chats
   */
function getChatsQuery() {
  return `SELECT * FROM chat`;
}

/**
   * Gets a chat
   * @param {UUID} id - id of chat to get
   * @return {Object} result of query
   */
function getChatQuery(id) {
  return `SELECT * FROM chat WHERE id='${id}'`;
}

/**
   * Gets a chat transcript of messages
   * @param {UUID} id - id of chat to get
   * @return {Object} result of query
   */
function getTranscriptQuery(id) {
  return `SELECT * FROM transcript WHERE chat_id='${id}'`;
}

/**
   * Gets a chat roster of users
   * @param {UUID} id - id of chat to get
   * @return {Object} result of query
   */
function getRosterQuery(id) {
  return `SELECT * FROM roster WHERE chat_id='${id}'`;
}

/**
   * Creates a new message used in Transcript
   * @param {String} chatId - Name of chat
   * @param {UUID} fromChatUserId creator user Id
   * @param {UUID} toChatUserId destination user Id (use fromChatUserId if none)
   * @param {String} content message content
   * @return {Object} result of query
   */
function createMessageQuery(chatId, fromChatUserId, toChatUserId, content) {
  return `
      INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) 
      VALUES('${chatId}', '${fromChatUserId}', '${toChatUserId}', '${content}')
      RETURNING id`;
}

/**
   * Adds a user to a chat in the DB
   * @param {UUID} accountId - creator user Id
   * @param {UUID} chatId - chatId user/roster belongs to
   * @return {Object} result of query
   */
function addUserQuery(accountId, chatId) {
  return `
      INSERT INTO chat_user (account_id, chat_id) 
      VALUES('${accountId}', '${chatId}') 
      RETURNING id`;
}


module.exports = {
  healthQuery,
  getAccountByUsernameQuery,
  createChatQuery,
  getChatsQuery,
  getChatQuery,
  getTranscriptQuery,
  createMessageQuery,
  getRosterQuery,
  addUserQuery,
};
