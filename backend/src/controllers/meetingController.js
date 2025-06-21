const openaiService = require('../services/openai');
const slackService = require('../services/slack');
const jiraService = require('../services/jira');
const notionService = require('../services/notion');
const whisperService = require('../services/whisper');

class MeetingController {
    async processMeeting(req, res, next) {
        try {
            const { meetingTitle, projectKey, notionPageId } = req.body;
            let transcript = '';

            // If audio file is provided, transcribe it
            if (req.file) {
                transcript = await whisperService.transcribeAudio(req.file.path);
            } else if (req.body.transcript) {
                transcript = req.body.transcript;
            } else {
                return res.status(400).json({ error: 'No audio file or transcript provided' });
            }

            // Generate meeting summary
            const summary = await openaiService.summarizeMeeting(transcript);

            // Extract action items
            const actionItems = await openaiService.extractActionItems(transcript);

            // Send summary to Slack
            await slackService.sendMeetingSummary(summary, actionItems);

            // Create tasks in Jira
            const jiraTasks = [];
            for (const item of actionItems) {
                if (projectKey) {
                    const task = await jiraService.createTaskFromActionItem(item, projectKey);
                    jiraTasks.push(task);
                    await slackService.notifyTaskCreated(item.task, item.assignee, 'Jira');
                }
            }

            // Create meeting summary in Notion
            let notionPage = null;
            if (notionPageId) {
                notionPage = await notionService.createMeetingProject(
                    notionPageId,
                    meetingTitle || 'Meeting Summary',
                    summary,
                    actionItems
                );
            }

            res.json({
                success: true,
                transcript,
                summary,
                actionItems,
                jiraTasks,
                notionPage
            });

        } catch (error) {
            next(error);
        }
    }

    async processMeetingAutonomous(req, res, next) {
        try {
            const { meetingTitle } = req.body;
            let transcript = '';

            // If audio file is provided, transcribe it
            if (req.file) {
                transcript = await whisperService.transcribeAudio(req.file.path);
            } else if (req.body.transcript) {
                transcript = req.body.transcript;
            } else {
                return res.status(400).json({ error: 'No audio file or transcript provided' });
            }

            // Generate meeting summary
            const summary = await openaiService.summarizeMeeting(transcript);

            // Extract action items
            const actionItems = await openaiService.extractActionItems(transcript);

            // Use AI to determine appropriate project and page destinations
            const destinations = await openaiService.determineTaskDestinations(transcript, summary, actionItems);

            // Send summary to Slack (don't fail if Slack fails)
            try {
                await slackService.sendMeetingSummary(summary, actionItems);
            } catch (slackError) {
                console.warn(`Failed to send meeting summary to Slack: ${slackError.message}`);
            }

            // Handle Jira task creation
            const jiraTasks = [];
            let jiraError = null;
            try {
                const availableProjects = await jiraService.getProjects();

                if (availableProjects && availableProjects.length > 0) {
                    const projectKey = availableProjects.find(p => p.key === destinations.jiraProject)?.key ||
                        availableProjects[0].key;

                    for (const item of actionItems) {
                        try {
                            const task = await jiraService.createTaskFromActionItem(item, projectKey);
                            jiraTasks.push(task);

                            try {
                                await slackService.notifyTaskCreated(item.task, item.assignee, 'Jira');
                            } catch (slackError) {
                                console.warn(`Failed to send Slack notification for task: ${slackError.message}`);
                            }
                        } catch (error) {
                            console.warn(`Failed to create individual Jira task: ${error.message}`);
                        }
                    }
                } else {
                    // Try using fallback project key
                    const fallbackProjectKey = process.env.JIRA_DEFAULT_PROJECT || 'WORK';
                    console.log(`No projects detected via API, trying fallback project: ${fallbackProjectKey}`);

                    for (const item of actionItems) {
                        try {
                            const task = await jiraService.createTaskFromActionItem(item, fallbackProjectKey);
                            jiraTasks.push(task);

                            try {
                                await slackService.notifyTaskCreated(item.task, item.assignee, 'Jira');
                            } catch (slackError) {
                                console.warn(`Failed to send Slack notification for task: ${slackError.message}`);
                            }

                            console.log(`Successfully created task in ${fallbackProjectKey} project`);
                        } catch (error) {
                            console.warn(`Failed to create task in ${fallbackProjectKey}: ${error.message}`);
                            jiraError = `Could not create tasks in project ${fallbackProjectKey}. Please check project permissions.`;
                            break;
                        }
                    }

                    if (jiraTasks.length === 0 && !jiraError) {
                        jiraError = 'No Jira projects found. Please create a project in your Jira instance first.';
                    }
                }
            } catch (error) {
                jiraError = `Jira integration error: ${error.message}`;
                console.warn(`Failed to access Jira: ${error.message}`);
            }

            // Create meeting summary in Notion automatically
            let notionPage = null;
            let notionError = null;
            try {
                const pageId = destinations.notionPageId || process.env.NOTION_DEFAULT_PAGE_ID;
                if (pageId) {
                    notionPage = await notionService.createMeetingProject(
                        pageId,
                        meetingTitle || 'Meeting Summary',
                        summary,
                        actionItems
                    );
                } else {
                    notionError = 'No Notion page ID specified. Set NOTION_DEFAULT_PAGE_ID environment variable.';
                }
            } catch (error) {
                notionError = `Notion integration error: ${error.message}`;
                console.warn(`Failed to create Notion page: ${error.message}`);
            }

            res.json({
                success: true,
                transcript,
                summary,
                actionItems,
                jiraTasks,
                notionPage,
                destinations,
                autonomous: true,
                warnings: {
                    jira: jiraError,
                    notion: notionError
                }
            });

        } catch (error) {
            next(error);
        }
    }

    async transcribeAudio(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No audio file provided' });
            }

            const transcript = await whisperService.transcribeAudio(req.file.path);
            res.json({ transcript });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MeetingController(); 