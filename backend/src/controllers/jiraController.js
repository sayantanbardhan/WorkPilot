const jiraService = require('../services/jira');
const slackService = require('../services/slack');

class JiraController {
    async getProjects(req, res, next) {
        try {
            const projects = await jiraService.getProjects();
            res.json({ projects });
        } catch (error) {
            next(error);
        }
    }

    async createTask(req, res, next) {
        try {
            const { projectKey, summary, description, assignee } = req.body;

            if (!projectKey || !summary) {
                return res.status(400).json({ error: 'Project key and summary are required' });
            }

            const task = await jiraService.createIssue(projectKey, summary, description, 'Task', assignee);
            await slackService.notifyTaskCreated(summary, assignee, 'Jira');

            res.json({ success: true, task });
        } catch (error) {
            next(error);
        }
    }

    async createDefaultProject(req, res, next) {
        try {
            const project = await jiraService.createDefaultProject();
            res.json({ success: true, project });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new JiraController();
