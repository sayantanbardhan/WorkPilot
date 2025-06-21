const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);

    // Multer errors
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            error: 'File too large. Maximum size is 50MB.',
            code: 'FILE_TOO_LARGE'
        });
    }

    if (error.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
            error: 'Too many files. Only one file allowed.',
            code: 'TOO_MANY_FILES'
        });
    }

    if (error.message === 'Only audio files are allowed') {
        return res.status(400).json({
            error: 'Invalid file type. Only audio files are allowed.',
            code: 'INVALID_FILE_TYPE'
        });
    }

    // OpenAI API errors
    if (error.message && error.message.includes('OpenAI')) {
        return res.status(503).json({
            error: 'AI service temporarily unavailable. Please try again later.',
            code: 'AI_SERVICE_ERROR'
        });
    }

    // Integration errors
    if (error.message && (error.message.includes('Slack') ||
        error.message.includes('Jira') ||
        error.message.includes('Notion'))) {
        return res.status(503).json({
            error: 'External service integration error. Please check your configuration.',
            code: 'INTEGRATION_ERROR',
            details: error.message
        });
    }

    // Default error
    res.status(error.status || 500).json({
        error: error.message || 'Internal server error',
        code: error.code || 'INTERNAL_ERROR',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};

module.exports = errorHandler; 