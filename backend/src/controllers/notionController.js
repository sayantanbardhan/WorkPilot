const notionService = require('../services/notion');

class NotionController {
    async getDatabases(req, res, next) {
        try {
            const databases = await notionService.getDatabases();
            res.json({ databases });
        } catch (error) {
            next(error);
        }
    }

    async createPage(req, res, next) {
        try {
            const { parentPageId, title, content } = req.body;

            if (!parentPageId || !title) {
                return res.status(400).json({ error: 'Parent page ID and title are required' });
            }

            const page = await notionService.createPage(parentPageId, title, content || '');
            res.json({ success: true, page });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NotionController();
