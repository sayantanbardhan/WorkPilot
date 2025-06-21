const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integrationController');

// Test all integrations
router.get('/test', integrationController.testAllIntegrations);

// Test individual integrations
router.get('/test/openai', integrationController.testOpenAI);
router.get('/test/slack', integrationController.testSlack);
router.get('/test/jira', integrationController.testJira);
router.get('/test/notion', integrationController.testNotion);
router.get('/test/whisper', integrationController.testWhisper);

module.exports = router; 