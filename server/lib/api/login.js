const express = require('express');
const router = new express.Router();

const {authenticate} = require('../services/login');
const {BadRequest, NotAuthorized} = require('../utils/errors');

router.get('/', async function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw new BadRequest('Username and password required.');
    }

    const authenticateData = await authenticate(username, password);

    // User not authorized

    if (!authenticateData) {
      throw new NotAuthorized('Username and or password incorrect.');
    }

    // User authorized

    // COOKIE:
    // Below prevents XSS, but still vulnerable to CSRF (UI Frmework can protect)
    // HTTP Only: not available to JS
    // Secure Cookie: only over HTTPS
    // res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});

    // JSON BODY:
    // Vulnerable to script injection
    // Client then on every request sends back in Header:
    // Authentication: Bearer <TOKEN>
    res.status(200).json({
      idToken: authenticateData.idToken,
      expiresIn: authenticateData.expiresIn, // Not sure
    });
  } catch (e) {
    next(e);
  }
});


module.exports = router;
