const dbClient = require('../drivers/postgreSQL');
const log = require('../utils/log');

/**
 * Determines the health of the system by weather a DB query completes or not.
 *
 * @return {Object} Query result on success or error object on fail.
 */
async function getHealthCheck() {
  const result = await dbClient.healthCheck()
      .then((data) => data)
      .catch((err) => {
        log('getHealthCheck query failed:', err);
        throw err;
      });

  return result;
}

module.exports = {
  getHealthCheck,
};
