// Database configuration
// Currently WorkPilot doesn't use a database, but this file is prepared for future use

const config = {
    development: {
        // For future database integration
        // database: process.env.DB_NAME || 'workpilot_dev',
        // username: process.env.DB_USER || 'root',
        // password: process.env.DB_PASSWORD || '',
        // host: process.env.DB_HOST || 'localhost',
        // port: process.env.DB_PORT || 5432,
        // dialect: 'postgresql'
    },
    production: {
        // For future database integration
        // database: process.env.DB_NAME,
        // username: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // host: process.env.DB_HOST,
        // port: process.env.DB_PORT,
        // dialect: 'postgresql'
    }
};

module.exports = config; 