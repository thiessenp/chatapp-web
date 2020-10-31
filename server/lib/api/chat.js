/**
 * Handles HTTP status codes and formatting the resource response
 */

const express = require('express');

const auth = require('../middleware/auth');
const chatService = require('../services/chat');
const transcriptService = require('../services/transcript');
const rosterService = require('../services/roster');

const router = new express.Router();


router.post('/', auth.isAuthenticated, async function(req, res, next) {
  const name = req.body.name;
  if (!name) {
    return res.sendStatus(400);
  }

  const result = await chatService.createChat(name);
  if (result.error) {
    return res.status(500).send({'error': result.error});
  }

  if (result.data.rowCount !== 1) {
    return res.status(500).send({'error': 'createChat failed DB insertion'});
  }

  res.sendStatus(201);
});

router.get('/', auth.isAuthenticated, async function(req, res, next) {
  const result = await chatService.getChats();
  if (result.error) {
    return res.status(500).send({'error': result.error});
  }

  res.status(200).json({data: result.data.rows});
});

router.get('/:chat_id', auth.isAuthenticated, async function(req, res, next) {
  const chatId = req.params.chat_id;

  const chatResult = await chatService.getChat(chatId);
  if (chatResult.error) {
    return res.status(500).send({'error': chatResult.error});
  }

  const transcriptResult = await transcriptService.getTranscript(chatId);
  if (transcriptResult.error) {
    return res.status(500).send({'error': transcriptResult.error});
  }

  const rosterResult = await rosterService.getRoster(chatId);
  if (rosterResult.error) {
    return res.status(500).send({'error': rosterResult.error});
  }

  // Gather all Chat data in a formatted chat object
  const chatData = {
    // 0 since Should only be one chat
    chat: chatResult.rows[0],
    transcript: transcriptResult.rows,
    roster: rosterResult.rows,
  };

  res.status(200).json({data: chatData});
});


module.exports = router;
