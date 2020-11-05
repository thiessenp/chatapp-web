
const fs = require('fs');
const expressJwt = require('express-jwt');

const config = require('../config');


// Public key to validate - shared
const RSA_PUBLIC_KEY = fs.readFileSync('./' + config.RSA_PUBLIC_KEY_FILE);

/**
 * Expectes Header: Authorization Bearer <MY_TOKEN_FROM_CREATE_TOKEN>
 * Probably used as Middlewear
 * Why use lib to verify? Easy to get check logic wrong.
 */
const verifyToken = expressJwt({
  secret: RSA_PUBLIC_KEY,
  algorithms: ['sha1', 'RS256', 'HS256'],
});


module.exports = {
  isAuthenticated: verifyToken,
};
