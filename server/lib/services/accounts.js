const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = require('../config');
const {sqlEngine} = require('../engines/sqlEngine');
const {getAccountByUsernameQuery} = require('../engines/sqlQueries');
const {NotAuthorized, NotFound} = require('../utils/errors');


// Why algorithm RS265?     (replacing HS256)
// Only deploy private key to auth server, and not across all servers
// Allows public key published in a URL and read by App server periodically
//
// Private key to sign and create - server only
const RSA_PRIVATE_KEY = fs.readFileSync('./' + config.RSA_PRIVATE_KEY_FILE);
const TOKEN_EXPIRES_IN = '2h';

/**
 * Authenticate (Login) the user and returns a token on success.
 *
 * @param {String} username - account username to check
 * @param {String} password - account password to check
 * @return {Object} token and expires time on success, error on fail
 */
async function authenticate(username, password) {
  // Can't reuse local getAccountByUsername, diff error types
  const result = await sqlEngine.queryPromise(getAccountByUsernameQuery(username), true)
      .then((data) => {
        if (data.rowCount !== 1) {
          throw new NotAuthorized('Username not found');
        }

        if (password !== data.rows[0].password) {
          throw new NotAuthorized('Invalid password');
        }

        // Successful authentication, send back a JWT
        const userId = data.rows[0].id;
        const jwtBearerTokenInfo = createToken(userId);

        return {
          idToken: jwtBearerTokenInfo.token,
          expiresIn: jwtBearerTokenInfo.expires,
        };
      })
      .catch((e) => {
        return false;
      });

  return result;
}

/**
 * Gets an Account by username
 * @param {String} username - used to lookup account
 * @return {Object} Query result on success or error object on fail.
 */
async function getAccountByUsername(username) {
  const result = await sqlEngine.queryPromise(getAccountByUsernameQuery(username), true)
      .then((data) => {
        if (data.rowCount !== 1) {
          throw new NotFound('Username not found');
        }

        return data.rows[0];
      })
      .catch((e) => {
        throw e;
      });

  const account = result;
  // Remove password for security reasons
  delete(account.password);
  // TODO: Remove is_authenticated since not using, using Token instead
  delete(account.is_authenticated);
  return account;
}

/**
   * Creates a JWT Bearer token from the passed username + private key combo.
   *
   * @param {UUID} userId - account ID
   * @return {Object} Bearer token and expires on success, or error on fail
   */
function createToken(userId) {
  try {
    // See https://www.npmjs.com/package/jsonwebtoken
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: TOKEN_EXPIRES_IN,
      subject: userId,
    });

    // Verify and get exp - throws an error if not verified
    const decodedToken = jwt.verify(jwtBearerToken, RSA_PRIVATE_KEY, {
      // algorithms: ['sha1', 'RS256', 'HS256'],
      algorithms: ['RS256'],
    });

    return {
      token: jwtBearerToken,
      expires: decodedToken.exp,
    };
  } catch (e) {
    throw Error('JsonWebTokenError');
  }
}

module.exports = {
  authenticate,
  getAccountByUsername,
};
