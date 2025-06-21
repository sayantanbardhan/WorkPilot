const axios = require('axios');

class JiraService {
    constructor() {
        this.apiToken = process.env.JIRA_API_TOKEN;
        this.domain = process.env.JIRA_DOMAIN;
        this.email = process.env.JIRA_EMAIL;
        this.baseURL = `https://${this.domain}/rest/api/3`;
    }

    getAuthHeaders() {
        const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');
        return {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    async createIssue(projectKey, summary, description, issueType = 'Task', assignee = null) {
        try {
            const issueData = {
                fields: {
                    project: {
                        key: projectKey
                    },
                    summary: summary,
                    description: {
                        type: "doc",
                        version: 1,
                        content: [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        text: description
                                    }
                                ]
                            }
                        ]
                    },
                    issuetype: {
                        name: issueType
                    }
                }
            };

            if (assignee) {
                issueData.fields.assignee = {
                    accountId: assignee
                };
            }

            const response = await axios.post(
                `${this.baseURL}/issue`,
                issueData,
                { headers: this.getAuthHeaders() }
            );

            return response.data;
        } catch (error) {
            console.error('Jira API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async getProjects() {
        try {
            const response = await axios.get(
                `${this.baseURL}/project`,
                { headers: this.getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Jira API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async searchUsers(query) {
        try {
            const response = await axios.get(
                `${this.baseURL}/user/search?query=${encodeURIComponent(query)}`,
                { headers: this.getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Jira API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await axios.get(
                `${this.baseURL}/myself`,
                { headers: this.getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Jira API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateIssue(issueKey, fields) {
        try {
            const response = await axios.put(
                `${this.baseURL}/issue/${issueKey}`,
                { fields: fields },
                { headers: this.getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Jira API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async createTaskFromActionItem(actionItem, projectKey = 'DEFAULT') {
        const summary = actionItem.task || 'Meeting Action Item';
        const description = `Action item from meeting:\n\n${actionItem.task}\n\nAssignee: ${actionItem.assignee || 'Unassigned'}\nPriority: ${actionItem.priority || 'Medium'}\nDeadline: ${actionItem.dueDate || 'Not specified'}`;

        let assigneeAccountId = null;

        // Try to find the assignee by searching for their name or email
        if (actionItem.assignee) {
            try {
                const users = await this.searchUsers(actionItem.assignee);
                if (users && users.length > 0) {
                    assigneeAccountId = users[0].accountId;
                    console.log(`Found assignee: ${actionItem.assignee} -> ${assigneeAccountId}`);
                } else {
                    console.log(`Could not find user: ${actionItem.assignee}, creating task without assignee`);
                }
            } catch (error) {
                console.warn(`Error searching for user ${actionItem.assignee}:`, error.message);
            }
        }

        return await this.createIssue(projectKey, summary, description, 'Task', assigneeAccountId);
    }

    async createDefaultProject() {
        try {
            const projectData = {
                key: 'WORK',
                name: 'WorkPilot Tasks',
                projectTypeKey: 'software',
                description: 'Default project for WorkPilot meeting tasks',
                leadAccountId: null, // Will use the current user
                assigneeType: 'PROJECT_LEAD'
            };

            const response = await axios.post(
                `${this.baseURL}/project`,
                projectData,
                { headers: this.getAuthHeaders() }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to create default Jira project:', error.response?.data || error.message);
            throw error;
        }
    }

    async ensureProjectExists() {
        try {
            const projects = await this.getProjects();

            if (!projects || projects.length === 0) {
                console.log('No Jira projects found, attempting to create default project...');
                return await this.createDefaultProject();
            }

            return projects[0]; // Return first available project
        } catch (error) {
            console.warn('Could not ensure project exists:', error.message);
            throw error;
        }
    }
}

module.exports = new JiraService(); 