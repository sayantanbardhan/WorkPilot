const { WebClient } = require('@slack/web-api');
const axios = require('axios');

class SlackService {
    constructor() {
        this.botToken = process.env.SLACK_BOT_TOKEN;
        this.webhookUrl = process.env.SLACK_WEBHOOK_URL;
        this.client = new WebClient(this.botToken);
    }

    async sendMessage(channel, text, blocks = null) {
        try {
            const result = await this.client.chat.postMessage({
                channel: channel,
                text: text,
                blocks: blocks
            });
            return result;
        } catch (error) {
            console.error('Slack API Error:', error);
            throw error;
        }
    }

    async sendWebhookMessage(text, attachments = null) {
        try {
            const payload = {
                text: text,
                attachments: attachments
            };

            const response = await axios.post(this.webhookUrl, payload);
            return response.data;
        } catch (error) {
            console.error('Slack Webhook Error:', error);
            throw error;
        }
    }

    async sendMeetingSummary(summary, actionItems) {
        const blocks = [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: "📋 Meeting Summary"
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: summary
                }
            }
        ];

        if (actionItems && actionItems.length > 0) {
            blocks.push({
                type: "header",
                text: {
                    type: "plain_text",
                    text: "✅ Action Items"
                }
            });

            actionItems.forEach((item, index) => {
                blocks.push({
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*${index + 1}.* ${item.task}\n*Assignee:* ${item.assignee || 'Unassigned'}\n*Priority:* ${item.priority || 'Medium'}`
                    }
                });
            });
        }

        try {
            // Send the formatted blocks via webhook
            const payload = {
                text: "📋 Meeting Summary",
                blocks: blocks
            };

            console.log('Sending meeting summary to Slack...');
            const response = await axios.post(this.webhookUrl, payload);
            console.log('Meeting summary sent to Slack successfully');
            return response.data;
        } catch (error) {
            console.error('Failed to send meeting summary to Slack:', error.message);
            throw error;
        }
    }

    async notifyTaskCreated(taskTitle, assignee, platform) {
        try {
            const text = `🎯 New task created on ${platform}:\n*${taskTitle}*\nAssigned to: ${assignee || 'Unassigned'}`;
            console.log(`Sending task notification to Slack: ${taskTitle}`);
            const result = await this.sendWebhookMessage(text);
            console.log('Task notification sent to Slack successfully');
            return result;
        } catch (error) {
            console.error(`Failed to send task notification to Slack: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new SlackService(); 