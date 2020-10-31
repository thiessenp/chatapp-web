/**
 * Handles HTTP status codes and formatting the resource response
 */

const express = require('express');

const log = require('../utils/log');
const dbClient = require('../drivers/postgreSQL');
const auth = require('../middleware/auth');

const router = new express.Router();


/**
 * TODO: Just an auth test?, leave route open (not Authenticated)
 */
router.get('/', auth.isAuthenticated, async function(req, res, next) {
  const result = await getHealthCheck();

  // Unsure? Does an error status help here? If not, remove.
  if (result.error) {
    return res.status(500).send({'error': result.error});
  }

  // Status is the important part
  res.json({status: 'UP' /* , data: result.data.rows*/});
});

/**
 * Determines the health of the system by weather a DB query completes or not.
 *
 * @return {Object} Query result on success or error object on fail.
 */
async function getHealthCheck() {
  const result = await dbClient.healthCheck()
      .then((data) => {
        // log('getHealthCheck query success:', data);
        return {data: data};
      })
      .catch((error) => {
        log('getHealthCheck query failed:', error);
        return {error: error};
      });

  return result;
}


module.exports = router;
