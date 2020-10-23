/**
 * POSTGRESQL Driver
 * 
 * Docs: https://node-postgres.com/
 *
 * Note: Must wait for DB to full load before can access. So put in async code
 * like a route request.
 */

// Note
// Transactional Integrity not guaranteed with pools (N-clients write diff data)
// So only use for Read, or anything that doesn't depend on Transactions.

const { Pool } = require('pg');
const log = require('../utils/log');


const pgConfig =  {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

  // Maximum number of clients the pool should contain
  // Important: remember to release client after query or use up quickly!
  max: 20
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
      //throw Error(err)
    } else {
      log('DB connected.');
    }
  
    release();
  });
}, 3000);


/**
 * Note:
 * pool.query
 * For convenience, sets up pool.connect, does the query, and handles releasing.
 */

// Checks whether the DB is UP or not. Returns data, then UP.
function healthCheck() {
  return  pool.query('SELECT NOW()');
}

// Log a User in. Currently only need a username
function authAccount(username /*,password*/) {}

// Account inc. is_authenticated
function getAccount(accountId) {}

// List of chats
function getChats() {}

// Chat + Roster + Transcript
function getChat(chatId) {}

// Roster list of users for a Chat
function getRoster(chatId) {}

// Transcript list of messages for a Chat
function getTrascript(chatId) {}

module.exports = {
  healthCheck
};
