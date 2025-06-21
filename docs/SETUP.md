# WorkPilot Setup Guide

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sayantanbardhan/WorkPilot.git
   cd WorkPilot
   ```

2. **Run the setup script**
   ```bash
   ./start-workpilot.sh
   ```

3. **Choose your preferred setup method:**

   ### 🧙‍♂️ Interactive Setup Wizard (Recommended)
   - Terminal-based step-by-step configuration
   - Guides you through each service setup
   - Automatically generates `.env` file
   - Perfect for first-time users

   ### 🌐 Web Configuration Interface
   - Beautiful browser-based setup
   - Visual form with toggles and validation
   - Copy-paste generated configuration
   - Great for visual learners

   ### 📝 Manual Setup
   - Edit `.env` file directly
   - Full control over configuration
   - Good for advanced users

4. **Access WorkPilot**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Environment Configuration

### Required API Keys

#### 1. OpenAI API Key
- Go to https://platform.openai.com/api-keys
- Create a new API key
- Add to `.env`: `OPENAI_API_KEY=sk-proj-...`

#### 2. Slack Configuration
- Create a Slack app at https://api.slack.com/apps
- Get Bot Token: `SLACK_BOT_TOKEN=xoxb-...`
- Create Webhook URL: `SLACK_WEBHOOK_URL=https://hooks.slack.com/...`

#### 3. Jira Configuration
- Go to your Jira instance → Settings → Personal Access Tokens
- Create a token: `JIRA_API_TOKEN=ATATT...`
- Set your domain: `JIRA_DOMAIN=your-company.atlassian.net`
- Set your email: `JIRA_EMAIL=your-email@company.com`
- Set default project: `JIRA_DEFAULT_PROJECT=WORK` (or your project key)

#### 4. Notion Configuration
- Go to https://www.notion.so/my-integrations
- Create new integration
- Get token: `NOTION_TOKEN=ntn_...`
- Get database ID: `NOTION_DEFAULT_PAGE_ID=...`

## Project Structure

```
WorkPilot/
├── backend/           # Node.js Express server
├── frontend/          # React frontend
├── docker-compose.yml # Container orchestration
├── .env.example       # Environment template
└── SETUP.md          # This file
```

## Features

- 🤖 **AI Meeting Processing**: Automatic transcription and task extraction
- 🎯 **Jira Integration**: Create tasks automatically
- 📋 **Notion Integration**: Organize meeting notes
- 💬 **Slack Notifications**: Get notified when tasks are created
- 🎤 **Audio Transcription**: Upload audio files for processing
- 🌐 **Responsive UI**: Modern dark theme interface

## Troubleshooting

### Common Issues

1. **API Keys Not Working**
   - Ensure all keys are correctly copied to `.env`
   - Check that services have proper permissions

2. **Docker Issues**
   - Run `docker-compose down && docker-compose up --build -d`
   - Check logs: `docker-compose logs`

3. **Jira Permission Errors**
   - Ensure your Jira user has "Create Issues" permission
   - Verify the project key exists

4. **Notion Access Issues**
   - Share your database with the integration
   - Copy the database ID from the URL

### Getting Help

- Check the logs: `docker-compose logs backend`
- Test integrations: http://localhost:3001/test-integrations
- Health check: http://localhost:3001/health

## Development

### Local Development
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

### Environment Variables
All configuration is done through environment variables. Never commit actual API keys to git!

## Security

- API keys are never stored in the repository
- All sensitive data is in `.env` (which is gitignored)
- Audio uploads are temporary and not committed to git
