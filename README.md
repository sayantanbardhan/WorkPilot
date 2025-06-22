# 🚀 WorkPilot

**AI-Powered Meeting Assistant & Task Management Platform**

WorkPilot is a comprehensive solution that transforms your meeting recordings into actionable tasks across Jira, Notion, and Slack. Built with modern architecture and industry best practices.

## 🏗️ Architecture

```
workpilot/
├── 📁 backend/                    # Node.js/Express API Server
│   ├── 📁 src/
│   │   ├── 📁 controllers/        # Request handlers
│   │   ├── 📁 services/           # Business logic & integrations
│   │   ├── 📁 routes/             # API route definitions
│   │   ├── 📁 middleware/         # Custom middleware
│   │   ├── 📁 config/             # Configuration files
│   │   ├── 📁 models/             # Data models (future)
│   │   ├── 📁 utils/              # Utility functions
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   ├── 📁 tests/                  # Test suites
│   ├── 📁 uploads/                # File uploads
│   └── 📁 temp/                   # Temporary files
├── 📁 frontend/                   # React Application
│   ├── 📁 src/
│   │   ├── 📁 components/         # React components
│   │   │   ├── 📁 ui/             # Reusable UI components
│   │   │   ├── 📁 forms/          # Form components
│   │   │   └── 📁 layout/         # Layout components
│   │   ├── 📁 pages/              # Page components
│   │   ├── 📁 hooks/              # Custom React hooks
│   │   ├── 📁 services/           # API service functions
│   │   ├── 📁 utils/              # Utility functions
│   │   ├── 📁 assets/             # Static assets
│   │   │   ├── 📁 images/         # Images
│   │   │   ├── 📁 icons/          # Icons
│   │   │   └── 📁 styles/         # CSS files
│   │   └── 📁 config/             # Frontend configuration
│   └── 📁 tests/                  # Frontend tests
├── 📁 config/                     # Project configuration
├── 📁 scripts/                    # Build & deployment scripts
├── 📁 tools/                      # Development tools
├── 📁 docs/                       # Documentation
└── 📁 tests/                      # End-to-end tests
```

## 🚀 Quick Start

1. **Clone & Setup**
   ```bash
   git clone https://github.com/sayantanbardhan/WorkPilot.git
   cd WorkPilot
   ./scripts/start-workpilot.sh
   ```

2. **Choose Your Setup Method**
   - 🧙‍♂️ **Interactive Wizard** - Terminal-based step-by-step setup
   - 🌐 **Web Interface** - Beautiful browser-based configuration
   - 📝 **Manual Setup** - Edit `.env` file directly

3. **Start Processing Meetings**
   - Open http://localhost (port 80)
   - Upload audio or paste transcript
   - Watch AI create tasks automatically!

## 🔧 Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Architecture:** MVC Pattern
- **File Upload:** Multer
- **Environment:** dotenv
- **CORS:** cors

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Modern CSS with Custom Properties
- **Architecture:** Component-based

### Integrations
- **AI:** OpenAI GPT-4o Mini
- **Communication:** Slack API
- **Project Management:** Jira API
- **Documentation:** Notion API
- **Transcription:** OpenAI Whisper

### DevOps
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx (production)
- **Process Management:** PM2 ready

## 📋 API Endpoints

### Health & Status
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system status

### Meeting Processing
- `POST /api/meetings/process` - Process meeting with manual configuration
- `POST /api/meetings/process-autonomous` - Autonomous meeting processing
- `POST /api/meetings/transcribe` - Audio transcription only

### Integrations
- `GET /api/integrations/test` - Test all integrations
- `GET /api/integrations/test/{service}` - Test specific service

### Service-Specific
- `GET /api/jira/projects` - Get Jira projects
- `POST /api/jira/tasks` - Create Jira task
- `GET /api/notion/databases` - Get Notion databases
- `POST /api/notion/pages` - Create Notion page
- `POST /api/slack/messages` - Send Slack message

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development
```bash
# Backend development
cd backend
npm install
npm run dev

# Frontend development
cd frontend
npm install
npm run dev

# Full stack with Docker
docker-compose up -d
```

### Project Scripts
```bash
# Configuration
./tools/setup-wizard.js          # Interactive setup
./tools/validate-config.js       # Validate configuration
./tools/help.js                  # Get help

# Development
./scripts/start-workpilot.sh     # Start full application
docker-compose up -d             # Start with Docker
docker-compose down              # Stop containers
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e
```

## 🚀 Deployment

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment
```bash
# Build frontend
cd frontend && npm run build

# Start backend
cd backend && npm start

# Configure reverse proxy (Nginx/Apache)
```

## 📖 Documentation

- **[Setup Guide](docs/SETUP.md)** - Detailed setup instructions
- **[Configuration Guide](docs/CONFIGURATION.md)** - Configuration options
- **[API Documentation](docs/API.md)** - Complete API reference
- **[Contributing Guide](docs/CONTRIBUTING.md)** - Development guidelines

## 🔐 Security

- All credentials stored locally in `.env`
- No data sent to external servers during setup
- Request logging excludes sensitive information
- File upload validation and size limits
- Error handling without information leakage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation:** Check the `docs/` folder
- **Issues:** [GitHub Issues](https://github.com/sayantanbardhan/WorkPilot/issues)
- **Help:** Run `./tools/help.js` for troubleshooting

---

**Made with ❤️ for productive teams everywhere** 