const slackService = require('../services/slack');

class SlackController {
    async sendMessage(req, res, next) {
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
            next(error);
        }
    }
}

module.exports = new SlackController();
