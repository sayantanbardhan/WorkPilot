# WorkPilot Configuration Guide

WorkPilot now offers **three convenient ways** to configure your API keys and credentials, making setup hassle-free for everyone!

## 🚀 Quick Start

Just run one command:
```bash
./start-workpilot.sh
```

You'll be presented with three setup options:

## 1. 🧙‍♂️ Interactive Setup Wizard (Recommended)

**Perfect for first-time users**

- Terminal-based step-by-step configuration
- Guides you through each service setup with helpful links
- Automatically validates your inputs
- Generates `.env` file automatically
- Shows configuration summary

**How to use:**
```bash
node setup-wizard.js
```

## 2. 🌐 Web Configuration Interface

**Great for visual learners**

- Beautiful browser-based setup form
- Toggle switches to enable/disable services
- Real-time validation and helpful tooltips
- Copy-paste generated configuration
- Responsive design works on all devices

**How to use:**
```bash
node config-server.js
# Opens http://localhost:8080 automatically
```

## 3. 📝 Manual Setup

**For advanced users who prefer direct control**

- Edit `.env` file directly
- Full control over all configuration options
- Use `.env.example` as a template

**How to use:**
```bash
cp .env.example .env
nano .env  # or your preferred editor
```

## 🔍 Configuration Validation

After setting up your configuration, validate it:

```bash
node validate-config.js
```

This will check:
- ✅ Required services (OpenAI)
- ⚠️ Optional services (Slack, Jira, Notion)
- 🔗 Integration status
- �� Next steps

## 🆘 Help & Troubleshooting

Get comprehensive help anytime:

```bash
node help.js
```

This shows:
- Quick commands reference
- Setup options explanation
- Required vs optional services
- Common troubleshooting solutions
- Links to documentation

## 📋 Supported Services

### Required
- **OpenAI** - AI processing for meeting transcription and task extraction

### Optional
- **Slack** - Send notifications when tasks are created
- **Jira** - Automatically create tasks in your projects
- **Notion** - Organize meeting notes and summaries

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Your actual configuration (auto-generated) |
| `.env.example` | Template with placeholder values |
| `setup-wizard.js` | Interactive terminal setup |
| `config-server.js` | Web-based configuration interface |
| `validate-config.js` | Configuration validation |
| `help.js` | Help and troubleshooting |

## 🎯 Best Practices

1. **Start with the Interactive Wizard** if you're new to WorkPilot
2. **Always validate** your configuration after changes
3. **Keep your `.env` secure** - never commit it to version control
4. **Use the web interface** if you prefer visual setup
5. **Run help.js** when you need guidance

## 🔐 Security Notes

- All credentials are stored locally in your `.env` file
- No credentials are sent to external servers during setup
- The configuration wizard runs entirely on your machine
- Always keep your API keys secure and never share them

## 🚀 What's Next?

After configuration:
1. Run `docker-compose up -d` to start WorkPilot
2. Open http://localhost (port 80) to access the interface
3. Upload audio or paste meeting transcripts
4. Watch AI automatically create tasks across your integrated services!

---

**Need help?** Run `node help.js` or check the troubleshooting section in SETUP.md
