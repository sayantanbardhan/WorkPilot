const axios = require('axios');

class OpenAIService {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        this.baseURL = 'https://api.openai.com/v1';
        // Using GPT-4o Mini - the cheapest and most cost-effective model for WorkPilot
        this.defaultModel = 'gpt-4o-mini';
    }

    async chatCompletion(messages, model = this.defaultModel) {
        try {
            const response = await axios.post(
                `${this.baseURL}/chat/completions`,
                {
                    model: model,
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1000
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI API Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async summarizeMeeting(transcript) {
        const messages = [
            {
                role: 'system',
                content: 'You are an AI assistant that summarizes meetings and extracts action items. Please provide a clear summary and list of action items from the meeting transcript.'
            },
            {
                role: 'user',
                content: `Please summarize this meeting transcript and extract action items:\n\n${transcript}`
            }
        ];

        return await this.chatCompletion(messages); // Uses defaultModel (gpt-4o-mini)
    }

    async extractActionItems(transcript) {
        try {
            const response = await axios.post(
                `${this.baseURL}/chat/completions`,
                {
                    model: this.defaultModel,
                    messages: [
                        {
                            role: 'system',
                            content: 'Extract action items from the meeting transcript. Return ONLY a valid JSON array with this exact format: [{"task": "description", "assignee": "person", "priority": "high/medium/low", "dueDate": "YYYY-MM-DD or null"}]. Do not include any markdown formatting or code blocks.'
                        },
                        {
                            role: 'user',
                            content: transcript
                        }
                    ],
                    temperature: 0.1
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            let content = response.data.choices[0].message.content.trim();

            // Remove markdown code blocks if present
            content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');

            try {
                const parsed = JSON.parse(content);
                // Ensure it's an array
                if (Array.isArray(parsed)) {
                    return parsed;
                } else {
                    // If it's a single object, wrap it in an array
                    return [parsed];
                }
            } catch (parseError) {
                console.warn('Failed to parse action items JSON:', content);
                // Try to extract tasks from the content manually
                const lines = content.split('\n').filter(line => line.trim());
                const tasks = [];

                for (const line of lines) {
                    if (line.includes('task') || line.includes('Task')) {
                        tasks.push({
                            task: line.trim(),
                            assignee: 'Unassigned',
                            priority: 'medium',
                            dueDate: null
                        });
                    }
                }

                return tasks.length > 0 ? tasks : [{
                    task: 'Review meeting transcript and extract action items manually',
                    assignee: 'Unassigned',
                    priority: 'medium',
                    dueDate: null
                }];
            }
        } catch (error) {
            console.error('Error extracting action items:', error);
            throw error;
        }
    }

    async determineTaskDestinations(transcript, summary, actionItems) {
        try {
            const response = await axios.post(
                `${this.baseURL}/chat/completions`,
                {
                    model: this.defaultModel,
                    messages: [
                        {
                            role: 'system',
                            content: `Analyze the meeting content and determine the most appropriate destinations for tasks and documentation. 
                            
                            Based on the content, suggest:
                            1. Jira project key (common patterns: PROJ, WORK, DEV, MARKETING, SALES, HR, etc.)
                            2. Whether tasks should be created in Jira
                            3. Whether a Notion page should be created
                            4. Priority level for the meeting content
                            
                            Return JSON format:
                            {
                                "jiraProject": "suggested_project_key",
                                "createJiraTasks": true/false,
                                "createNotionPage": true/false,
                                "priority": "high/medium/low",
                                "category": "development/marketing/sales/hr/general",
                                "reasoning": "brief explanation of decisions"
                            }`
                        },
                        {
                            role: 'user',
                            content: `Meeting Summary: ${summary}\n\nTranscript: ${transcript.substring(0, 2000)}...\n\nAction Items: ${JSON.stringify(actionItems)}`
                        }
                    ],
                    temperature: 0.2
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const content = response.data.choices[0].message.content;
            try {
                return JSON.parse(content);
            } catch (parseError) {
                // Return default structure if parsing fails
                return {
                    jiraProject: 'PO', // User's actual project key
                    createJiraTasks: true,
                    createNotionPage: true,
                    priority: 'medium',
                    category: 'general',
                    reasoning: 'Default settings applied due to parsing error'
                };
            }
        } catch (error) {
            console.error('Error determining task destinations:', error);
            // Return safe defaults
            return {
                jiraProject: 'PO', // User's actual project key
                createJiraTasks: true,
                createNotionPage: true,
                priority: 'medium',
                category: 'general',
                reasoning: 'Default settings applied due to error'
            };
        }
    }
}

module.exports = new OpenAIService(); 