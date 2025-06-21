#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'config-ui', 'index.html');
    
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading configuration interface');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`
🌐 WorkPilot Configuration Interface
====================================

🚀 Server running at: http://localhost:${PORT}
📋 Configure all your API keys in one place
✨ Generate .env file automatically

Press Ctrl+C to stop the server
`);
});
