const websockify = require('@maximegris/node-websockify');
const Logger = require('./Logger.js');

module.exports = class WebSocket {

    constructor() {
    }

    async start(config) {
        websockify({
            source: config.websocket.source,
            target: config.websocket.target,
        }, function() {
        });
        new Logger().info("WebSocket listening on " + config.websocket.source);
    }

}