#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating WorkPilot Configuration...\n');

// Check if .env exists
if (!fs.existsSync('.env')) {
    console.log('❌ .env file not found!');
    console.log('💡 Run ./start-workpilot.sh to set up your configuration');
    process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync('.env', 'utf8');
const envVars = {};

// Parse .env file
envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
            envVars[key.trim()] = value.trim();
        }
    }
});

// Validation results
const results = {
    required: [],
    optional: [],
    warnings: []
};

// Check required configurations
if (envVars.OPENAI_API_KEY && envVars.OPENAI_API_KEY.startsWith('sk-')) {
    results.required.push('✅ OpenAI API Key - Valid format');
} else {
    results.required.push('❌ OpenAI API Key - Missing or invalid format');
}

// Check optional configurations
if (envVars.SLACK_BOT_TOKEN && envVars.SLACK_BOT_TOKEN.startsWith('xoxb-')) {
    results.optional.push('✅ Slack Bot Token - Valid format');
} else {
    results.optional.push('⚠️  Slack Bot Token - Not configured');
}

if (envVars.SLACK_WEBHOOK_URL && envVars.SLACK_WEBHOOK_URL.startsWith('https://hooks.slack.com/')) {
    results.optional.push('✅ Slack Webhook URL - Valid format');
} else {
    results.optional.push('⚠️  Slack Webhook URL - Not configured');
}

if (envVars.JIRA_API_TOKEN && envVars.JIRA_DOMAIN && envVars.JIRA_EMAIL) {
    results.optional.push('✅ Jira Configuration - Complete');
} else {
    results.optional.push('⚠️  Jira Configuration - Incomplete');
}

if (envVars.NOTION_TOKEN && envVars.NOTION_TOKEN.startsWith('ntn_')) {
    results.optional.push('✅ Notion Token - Valid format');
} else {
    results.optional.push('⚠️  Notion Token - Not configured');
}

// Display results
console.log('🔧 Required Services:');
results.required.forEach(result => console.log(`  ${result}`));

console.log('\n🔌 Optional Services:');
results.optional.forEach(result => console.log(`  ${result}`));

// Check if minimum requirements are met
const hasOpenAI = envVars.OPENAI_API_KEY && envVars.OPENAI_API_KEY.startsWith('sk-');

if (hasOpenAI) {
    console.log('\n🎉 Configuration Status: READY TO GO!');
    console.log('💡 You can start WorkPilot with: docker-compose up -d');
    
    // Count configured services
    const configuredServices = [];
    if (envVars.SLACK_BOT_TOKEN) configuredServices.push('Slack');
    if (envVars.JIRA_API_TOKEN) configuredServices.push('Jira');
    if (envVars.NOTION_TOKEN) configuredServices.push('Notion');
    
    if (configuredServices.length > 0) {
        console.log(`🔗 Integrated Services: ${configuredServices.join(', ')}`);
    }
    
} else {
    console.log('\n❌ Configuration Status: INCOMPLETE');
    console.log('💡 You need at least OpenAI API key to use WorkPilot');
    console.log('🔧 Run ./start-workpilot.sh to complete setup');
}

console.log('\n📖 For detailed setup instructions, see SETUP.md');
