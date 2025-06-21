const express = require('express');
const router = express.Router();
const jiraController = require('../controllers/jiraController');

// Get Jira projects
router.get('/projects', jiraController.getProjects);

// Create Jira task
router.post('/tasks', jiraController.createTask);

// Create default Jira project
router.post('/projects/default', jiraController.createDefaultProject);

module.exports = router; 