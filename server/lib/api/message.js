/**
 * Handles HTTP status codes and formatting the resource response
 */

const express = require('express');

const {isAuthenticated} = require('../middleware/auth');
const format = require('../utils/format');
const messageService = require('../services/message');

const router = new express.Router();


// API to create a new message
router.post('/', isAuthenticated, async function(req, res, next) {
  const chatId = req.body.chat_id; // uuid
  const fromChatUserId= req.body.from_chat_user_id; // uuid
  const toChatUserId = req.body.to_chat_user_id; // uuid
  const content = req.body.content; // string message

  if (!chatId || !fromChatUserId || !toChatUserId || !content) {
    const err = {error: format.errorData(400, 'Name param must be sent.')};
    return res.status(err.error.code).send(format.response(err));
  }

  const result = await messageService
      .createMessage(chatId, fromChatUserId, toChatUserId, content);

  if (result.error) {
    return res.status(result.error.code).send(format.response(result));
  }

  res.sendStatus(201);
});


module.exports = router;
