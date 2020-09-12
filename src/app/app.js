
const container = require('./container');

container.resolve('routes');

const websocketServer = container.resolve('websocketServer');

websocketServer.start();

