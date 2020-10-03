
const container = require('./container');

container.resolve('routes');

container.resolve('websocketServer').start();

container.resolve('browserService').startFirefoxDeveloperEdition();