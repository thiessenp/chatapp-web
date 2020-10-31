// TODO:
// IMPORTANT:
// Verify that including routes in a file like this, then including them in the
// main app.js as basically express.use(express) doesn't cause any weird errors.

const express = require('express');

const config = require('../config');

const app = express();


// TODO add API version to requests 1.0.0

app.use('/api/', require('./root'));
app.use('/api/healthCheck', require('./healthCheck'));
app.use('/api/login', require('./login'));

// Default Unauthorized 401 error
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

// Default Not found 404 error
app.use(function(req, res, next) {
  res.status(404).json({message: 'Not Found'});
});

// Default Server 500 error. Catchall at end of the middleware function stack.
// Express default handler also rems stack in prod but eh I like control.
app.use(function(err, req, res, next) {
  // Includes stack trace - potential sensitive
  if (config.NODE_ENV === 'development') {
    res.status(500).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(500).json({message: 'AHHHhhh someTHING broke!'});
  }
});


module.exports = app;
