const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Load environment variables
dotenv.config();

// Import services
const openaiService = require('./integrations/openai');
const slackService = require('./integrations/slack');
const jiraService = require('./integrations/jira');
const notionService = require('./integrations/notion');
const whisperService = require('./integrations/whisper');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'WorkPilot backend is running!' });
});

// Test integrations endpoint
app.get('/test-integrations', async (req, res) => {
    const results = {};

    try {
        // Test OpenAI (uses gpt-4o-mini by default)
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
});

// Meeting processing endpoint
app.post('/process-meeting', upload.single('audio'), async (req, res) => {
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
        console.error('Meeting processing error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Autonomous meeting processing endpoint
app.post('/process-meeting-autonomous', upload.single('audio'), async (req, res) => {
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

        // Check if Jira projects exist before trying to create tasks
        const jiraTasks = [];
        let jiraError = null;
        try {
            const availableProjects = await jiraService.getProjects();

            if (availableProjects && availableProjects.length > 0) {
                // Use the first available project or AI-determined project
                const projectKey = availableProjects.find(p => p.key === destinations.jiraProject)?.key ||
                    availableProjects[0].key;

                for (const item of actionItems) {
                    try {
                        const task = await jiraService.createTaskFromActionItem(item, projectKey);
                        jiraTasks.push(task);

                        // Send Slack notification (don't fail if Slack fails)
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
                // Try using known project key as fallback
                const fallbackProjectKey = 'PO'; // User's actual project
                console.log(`No projects detected via API, trying fallback project: ${fallbackProjectKey}`);

                for (const item of actionItems) {
                    try {
                        const task = await jiraService.createTaskFromActionItem(item, fallbackProjectKey);
                        jiraTasks.push(task);

                        // Send Slack notification (don't fail if Slack fails)
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
            // Use AI-determined page ID or create in default location
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
        console.error('Autonomous meeting processing error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Transcription endpoint
app.post('/transcribe', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        const transcript = await whisperService.transcribeAudio(req.file.path);
        res.json({ transcript });

    } catch (error) {
        console.error('Transcription error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create Jira task endpoint
app.post('/create-jira-task', async (req, res) => {
    try {
        const { projectKey, summary, description, assignee } = req.body;

        if (!projectKey || !summary) {
            return res.status(400).json({ error: 'Project key and summary are required' });
        }

        const task = await jiraService.createIssue(projectKey, summary, description, 'Task', assignee);
        await slackService.notifyTaskCreated(summary, assignee, 'Jira');

        res.json({ success: true, task });

    } catch (error) {
        console.error('Jira task creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Send Slack message endpoint
app.post('/send-slack-message', async (req, res) => {
    try {
        const { text, channel } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Message text is required' });
        }

        let result;
        if (channel) {
            result = await slackService.sendMessage(channel, text);
        } else {
            result = await slackService.sendWebhookMessage(text);
        }

        res.json({ success: true, result });

    } catch (error) {
        console.error('Slack message error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create Notion page endpoint
app.post('/create-notion-page', async (req, res) => {
    try {
        const { parentPageId, title, content } = req.body;

        if (!parentPageId || !title) {
            return res.status(400).json({ error: 'Parent page ID and title are required' });
        }

        const page = await notionService.createPage(parentPageId, title, content || '');
        res.json({ success: true, page });

    } catch (error) {
        console.error('Notion page creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get Jira projects endpoint
app.get('/jira-projects', async (req, res) => {
    try {
        const projects = await jiraService.getProjects();
        res.json({ projects });
    } catch (error) {
        console.error('Jira projects error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get Notion databases endpoint
app.get('/notion-databases', async (req, res) => {
    try {
        const databases = await notionService.getDatabases();
        res.json({ databases });
    } catch (error) {
        console.error('Notion databases error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create default Jira project endpoint
app.post('/create-default-jira-project', async (req, res) => {
    try {
        const project = await jiraService.createDefaultProject();
        res.json({ success: true, project });
    } catch (error) {
        console.error('Default project creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 WorkPilot server running on port ${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
    console.log(`🔧 Test integrations: http://localhost:${PORT}/test-integrations`);
});
