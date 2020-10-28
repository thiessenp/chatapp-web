/**
 * Handles HTTP status codes and formatting the resource response
 */

const express = require('express');
const router = new express.Router();
const healthCheckResource = require('../resources/healthCheck');
const accountResource = require('../resources/account');


// TODO: Just an auth test, leave route open (not Authenticated)
router.get('/', accountResource.isAuthenticated, async function(req, res, next) {
  const result = await healthCheckResource.getHealthCheck();

  // Unsure? Does an error status help here? If not, remove.
  if (result.error) {
    return res.status(500).send({'error': result.error});
  }

  // Status is the important part
  res.json({status: 'UP' /* , data: result.data.rows*/});
});

module.exports = router;
