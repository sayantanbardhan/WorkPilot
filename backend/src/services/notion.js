const axios = require('axios');

class NotionService {
    constructor() {
        this.token = process.env.NOTION_TOKEN;
        this.baseURL = 'https://api.notion.com/v1';
        this.version = '2022-06-28';
    }

    getHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'Notion-Version': this.version
        };
    }

    async createPage(parentPageId, title, content) {
        try {
            const pageData = {
                parent: {
                    page_id: parentPageId
                },
                properties: {
                    title: {
                        title: [
                            {
                                text: {
                                    content: title
                                }
                            }
                        ]
                    }
                },
                children: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        paragraph: {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: content
                                    }
                                }
                            ]
                        }
                    }
                ]
            };

            const response = await axios.post(
                `${this.baseURL}/pages`,
                pageData,
                { headers: this.getHeaders() }
            );

            return response.data;
        } catch (error) {
            console.error('Notion API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async createDatabaseEntry(databaseId, properties) {
        try {
            const entryData = {
                parent: {
                    database_id: databaseId
                },
                properties: properties
            };

            const response = await axios.post(
                `${this.baseURL}/pages`,
                entryData,
                { headers: this.getHeaders() }
            );

            return response.data;
        } catch (error) {
            console.error('Notion API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async createMeetingSummaryPage(parentPageId, meetingTitle, summary, actionItems) {
        const content = `Meeting Summary: ${meetingTitle}\n\n${summary}\n\nAction Items:\n${actionItems.map((item, index) => `${index + 1}. ${item.task} (${item.assignee || 'Unassigned'})`).join('\n')}`;

        return await this.createPage(parentPageId, `Meeting: ${meetingTitle}`, content);
    }

    async createMeetingProject(databaseId, meetingTitle, summary, actionItems) {
        try {
            // Create a project entry in the Projects database
            const properties = {
                'Project name': {
                    title: [
                        {
                            text: {
                                content: `Meeting: ${meetingTitle}`
                            }
                        }
                    ]
                },
                'Status': {
                    status: {
                        name: 'Not started'
                    }
                },
                'Priority': {
                    select: {
                        name: 'Medium'
                    }
                }
            };

            const response = await this.createDatabaseEntry(databaseId, properties);

            // Add the meeting content as page content
            if (response.id) {
                await this.addContentToPage(response.id, summary, actionItems);
            }

            return response;
        } catch (error) {
            console.error('Error creating meeting project:', error.response?.data || error.message);
            throw error;
        }
    }

    async addContentToPage(pageId, summary, actionItems) {
        try {
            const blocks = [
                {
                    object: 'block',
                    type: 'heading_2',
                    heading_2: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: 'Meeting Summary'
                                }
                            }
                        ]
                    }
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: summary
                                }
                            }
                        ]
                    }
                },
                {
                    object: 'block',
                    type: 'heading_2',
                    heading_2: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: 'Action Items'
                                }
                            }
                        ]
                    }
                }
            ];

            // Add action items as bullet points
            actionItems.forEach((item, index) => {
                blocks.push({
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: `${item.task} (${item.assignee || 'Unassigned'}) - Priority: ${item.priority || 'Medium'}`
                                }
                            }
                        ]
                    }
                });
            });

            const response = await axios.patch(
                `${this.baseURL}/blocks/${pageId}/children`,
                { children: blocks },
                { headers: this.getHeaders() }
            );

            return response.data;
        } catch (error) {
            console.error('Error adding content to page:', error.response?.data || error.message);
            throw error;
        }
    }

    async createTaskPage(parentPageId, taskTitle, description, assignee = null, priority = 'Medium') {
        const content = `Task: ${taskTitle}\n\nDescription: ${description}\n\nAssignee: ${assignee || 'Unassigned'}\nPriority: ${priority}`;

        return await this.createPage(parentPageId, taskTitle, content);
    }

    async searchPages(query) {
        try {
            const searchData = {
                query: query,
                filter: {
                    value: 'page',
                    property: 'object'
                }
            };

            const response = await axios.post(
                `${this.baseURL}/search`,
                searchData,
                { headers: this.getHeaders() }
            );

            return response.data;
        } catch (error) {
            console.error('Notion API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async getDatabases() {
        try {
            const response = await axios.post(
                `${this.baseURL}/search`,
                {
                    filter: {
                        value: 'database',
                        property: 'object'
                    }
                },
                { headers: this.getHeaders() }
            );

            return response.data;
        } catch (error) {
            console.error('Notion API Error:', error.response?.data || error.message);
            throw error;
        }
    }
}

module.exports = new NotionService(); 