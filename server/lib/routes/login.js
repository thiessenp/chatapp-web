const express = require('express');
const router = new express.Router();
const accountResource = require('../resources/account');
const log = require('../utils/log');


router.get('/', async function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.sendStatus(400);
    }

    const authenticateData = await accountResource.authenticate(
        username, 
        password
    );

    if (!authenticateData) {
        return res.sendStatus(401);
    }


    // log('RSA_PRIVATE_KEY', RSA_PRIVATE_KEY);


    /**
     * 
     * 
     * PICK UP:
     * Sending The JWT to the server on each request
     * https://blog.angular-university.io/angular-jwt-authentication/
     * 
     * 
     */
    // JSON BODY:
    // Vulnerable to script injection
    res.status(200).json({
        idToken: authenticateData.idToken,
        expiresIn: 120  // Not sure
    });


    // COOKIE:
    // Below prevents XSS, but still vulnerable to CSRF (UI Frmework can protect)
    // HTTP Only: not available to JS
    // Secure Cookie: only over HTTPS
    // res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
});

module.exports = router;
