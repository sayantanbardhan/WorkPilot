# 🏗️ WorkPilot Project Structure

## Professional Industry-Standard Architecture

WorkPilot follows modern software engineering practices with a clean, maintainable, and scalable architecture.

```
workpilot/
├── 📁 backend/                           # Node.js/Express API Server
│   ├── 📁 src/                          # Source code (MVC Architecture)
│   │   ├── 📁 controllers/              # Request handlers & business logic
│   │   │   ├── integrationController.js # Integration testing
│   │   │   ├── jiraController.js        # Jira operations
│   │   │   ├── meetingController.js     # Meeting processing
│   │   │   ├── notionController.js      # Notion operations
│   │   │   └── slackController.js       # Slack operations
│   │   ├── 📁 services/                 # External service integrations
│   │   │   ├── jira.js                  # Jira API integration
│   │   │   ├── notion.js                # Notion API integration
│   │   │   ├── openai.js                # OpenAI API integration
│   │   │   ├── slack.js                 # Slack API integration
│   │   │   └── whisper.js               # Whisper transcription
│   │   ├── 📁 routes/                   # API route definitions
│   │   │   ├── health.js                # Health check routes
│   │   │   ├── integration.js           # Integration test routes
│   │   │   ├── jira.js                  # Jira-specific routes
│   │   │   ├── meeting.js               # Meeting processing routes
│   │   │   ├── notion.js                # Notion-specific routes
│   │   │   └── slack.js                 # Slack-specific routes
│   │   ├── 📁 middleware/               # Custom middleware
│   │   │   ├── errorHandler.js          # Centralized error handling
│   │   │   └── requestLogger.js         # Request logging
│   │   ├── 📁 config/                   # Configuration files
│   │   │   ├── database.js              # Database config (future)
│   │   │   └── multer.js                # File upload configuration
│   │   ├── 📁 utils/                    # Utility functions
│   │   │   ├── logger.js                # Professional logging
│   │   │   └── validators.js            # Input validation
│   │   ├── 📁 models/                   # Data models (future)
│   │   ├── app.js                       # Express app setup
│   │   └── server.js                    # Server entry point
│   ├── 📁 tests/                        # Test suites
│   │   ├── 📁 unit/                     # Unit tests
│   │   └── 📁 integration/              # Integration tests
│   ├── 📁 uploads/                      # File uploads directory
│   ├── 📁 temp/                         # Temporary files
│   ├── 📁 logs/                         # Application logs
│   ├── package.json                     # Dependencies & scripts
│   ├── package-lock.json                # Dependency lock file
│   ├── Dockerfile                       # Container configuration
│   └── .dockerignore                    # Docker ignore rules
├── 📁 frontend/                         # React Application
│   ├── 📁 src/                          # Source code
│   │   ├── 📁 components/               # React components
│   │   │   ├── 📁 ui/                   # Reusable UI components
│   │   │   ├── 📁 forms/                # Form components
│   │   │   ├── 📁 layout/               # Layout components
│   │   │   └── App.jsx                  # Main app component
│   │   ├── 📁 pages/                    # Page components
│   │   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── 📁 services/                 # API service functions
│   │   ├── 📁 utils/                    # Utility functions
│   │   ├── 📁 assets/                   # Static assets
│   │   │   ├── 📁 images/               # Images & icons
│   │   │   │   └── react.svg            # React logo
│   │   │   └── 📁 styles/               # CSS files
│   │   │       ├── App.css              # App styles
│   │   │       └── index.css            # Global styles
│   │   ├── 📁 config/                   # Frontend configuration
│   │   └── main.jsx                     # App entry point
│   ├── 📁 tests/                        # Frontend tests
│   │   ├── 📁 unit/                     # Unit tests
│   │   └── 📁 integration/              # Integration tests
│   ├── 📁 public/                       # Public assets
│   │   └── vite.svg                     # Vite logo
│   ├── package.json                     # Dependencies & scripts
│   ├── package-lock.json                # Dependency lock file
│   ├── vite.config.js                   # Vite configuration
│   ├── eslint.config.js                 # ESLint configuration
│   ├── index.html                       # HTML template
│   ├── Dockerfile                       # Container configuration
│   ├── nginx.conf                       # Nginx configuration
│   └── README.md                        # Frontend documentation
├── 📁 config/                           # Project configuration
│   ├── docker-compose.yml               # Docker services
│   └── .env.example                     # Environment template
├── 📁 scripts/                          # Build & deployment scripts
│   └── start-workpilot.sh               # Main startup script
├── 📁 tools/                            # Development tools
│   ├── 📁 config-ui/                    # Web configuration interface
│   │   └── index.html                   # Configuration UI
│   ├── setup-wizard.js                  # Interactive setup
│   ├── config-server.js                 # Web config server
│   ├── validate-config.js               # Configuration validator
│   └── help.js                          # Help & troubleshooting
├── 📁 docs/                             # Documentation
│   ├── README.md                        # Project overview
│   ├── SETUP.md                         # Setup instructions
│   └── CONFIGURATION.md                 # Configuration guide
├── 📁 tests/                            # End-to-end tests
│   ├── 📁 e2e/                          # E2E test suites
│   ├── 📁 integration/                  # Integration tests
│   └── 📁 unit/                         # Cross-service unit tests
├── README.md                            # Main project documentation
├── PROJECT_STRUCTURE.md                 # This file
├── .gitignore                           # Git ignore rules
├── docker-compose.yml                   # Docker services (symlink)
└── .DS_Store                            # macOS system file
```

