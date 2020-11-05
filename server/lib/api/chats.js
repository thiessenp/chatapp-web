/**
 * Handles HTTP status codes and formatting the resource response
 */
const express = require('express');

const {isAuthenticated} = require('../middleware/auth');
// const format = require('../utils/format');
const chatService = require('../services/chats');
const transcriptService = require('../services/transcript');
const rosterService = require('../services/roster');
// const {BadRequest} = require('../utils/errors');
const {catchAsyncError} = require('../middleware/errorHandler');

const router = new express.Router();


// Creates a new message
router.post('/', isAuthenticated, catchAsyncError(async function(req, res) {
  const name = req.body.name;
  await chatService.createChat(name);
  res.sendStatus(201);
}));

// Gets all chats
router.get('/', isAuthenticated, catchAsyncError(async function(req, res) {
  const result = await chatService.getChats();
  res.status(200).json(result);
}));

// Gets a chat + transcript + roster
router.get('/:chat_id', isAuthenticated, catchAsyncError(async function(req, res) {
  const chatId = req.params.chat_id;
  const cResult = await chatService.getChat(chatId);
  const tResult = await transcriptService.getTranscript(chatId);
  const rResult = await rosterService.getRoster(chatId);

  // Gather all Chat data in an object
  const chatData = {
    data: {
      chat: cResult.data,
      transcript: tResult.data,
      roster: rResult.data,
    },
  };
  res.status(200).json(chatData);
}));


module.exports = router;
