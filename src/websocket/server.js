
const WebSocket = require('ws');

let MessageController = require(__dirname + '/../Controllers/MessageController');

MessageController = new MessageController();

const wss = new WebSocket.Server({
    port: 4444,
    host: '127.0.0.1'
});



wss.on('connection', (websocketClient) =>
{
    websocketClient.on('message', (message) =>
    {
        MessageController.handle(websocketClient, message)

    });

});