## 🏛️ Architecture Principles

### 1. **Separation of Concerns**
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and external integrations
- **Routes**: Define API endpoints and middleware
- **Middleware**: Handle cross-cutting concerns (logging, errors)
- **Utils**: Provide reusable utility functions

### 2. **MVC Pattern**
- **Models**: Data structures and validation (future database integration)
- **Views**: React frontend components
- **Controllers**: Request handling and business logic coordination

### 3. **Dependency Injection**
- Services are injected into controllers
- Configuration is centralized and environment-based
- Easy testing and mocking

### 4. **Error Handling**
- Centralized error handling middleware
- Structured error responses
- Comprehensive logging

### 5. **Security**
- Input validation and sanitization
- File upload restrictions
- Environment variable protection
- CORS configuration

## 📁 Directory Explanations

### Backend Structure
- **`src/`**: All source code following MVC architecture
- **`controllers/`**: Handle HTTP requests, validate input, coordinate services
- **`services/`**: Business logic, external API integrations
- **`routes/`**: Express route definitions with middleware
- **`middleware/`**: Custom middleware for logging, errors, validation
- **`config/`**: Configuration files for different environments
- **`utils/`**: Reusable utility functions and helpers

### Frontend Structure
- **`components/`**: Reusable React components organized by purpose
- **`pages/`**: Full page components
- **`hooks/`**: Custom React hooks for state management
- **`services/`**: API communication functions
- **`assets/`**: Static files (images, styles, icons)

### Project Root
- **`config/`**: Project-wide configuration files
- **`scripts/`**: Build, deployment, and utility scripts
- **`tools/`**: Development and setup tools
- **`docs/`**: Comprehensive documentation
- **`tests/`**: End-to-end and integration tests

## 🔧 Configuration Management

### Environment Variables
- **Development**: `.env` file in project root
- **Production**: Environment-specific configuration
- **Testing**: Separate test environment variables

### Docker Configuration
- **Development**: `docker-compose.yml` for local development
- **Production**: `docker-compose.prod.yml` for production deployment

## 🧪 Testing Strategy

### Unit Tests
- **Backend**: Test individual functions and services
- **Frontend**: Test React components and hooks
- **Location**: Adjacent to source files or in `tests/unit/`

### Integration Tests
- **API**: Test complete request/response cycles
- **Services**: Test external service integrations
- **Location**: `tests/integration/`

### End-to-End Tests
- **User Flows**: Test complete user journeys
- **Cross-service**: Test full application workflows
- **Location**: `tests/e2e/`

## 📊 Benefits of This Structure

1. **Maintainability**: Clear separation makes code easy to understand and modify
2. **Scalability**: Easy to add new features without affecting existing code
3. **Testability**: Each component can be tested in isolation
4. **Reusability**: Components and services can be reused across the application
5. **Team Collaboration**: Multiple developers can work on different parts simultaneously
6. **Industry Standard**: Follows widely accepted patterns and practices

## 🚀 Future Enhancements

- **Database Integration**: Add models and database layer
- **Authentication**: Add user authentication and authorization
- **API Documentation**: Generate OpenAPI/Swagger documentation
- **Monitoring**: Add application performance monitoring
- **CI/CD**: Implement continuous integration and deployment
- **Microservices**: Split into smaller, independent services

---

This structure ensures WorkPilot is professional, maintainable, and ready for enterprise use.
