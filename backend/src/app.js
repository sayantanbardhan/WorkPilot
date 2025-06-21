const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

// Import routes
const healthRoutes = require('./routes/health');
const meetingRoutes = require('./routes/meeting');
const integrationRoutes = require('./routes/integration');
const jiraRoutes = require('./routes/jira');
const slackRoutes = require('./routes/slack');
const notionRoutes = require('./routes/notion');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/health', healthRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/jira', jiraRoutes);
app.use('/api/slack', slackRoutes);
app.use('/api/notion', notionRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app; 