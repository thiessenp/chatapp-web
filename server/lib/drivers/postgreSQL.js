/**
 * POSTGRESQL Driver
 *
 * Docs: https://node-postgres.com/
 *
 * Note: Must wait for DB to full load before can access. So put in async code
 * like a route request.
 *
 * Note: pool.query() For convenience, sets up pool.connect, does the query, and
 * handles releasing.
 *
 * Warning: Transactional Integrity not guaranteed with pools (N-clients write diff data)
 * So only use for Read, or anything that doesn't depend on Transactions.
 *
 * Note: Validation done in Service calls.
 *
 * Note: Errors will bubble up to Services.
 *
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


/**
 * Calls initial DB connect, more to make sure connected as expected than
 * anything.
 *
 * (Optional in lifecycle)
 *
 * Example for more info:
 * https://node-postgres.com/guides/project-structure
 *
 * @return {object} DB client if needed
 */
async function connect() {
  const client = await pool.connect((err, client, release) => {
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

  return client;
}

/**
 * Runs an SQL query using the provided queryString
 * @param {String} queryString query to execute
 * @param {boolean} isReturnPromise true to return the result as a promise
 * @return {object} result of query (a promise)
 */
async function query(queryString, isReturnPromise=false) {
  const resultPromise = pool.query(queryString);

  if (isReturnPromise) {
    return resultPromise;
  }

  const result = await resultPromise
      .then((data) => data)
      .catch((e) => {
        throw e;
      });

  return result.rows;
}


module.exports = {
  connect,
  query,
};
