# 🚀 WorkPilot

**AI-Powered Meeting Assistant** - Transform your meetings into actionable tasks automatically!

WorkPilot uses AI to transcribe meetings, extract action items, and seamlessly integrate with your favorite productivity tools.

## ✨ Features

- 🤖 **AI Meeting Processing** - Automatic transcription and task extraction using OpenAI
- 🎯 **Jira Integration** - Create tasks automatically in your projects  
- 📋 **Notion Integration** - Organize meeting notes and summaries
- 💬 **Slack Notifications** - Get instant notifications when tasks are created
- 🎤 **Audio Transcription** - Upload audio files or paste transcripts
- 🌐 **Modern UI** - Responsive dark theme interface
- ⚡ **Autonomous Mode** - AI determines optimal task destinations

## 🚀 Quick Start

1. **Clone & Setup**
   ```bash
   git clone https://github.com/sayantanbardhan/WorkPilot.git
   cd WorkPilot
   ./start-workpilot.sh
   ```

2. **Choose Your Setup Method**
   - 🧙‍♂️ **Interactive Wizard** - Terminal-based step-by-step setup
   - 🌐 **Web Interface** - Beautiful browser-based configuration
   - 📝 **Manual Setup** - Edit `.env` file directly

3. **Start Processing Meetings**
   - Open http://localhost:3000
   - Upload audio or paste transcript
   - Watch AI create tasks automatically!

## 📖 Full Setup Guide

See [SETUP.md](SETUP.md) for detailed configuration instructions.

## 💰 Cost-Effective AI

WorkPilot uses **GPT-4o Mini** - OpenAI's most affordable model:
- 30-minute meeting: ~$0.0008 (0.08 cents)
- 20 meetings/month: ~$0.016 (1.6 cents!)
- **98% cheaper** than GPT-4

## 🎯 How It Works

1. **Upload** meeting audio or paste transcript
2. **AI Processing** extracts action items and generates summary
3. **Automatic Integration** creates tasks in Jira and pages in Notion
4. **Team Notifications** via Slack
5. **Done!** Your meeting is now actionable tasks

## 🛠️ Tech Stack

- **Frontend**: React + Vite with modern dark UI
- **Backend**: Node.js + Express  
- **AI**: OpenAI GPT-4o Mini (cost-optimized)
- **Integrations**: Jira, Notion, Slack, Whisper
- **Deployment**: Docker + Docker Compose

## 🔒 Security

- All API keys stored in environment variables
- No sensitive data committed to repository  
- Temporary file handling for audio uploads
- Comprehensive `.gitignore` for protection

## 🏗️ Architecture

```
WorkPilot/
├── backend/           # Node.js Express server
│   ├── integrations/  # Service integrations  
│   ├── uploads/       # Temporary audio files
│   └── index.js       # Main server
├── frontend/          # React frontend
│   └── src/           # Modern UI components
├── docker-compose.yml # Container orchestration
├── .env.example       # Environment template
└── SETUP.md          # Detailed setup guide
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use and modify!

---

**WorkPilot** - Your AI-powered productivity companion 🚀
