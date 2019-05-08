const fs = require('fs');
const util = require('util');

var log_file = fs.createWriteStream(__dirname + '/../logger.log', { flags: 'w' });
var log_stdout = process.stdout;

global.logger = function(text) {
    log_file.write(util.format(text) + '\n');
    log_stdout.write(util.format(text) + '\n'); // for output console
}