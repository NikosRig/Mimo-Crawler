
const container = require(__dirname + '/src/app/container');

container.resolve('routes');

container.resolve('websocketServer').start();

container.resolve('browserService').startFirefoxDeveloperEdition();