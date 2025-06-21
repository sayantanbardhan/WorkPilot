#!/usr/bin/env node

console.log(`
🚀 WorkPilot Help & Troubleshooting
===================================

📋 QUICK COMMANDS:
  ./scripts/start-workpilot.sh           - Start WorkPilot (includes setup wizard)
  node tools/validate-config.js         - Check your configuration
  node tools/setup-wizard.js            - Run interactive setup wizard
  node tools/config-server.js           - Start web configuration interface
  docker-compose -f config/docker-compose.yml up -d      - Start containers (after setup)
  docker-compose -f config/docker-compose.yml down       - Stop containers
  docker-compose -f config/docker-compose.yml logs       - View container logs

🔧 SETUP OPTIONS:
  1. Interactive Wizard     - Terminal-based step-by-step setup
  2. Web Interface         - Browser-based configuration
  3. Manual Setup          - Edit .env file directly

🌟 REQUIRED SERVICES:
  ✅ OpenAI               - AI processing (REQUIRED)
     Get key: https://platform.openai.com/api-keys

📱 OPTIONAL INTEGRATIONS:
  💬 Slack                - Notifications
     Setup: https://api.slack.com/apps
  
  🎯 Jira                 - Task creation
     API Token: https://id.atlassian.com/manage-profile/security/api-tokens
  
  📋 Notion               - Meeting notes
     Integration: https://www.notion.so/my-integrations

🚨 TROUBLESHOOTING:

  Problem: "Docker is not running"
  Solution: Start Docker Desktop

  Problem: "Port 3000 already in use"
  Solution: docker-compose -f config/docker-compose.yml down && docker-compose -f config/docker-compose.yml up -d

  Problem: "OpenAI API key invalid"
  Solution: Check your key format (should start with 'sk-')

  Problem: "Jira permission denied"
  Solution: Grant "Create Issues" permission in your Jira project

  Problem: "Notion database not found"
  Solution: Share your database with the integration

  Problem: "Containers won't start"
  Solution: Check logs with 'docker-compose -f config/docker-compose.yml logs'

📖 DOCUMENTATION:
  README.md               - Overview and quick start
  SETUP.md               - Detailed setup instructions
  .env.example           - Configuration template

🆘 NEED MORE HELP?
  1. Check the logs: docker-compose -f config/docker-compose.yml logs
  2. Validate config: node tools/validate-config.js
  3. Review SETUP.md for detailed instructions
  4. Check GitHub issues: https://github.com/sayantanbardhan/WorkPilot/issues

💡 TIP: Always run 'node tools/validate-config.js' after making changes to .env
`);
