/**
 * Handles Data gathering for the account and more!
 */

const jwt = require('jsonwebtoken')
const fs = require('fs');
const expressJwt = require('express-jwt');

const config = require('../config');
const dbClient = require('../drivers/postgreSQL');
const log = require('../utils/log');


async function authenticate(username, password) {
    const result = await dbClient.getAccountByUsername(username, password)
        .then(data => { 
            // log('authAccount get data:', data);

            if (data.rows.length <= 0) {
                throw Error('Username not found');
            }

            if (password !== data.rows[0].password) {
                throw Error('Invalid password');
            }

            // Successful authentication, send back a JWT
            const userId = data.rows[0].id;
            const jwtBearerToken = createToken(userId);
            log('token', jwtBearerToken);

            return {
                idToken: jwtBearerToken,
                ex
            };
        })
        .catch(error => { 
            log('authAccount failed:', error);
            return false;
        });
    return result;
}


// TODO try-catch around it?
// Private key to sign and create (server only)
// Public key to validate (shared)
const RSA_PRIVATE_KEY = fs.readFileSync('./' + config.RSA_PRIVATE_KEY_FILE);

function createToken(userId) {
    // See https://www.npmjs.com/package/jsonwebtoken
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: userId
    });

    return jwtBearerToken;
}


function isAuthenticated(token) {
    return expressJwt({ secret: token });
}



module.exports = {
    authenticate,
    isAuthenticated
};
