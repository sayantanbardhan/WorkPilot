const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'WorkPilot backend is running!',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
    });
});

// Detailed health check
router.get('/detailed', async (req, res) => {
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        services: {
            openai: !!process.env.OPENAI_API_KEY,
            slack: !!process.env.SLACK_BOT_TOKEN,
            jira: !!(process.env.JIRA_API_TOKEN && process.env.JIRA_DOMAIN),
            notion: !!process.env.NOTION_TOKEN
        }
    };

    res.json(health);
});

module.exports = router; 