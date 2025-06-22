const app = require('./app');
const config = require('./config/database');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 WorkPilot server running on port ${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
    console.log(`🔧 Test integrations: http://localhost:${PORT}/api/integrations/test`);
    console.log(`🌐 Frontend (if running): http://localhost (port 80)`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
}); 