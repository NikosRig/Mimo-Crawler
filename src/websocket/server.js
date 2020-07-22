
const WebSocket = require('ws');

const beforeMiddleware = require('../Middleware/BeforeMiddleware');

const wss = new WebSocket.Server({
    port: 4444,
    host: '127.0.0.1'
});



wss.on('connection', (ws) =>
{
    ws.on('message', (message) =>
    {

        beforeMiddleware.inspect(ws, message);

    });

});


