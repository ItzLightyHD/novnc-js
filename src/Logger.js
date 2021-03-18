const chalk = require('chalk');

module.exports = class Logger {

    async info(input) {
        console.log(chalk.blue('[INFO] ') + chalk.white(input));
    }
    
    async warn(input) {
        console.log(chalk.yellow('[WARNING] ' + input));
    }

    async error(input) {
        console.log(chalk.red('[ERROR] ' + input));
    }
}