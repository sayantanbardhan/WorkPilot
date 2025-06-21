const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logDir = path.join(__dirname, '../../logs');
        this.ensureLogDirectory();
    }

    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    formatMessage(level, message, meta = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            ...meta
        };
        return JSON.stringify(logEntry);
    }

    writeToFile(level, message, meta = {}) {
        if (process.env.NODE_ENV === 'production') {
            const logFile = path.join(this.logDir, `${level}.log`);
            const logEntry = this.formatMessage(level, message, meta);
            fs.appendFileSync(logFile, logEntry + '\n');
        }
    }

    info(message, meta = {}) {
        console.log(`ℹ️  ${message}`, meta);
        this.writeToFile('info', message, meta);
    }

    warn(message, meta = {}) {
        console.warn(`⚠️  ${message}`, meta);
        this.writeToFile('warn', message, meta);
    }

    error(message, meta = {}) {
        console.error(`❌ ${message}`, meta);
        this.writeToFile('error', message, meta);
    }

    debug(message, meta = {}) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`🐛 ${message}`, meta);
            this.writeToFile('debug', message, meta);
        }
    }

    success(message, meta = {}) {
        console.log(`✅ ${message}`, meta);
        this.writeToFile('info', message, { ...meta, type: 'success' });
    }
}

module.exports = new Logger(); 