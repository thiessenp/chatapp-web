const dbClient = require('../drivers/postgreSQL');
// const log = require('../utils/log');


/**
 * Health Check:
 * Determines the health of the system by weather a DB query completes or not.
 *
 * @return {Object} Query result on success or error object on fail.
 */
async function getHealth() {
  const result = await dbClient.health()
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

  return result;
}


module.exports = {
  getHealth,
};
