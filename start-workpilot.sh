#!/bin/bash

echo "🚀 Starting WorkPilot with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating one from template..."
    cat > .env << EOF
# WorkPilot Environment Variables
# Fill in your actual API keys below

# OpenAI API Key (Required - Paid service)
OPENAI_API_KEY=sk-proj-your-openai-api-key-here

# Slack Integration (Free)
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token-here
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url

# Jira Integration (Free tier available)
JIRA_API_TOKEN=your-jira-api-token-here
JIRA_DOMAIN=your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com

# Notion Integration (Free tier available)
NOTION_TOKEN=ntn_your-notion-integration-token-here

# Server Configuration
PORT=3001
NODE_ENV=production
EOF
    echo "📝 Please edit the .env file with your actual API keys, then run this script again."
    echo "💡 You can edit it with: nano .env"
    exit 1
fi

# Build and start containers
echo "🔨 Building Docker containers..."
docker-compose build

echo "🚀 Starting WorkPilot services..."
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ WorkPilot is running!"
    echo ""
    echo "🌐 Access your application:"
    echo "   Frontend: http://localhost"
    echo "   Backend API: http://localhost:3001"
    echo "   Health Check: http://localhost:3001/health"
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo "   Restart: docker-compose restart"
    echo ""
else
    echo "❌ Something went wrong. Check the logs:"
    docker-compose logs
fi 