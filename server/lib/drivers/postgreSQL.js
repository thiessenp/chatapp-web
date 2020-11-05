/**
 * POSTGRESQL Driver
 *
 * Docs: https://node-postgres.com/
 *
 * Note: Must wait for DB to full load before can access. So put in async code
 * like a route request.
 */

// DESING NOTE:
// Move validation to Route/Services - this just exposes SQL query and result.
// Errors may bubble up though which is OK. Goal to keep checking in 1-place.
//
// e.g. DO NOT:
// if (!name) { throw new BadRequest('SQL createChat name must be valid'); }


/**
 * Note:
 * - pool.query: For convenience, sets up pool.connect, does the query, and
 * handles releasing.
 * - Transactional Integrity not guaranteed with pools (N-clients write diff data)
 * So only use for Read, or anything that doesn't depend on Transactions.
 */
const {Pool} = require('pg');

const log = require('../utils/log');
// const {GeneralError} = require('../utils/errors');


const pgConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  // Maximum number of clients the pool should contain
  // Important: remember to release client after query or use up quickly!
  max: 20,
};
const pool = new Pool(pgConfig);

pool.on('error', (err) => log('DB POOL ERROR:', err));

// Check DB to see if we can connect, give a little delay for DB to load though
setTimeout(() => {
  pool.connect((err, client, release) => {
    if (err) {
      log('DB CONNECT ERROR', err);
      // TODO
      // Handle DB error
      // throw Error(err)
    } else {
      log('DB connected.');
    }

    release();
  });
}, 3000);


/**
 * Checks whether the DB is UP or not. Returns data, then UP.
 *
 * @return {Object} Current time
 */
function healthCheck() {
  // General test, if anything is selectable, DB is UP
  return pool.query('SELECT NOW()');
}

/**
 * Log a User in. Currently only need a username
 *
 * @param {String} username - username to lookup
 * @return {Object} User account data if found, or error if not found
 */
function getAccountByUsername(username) {
  return pool.query(`SELECT * FROM account WHERE username=${username}`);
}

/**
 * Creates a new chat
 * @param {String} name - Name of chat
 * @return {Object} result of query
 */
function createChat(name) {
  return pool.query(`INSERT INTO chat (name) VALUES ('${name}')`);
}

/**
 * Gets all chats
 * @return {Object} result of query, a list of chats
 */
function getChats() {
  return pool.query(`SELECT * FROM chat`);
}

/**
 * Gets a chat
 * @param {UUID} id - id of chat to get
 * @return {Object} result of query
 */
function getChat(id) {
  if (!id) {
    throw Error('SQL getChat id must be valid');
  }
  return pool.query(`SELECT * FROM chat WHERE id='${id}'`);
}

/**
 * Gets a chat transcript of messages
 * @param {UUID} id - id of chat to get
 * @return {Object} result of query
 */
function getTranscript(id) {
  if (!id) {
    throw Error('SQL getTranscript id must be valid');
  }
  return pool.query(`SELECT * FROM transcript WHERE chat_id='${id}'`);
}

/**
 * Creates a new message used in Transcript
 * @param {String} chatId - Name of chat
 * @param {UUID} fromChatUserId creator user Id
 * @param {UUID} toChatUserId destination user Id (use fromChatUserId if none)
 * @param {String} content message content
 * @return {Object} result of query
 */
function createMessage(chatId, fromChatUserId, toChatUserId, content) {
  if (!chatId || !fromChatUserId || !toChatUserId || !content) {
    throw Error('SQL createMessage must have valid params');
  }
  return pool.query(`
    INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) 
    VALUES('${chatId}', '${fromChatUserId}', '${toChatUserId}', '${content}')
    `);
}

/**
 * Gets a chat roster of users
 * @param {UUID} id - id of chat to get
 * @return {Object} result of query
 */
function getRoster(id) {
  if (!id) {
    throw Error('SQL getRoster id must be valid');
  }
  return pool.query(`SELECT * FROM roster WHERE chat_id='${id}'`);
}

module.exports = {
  healthCheck,
  getAccountByUsername,
  createChat,
  getChats,
  getChat,
  getTranscript,
  createMessage,
  getRoster,
};
