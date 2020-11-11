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


// Creates a new chat
router.post('/', isAuthenticated, catchAsyncError(async function(req, res) {
  const name = req.body.name;
  const result = await chatService.createChat(name);
  const newChat = {id: result};
  res.status(201).json({data: newChat});
}));

// Gets all chats
router.get('/', isAuthenticated, catchAsyncError(async function(req, res) {
  const result = await chatService.getChats();
  const chats = {chats: result};
  res.status(200).json({data: chats});
}));

// Gets a chat + transcript + roster
router.get('/:chat_id', isAuthenticated, catchAsyncError(async function(req, res) {
  const chatId = req.params.chat_id;
  const cResult = await chatService.getChat(chatId);
  const tResult = await transcriptService.getTranscript(chatId);
  const rResult = await rosterService.getRoster(chatId);

  // Gather all Chat data in an object
  const chat = {
    chat: {
      ...cResult.data,
      transcript: tResult.data,
      roster: rResult.data,
    },
  };
  res.status(200).json({data: chat});
}));

// Adds a new user for us in Roster
// TODO: part of Joint Chat life-cycle
router.post('/:chat_id/users', isAuthenticated, catchAsyncError(async function(req, res) {
  const accountId= req.body.accountId; // uuid
  const chatId = req.params.chat_id; // uuid
  await rosterService.addUser(accountId, chatId);
  res.sendStatus(201);
}));

// Create a new message for use in Transcript
router.post('/:chat_id/messages', isAuthenticated, catchAsyncError(async function(req, res) {
  const chatId = req.params.chat_id; // uuid
  const fromChatUserId= req.body.fromChatUserId; // uuid
  const toChatUserId = req.body.toChatUserId; // uuid
  const content = req.body.content; // string message
  await transcriptService.createMessage(chatId, fromChatUserId, toChatUserId, content);
  res.sendStatus(201);
}));


module.exports = router;
