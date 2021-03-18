// Require configuration and classes
const path = require('path');
const fs = require('fs');
// Check for configuration file and copying it
// if not found
const configTemplate = {
    "webserver": {
        "port": 80,
        "directory": "html",
        "index": "vnc.html"
    },
    "websocket": {
        "source": "127.0.0.1:8080",
        "target": "127.0.0.1:5900"
    }
};
if(!fs.existsSync(path.join(process.cwd(), 'config.json'))) {
    fs.writeFileSync(path.join(process.cwd(), 'config.json'), JSON.stringify(configTemplate));
}
const Configuration = require(path.join(process.cwd(), 'config.json'));
const WebServer = require('./src/WebServer.js');
const WebSocket = require('./src/WebSocket.js');
const Logger = require('./src/Logger.js');

// Start WebServer and WebSocket
new WebServer().start(Configuration);
new WebSocket().start(Configuration);