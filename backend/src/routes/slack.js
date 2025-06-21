const express = require('express');
const router = express.Router();
const slackController = require('../controllers/slackController');

// Send Slack message
router.post('/messages', slackController.sendMessage);

module.exports = router; 