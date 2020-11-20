const {query} = require('../drivers/postgreSQL');
const {healthQuery} = require('./sqlQueries');
const {GeneralError} = require('../utils/errors');


/**
 * Health Check:
 * Determines the health of the system by weather a DB query completes or not.
 *
 * @return {Object} Query result on success or error object on fail.
 */
async function getHealth() {
  const result = await query(healthQuery());

  if (result.length <= 0) {
    throw new GeneralError('Health check failed to query DB.');
  }

  return result;
}


module.exports = {
  getHealth,
};
