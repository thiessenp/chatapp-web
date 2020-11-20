/**
 * Handles HTTP status codes and formatting the resource response
 */

const express = require('express');
// const {isAuthenticated} = require('../middleware/auth');
const {getHealth} = require('../services/health');

const router = new express.Router();

// NOTE: Example of OTHER way to catch errors without `catchAsyncError`
router.get('/', async function(req, res, next) {
  try {
    await getHealth();

    res.json({status: 'UP'});
  } catch (err) {
    next(err);
  }
});


module.exports = router;
