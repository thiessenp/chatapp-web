/**
 * Handles HTTP status codes and formatting the resource response
 */

const express = require('express');

const auth = require('../middleware/auth');
const format = require('../utils/format');
const chatService = require('../services/chat');
const transcriptService = require('../services/transcript');
const rosterService = require('../services/roster');

const router = new express.Router();


router.post('/', auth.isAuthenticated, async function(req, res, next) {
  const name = req.body.name;
  if (!name) {
    const err = {error: format.errorData(400, 'Name param must be sent.')};
    return res.status(err.error.code).send(format.response(err));
  }

  const result = await chatService.createChat(name);
  if (result.error) {
    return res.status(result.error.code).send(format.response(result));
  }

  res.sendStatus(201);
});

router.get('/', auth.isAuthenticated, async function(req, res, next) {
  const result = await chatService.getChats();

  if (result.error) {
    return res.status(result.error.code).send(format.response(result));
  }

  res.status(200).json(format.response(result));
});

router.get('/:chat_id', auth.isAuthenticated, async function(req, res, next) {
  const chatId = req.params.chat_id;

  const cResult = await chatService.getChat(chatId);
  if (cResult.error) {
    return res.status(cResult.error.code).send(format.response(cResult));
  }

  const tResult = await transcriptService.getTranscript(chatId);
  if (tResult.error) {
    return res.status(tResult.error.code).send(format.response(tResult));
  }

  const rResult = await rosterService.getRoster(chatId);
  if (rResult.error) {
    return res.status(rResult.error.code).send(format.response(rResult));
  }

  // Gather all Chat data in an object
  const chatData = {
    data: {
      chat: cResult.data,
      transcript: tResult.data,
      roster: rResult.data,
    },
  };

  res.status(200).json(format.response(chatData));
});


module.exports = router;
