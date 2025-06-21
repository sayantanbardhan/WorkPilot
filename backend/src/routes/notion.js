const express = require('express');
const router = express.Router();
const notionController = require('../controllers/notionController');

// Get Notion databases
router.get('/databases', notionController.getDatabases);

// Create Notion page
router.post('/pages', notionController.createPage);

module.exports = router; 