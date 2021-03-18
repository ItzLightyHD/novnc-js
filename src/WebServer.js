const path = require('path');
const Express = require('express');
const fs = require('fs');
const app = Express();
const Logger = require('./Logger.js');

module.exports = class WebServer {
    
    constructor() {}

    async start(config) {

        if(!fs.existsSync(path.join(process.cwd(), config.webserver.directory))) {
            new Logger().error("noVNC directory '" + config.webserver.directory + "' doesn't exist. Download noVNC (https://github.com/novnc/noVNC/releases).");
            process.exit(1);
        }
        
        if(!fs.existsSync(path.join(process.cwd(), `${config.webserver.directory}/${config.webserver.index}`))) {
            new Logger().error(config.webserver.index + " file not found, listing all files instead");
            app.get('/', function (req, res) {
                fs.readdir(path.join(process.cwd(), config.webserver.directory), function (err, files) {
                    if (err) {
                        new Logger().error("Cannot list " + config.webserver.directory + " directory files!");
                        res.send("Cannot list " + config.webserver.directory + " directory files");
                        return;
                    }
                    res.send(files);
                });
              });
        }

        const targetVar = config.websocket.source;
        const target = targetVar.split(":");

        app.get('/', function (req, res) {
            res.redirect('/' + config.webserver.index + '?host=' + target[0] + '&port=' + target[1]);
        });
        
        app.use(Express.static(path.join(process.cwd(), config.webserver.directory)));
        
        app.listen(config.webserver.port, () => {
            new Logger().info(`WebServer listening on port ${config.webserver.port}`);
        });
    }

}