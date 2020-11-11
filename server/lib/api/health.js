/**
 * Handles HTTP status codes and formatting the resource response
 */

const express = require('express');
// const {isAuthenticated} = require('../middleware/auth');
const {getHealth} = require('../services/health');
const {GeneralError} = require('../utils/errors');

const router = new express.Router();

// NOTE: Example of OTHER way to catch errors without `catchAsyncError`
router.get('/', async function(req, res, next) {
  try {
    const result = await getHealth();

    if (result.rowCount <= 0) {
      throw new GeneralError('Health check failed to query DB.');
    }

    res.json({status: 'UP'});
  } catch (err) {
    next(err);
  }
});


module.exports = router;
