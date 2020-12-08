const express = require('express');

const {isAuthenticated} = require('../middleware/auth');
const {BadRequest, NotAuthorized} = require('../utils/errors');
const {authenticate, getAccountByUsername} = require('../services/accounts');
const {catchAsyncError} = require('../middleware/errorHandler');

const router = new express.Router();

// TODO: probably a security rist with this, can a user access another users username?
router.get('/:username', isAuthenticated, catchAsyncError(async function(req, res) {
  const username = req.params.username; //req.body.username;
  const result = await getAccountByUsername(username);
  const account = {account: result};
  res.status(200).json({data: account});
}));

router.post('/login', async function(req, res, next) {
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
    //
    // COOKIE:
    // Below prevents XSS, but still vulnerable to CSRF (UI Frmework can protect)
    // HTTP Only: not available to JS
    // Secure Cookie: only over HTTPS
    // res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
    //
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
