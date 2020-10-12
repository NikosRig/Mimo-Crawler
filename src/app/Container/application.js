
const container = require('./container');

container.resolve('processArgv');

container.resolve('routes');

container.resolve('websocketServer').start();

container.resolve('browserService').startFirefox();