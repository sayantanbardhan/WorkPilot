const openaiService = require('../services/openai');
const slackService = require('../services/slack');
const jiraService = require('../services/jira');
const notionService = require('../services/notion');
const whisperService = require('../services/whisper');

class IntegrationController {
    async testAllIntegrations(req, res, next) {
        const results = {};

        try {
            // Test OpenAI
            results.openai = await openaiService.chatCompletion([
                { role: 'user', content: 'Say "OpenAI integration working!"' }
            ]);
        } catch (error) {
            results.openai = `Error: ${error.message}`;
        }

        try {
            // Test Slack
            results.slack = await slackService.sendWebhookMessage('WorkPilot integration test');
        } catch (error) {
            results.slack = `Error: ${error.message}`;
        }

        try {
            // Test Jira
            results.jira = await jiraService.getProjects();
        } catch (error) {
            results.jira = `Error: ${error.message}`;
        }

        try {
            // Test Notion
            results.notion = await notionService.getDatabases();
        } catch (error) {
            results.notion = `Error: ${error.message}`;
        }

        try {
            // Test Whisper
            results.whisper = await whisperService.isWhisperInstalled();
        } catch (error) {
            results.whisper = `Error: ${error.message}`;
        }

        res.json(results);
    }

    async testOpenAI(req, res, next) {
        try {
            const result = await openaiService.chatCompletion([
                { role: 'user', content: 'Say "OpenAI integration working!"' }
            ]);
            res.json({ success: true, result });
        } catch (error) {
            next(error);
        }
    }

    async testSlack(req, res, next) {
        try {
            const result = await slackService.sendWebhookMessage('WorkPilot Slack integration test');
            res.json({ success: true, result });
        } catch (error) {
            next(error);
        }
    }

    async testJira(req, res, next) {
        try {
            const result = await jiraService.getProjects();
            res.json({ success: true, result });
        } catch (error) {
            next(error);
        }
    }

    async testNotion(req, res, next) {
        try {
            const result = await notionService.getDatabases();
            res.json({ success: true, result });
        } catch (error) {
            next(error);
        }
    }

    async testWhisper(req, res, next) {
        try {
            const result = await whisperService.isWhisperInstalled();
            res.json({ success: true, result });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new IntegrationController();
