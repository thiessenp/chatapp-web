/**
 * Handles HTTP status codes and formatting the resource response
 */

const express = require('express');
const {isAuthenticated} = require('../middleware/auth');
const {getHealthCheck} = require('../services/healthCheck');
const {GeneralError} = require('../utils/errors');

const router = new express.Router();


router.get('/', isAuthenticated, async function(req, res, next) {
  try {
    const result = await getHealthCheck();

    if (result.rowCount <= 0) {
      throw new GeneralError('Health check failed to query DB.');
    }

    res.json({status: 'UP'});
  } catch (err) {
    next(err);
  }
});


module.exports = router;
