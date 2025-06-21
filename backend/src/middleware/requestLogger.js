const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.get('User-Agent') || 'Unknown';

    console.log(`[${timestamp}] ${method} ${url} - ${userAgent}`);

    // Log request body for POST/PUT requests (excluding sensitive data)
    if ((method === 'POST' || method === 'PUT') && req.body) {
        const logBody = { ...req.body };

        // Remove sensitive fields from logs
        delete logBody.password;
        delete logBody.token;
        delete logBody.apiKey;

        if (Object.keys(logBody).length > 0) {
            console.log(`[${timestamp}] Request Body:`, JSON.stringify(logBody, null, 2));
        }
    }

    // Log response time
    const startTime = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`[${timestamp}] ${method} ${url} - ${res.statusCode} - ${duration}ms`);
    });

    next();
};

module.exports = requestLogger; 