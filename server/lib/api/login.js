const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');


router.get('/', async function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.sendStatus(400);
  }

  const authenticateData = await auth.authenticate(username, password);

  // User not authorized
  if (!authenticateData) {
    return res.sendStatus(401);
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
});


module.exports = router;
