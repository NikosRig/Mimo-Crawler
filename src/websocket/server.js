
const WebSocket = require('ws');

const logger = require(__dirname + '/../Logging/Logger');

const MessageRouter = require('./MessageRouter.js');

const wss = new WebSocket.Server({
    port: 4444,
    host: '127.0.0.1'
});



wss.on('connection', (websocketConnection) =>
{
    websocketConnection.on('message', (message) =>
    {
        MessageRouter.route(websocketConnection, JSON.parse(message));
    });

});


