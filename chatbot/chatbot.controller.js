const express = require('express');
const router = express.Router();
const chatbotService = require('./chatbot.service');
const authorize = require('_middleware/authorize');

// Routes
router.post('/message', sendMessage);

module.exports = router;

function sendMessage(req, res, next) {
    chatbotService.chatWithGemini(req.body.message)
        .then(response => res.json({ reply: response }))
        .catch(next);
}