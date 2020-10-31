const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // ERROR since no view lib: res.render('index', { title: 'Express' });
  // Could do this: res.json({"message":"ChatApp-Web Server"});
  // But this simplest
  res.send('ChatApp-Web Server');
});

module.exports = router;
