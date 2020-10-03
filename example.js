const websocket = require('ws');

const websocket_client = new WebSocket('ws://localhost:4444/');

let message = {
    token: 'example',
    url: 'https://www.example.com/',
    code: 'response(document.title)'
};

websocket_client.addEventListener('open', () =>
{
    websocket_client.send(JSON.stringify(message))
});

websocket_client.onmessage = message =>
{
    console.log(JSON.parse(message.data));

    websocket_client.close();
};
