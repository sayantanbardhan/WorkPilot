# 🚀 WorkPilot

WorkPilot is a revolutionary AI platform designed to act as the always-on Chief Operating Officer, Chief Product Officer, Project Manager, and Executive Assistant for every team. It listens to meetings, takes action in real time, integrates across your tool stack, and even thinks strategically about your product's future.

## ✨ Features

- **Real-time Meeting Intelligence**: Transcribe meetings and extract action items automatically
- **Cross-Tool Integrations**: Connect with Jira, Slack, Notion, and more
- **AI-Powered Summarization**: Generate meeting summaries and task assignments
- **Task Automation**: Automatically create tasks in project management tools
- **Notifications**: Send updates to team members via Slack

## 🏗️ Architecture

```
workpilot/
├── backend/           # Node.js/Express API server
│   ├── integrations/  # Service integrations (OpenAI, Slack, Jira, Notion, Whisper)
│   ├── index.js       # Main server file
│   └── package.json   # Backend dependencies
├── frontend/          # React/Vite frontend
│   ├── src/           # React components and styles
│   └── package.json   # Frontend dependencies
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+ (for Whisper)
- API keys for OpenAI, Slack, Jira, and Notion

### 1. Install Whisper (Local Transcription)

```bash
pip install openai-whisper
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file with your API keys
cat > .env << EOF
OPENAI_API_KEY=your-openai-key
SLACK_BOT_TOKEN=your-slack-bot-token
SLACK_WEBHOOK_URL=your-slack-webhook-url
JIRA_API_TOKEN=your-jira-api-token
JIRA_DOMAIN=your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
NOTION_TOKEN=your-notion-integration-token
PORT=3001
EOF

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🔧 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/test-integrations` | Test all integrations |
| POST | `/process-meeting` | Process meeting audio/transcript |
| POST | `/transcribe` | Transcribe audio file |
| POST | `/create-jira-task` | Create Jira task |
| POST | `/send-slack-message` | Send Slack message |
| POST | `/create-notion-page` | Create Notion page |
| GET | `/jira-projects` | Get Jira projects |
| GET | `/notion-databases` | Get Notion databases |

### Meeting Processing Example

```javascript
const formData = new FormData();
formData.append('audio', audioFile);
formData.append('meetingTitle', 'Weekly Standup');
formData.append('projectKey', 'PROJ');
formData.append('notionPageId', 'page-id');

const response = await fetch('http://localhost:3001/process-meeting', {
  method: 'POST',
  body: formData
});

const result = await response.json();
// Returns: transcript, summary, actionItems, jiraTasks, notionPage
```

## 🔑 API Keys Setup

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Add to `.env` as `OPENAI_API_KEY`
4. **Note**: WorkPilot uses GPT-4o Mini (the cheapest model) for maximum cost efficiency

**💰 Cost Estimate with GPT-4o Mini:**
- 30-minute meeting processing: ~$0.0008 (0.08 cents)
- Monthly estimate for 20 meetings: ~$0.016/month (1.6 cents!)
- **98% cheaper** than using GPT-4!

### Slack
1. Go to https://api.slack.com/apps
2. Create a new app
3. Add Bot Token Scopes: `chat:write`, `chat:write.public`
4. Install app to workspace
5. Copy Bot User OAuth Token to `.env` as `SLACK_BOT_TOKEN`
6. Optional: Create webhook URL for incoming webhooks

### Jira
1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Create API token
3. Add to `.env` as `JIRA_API_TOKEN`
4. Add your Jira domain and email

### Notion
1. Go to https://www.notion.so/my-integrations
2. Create new integration
3. Copy Internal Integration Token to `.env` as `NOTION_TOKEN`
4. Share your workspace/pages with the integration

## 🎯 Usage Examples

### 1. Meeting Processing
- Upload audio file or paste transcript
- Specify Jira project key and Notion page ID
- WorkPilot will:
  - Transcribe audio (if provided)
  - Generate meeting summary
  - Extract action items
  - Create Jira tasks
  - Send Slack notifications
  - Create Notion page

### 2. Manual Task Creation
- Fill in task details
- Specify assignee and project
- WorkPilot creates task and notifies team

### 3. Integration Testing
- Use the "Integration Test" tab
- Verify all services are working
- Check API responses

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Auto-restart on changes
```

### Frontend Development
```bash
cd frontend
npm run dev  # Hot reload enabled
```

### Adding New Integrations
1. Create new service in `backend/integrations/`
2. Add API endpoints in `backend/index.js`
3. Update frontend components as needed

## 📋 Troubleshooting

### Common Issues

**Whisper not found**
```bash
pip install openai-whisper
# Or use conda: conda install -c conda-forge openai-whisper
```

**CORS errors**
- Backend includes CORS middleware
- Check frontend API_BASE URL matches backend port

**API key errors**
- Verify all API keys are correctly set in `.env`
- Check API key permissions and scopes

**File upload issues**
- Check file size limits (50MB max)
- Ensure audio file formats are supported

## 🔮 Future Enhancements

- [ ] Real-time meeting transcription
- [ ] More integrations (GitHub, Linear, etc.)
- [ ] Advanced AI agents for strategic planning
- [ ] Voice commands and responses
- [ ] Mobile app
- [ ] Team analytics and insights

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

---

**WorkPilot** - Your AI-powered productivity companion 🚀 