const express = require('express');
const router = new express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('TODO respond with a resource');
});

module.exports = router;
