/**
 * POSTGRESQL Driver
 *
 * Docs: https://node-postgres.com/
 *
 * Note: Must wait for DB to full load before can access. So put in async code
 * like a route request.
 */

/**
 * Note:
 * - pool.query: For convenience, sets up pool.connect, does the query, and
 * handles releasing.
 * - Transactional Integrity not guaranteed with pools (N-clients write diff data)
 * So only use for Read, or anything that doesn't depend on Transactions.
 */
const {Pool} = require('pg');

const log = require('../utils/log');


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
  if (!name) {
    throw Error('SQL createChat name must be valid');
  }
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
  getRoster,
};
