const dbClient = require('../drivers/postgreSQL');
// const log = require('../utils/log');

const {healthQuery} = require('./sqlQueries');


/**
 * Health Check:
 * Determines the health of the system by weather a DB query completes or not.
 *
 * @return {Object} Query result on success or error object on fail.
 */
async function getHealth() {
  const queryString = healthQuery();
  const result = await dbClient.query(queryString)
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

  return result;
}


module.exports = {
  getHealth,
};
