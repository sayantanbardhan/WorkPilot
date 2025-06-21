class Validators {
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    static isValidJiraProjectKey(key) {
        // Jira project keys are typically 2-10 uppercase letters
        const keyRegex = /^[A-Z]{2,10}$/;
        return keyRegex.test(key);
    }

    static isValidOpenAIKey(key) {
        return key && (key.startsWith('sk-') || key.startsWith('sk-proj-'));
    }

    static isValidSlackToken(token) {
        return token && token.startsWith('xoxb-');
    }

    static isValidSlackWebhook(webhook) {
        return webhook && webhook.startsWith('https://hooks.slack.com/');
    }

    static isValidNotionToken(token) {
        return token && token.startsWith('ntn_');
    }

    static sanitizeFilename(filename) {
        return filename.replace(/[^a-z0-9.-]/gi, '_').toLowerCase();
    }

    static validateFileSize(size, maxSizeMB = 50) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return size <= maxSizeBytes;
    }

    static validateAudioFile(mimetype) {
        const allowedTypes = [
            'audio/mpeg',
            'audio/mp3',
            'audio/wav',
            'audio/x-wav',
            'audio/mp4',
            'audio/m4a',
            'audio/ogg',
            'audio/webm'
        ];
        return allowedTypes.includes(mimetype);
    }

    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;

        // Remove potential XSS characters
        return input
            .replace(/[<>'"]/g, '')
            .trim();
    }

    static validateRequired(fields, data) {
        const missing = [];

        for (const field of fields) {
            if (!data[field] || data[field].toString().trim() === '') {
                missing.push(field);
            }
        }

        return {
            isValid: missing.length === 0,
            missing
        };
    }
}

module.exports = Validators; 