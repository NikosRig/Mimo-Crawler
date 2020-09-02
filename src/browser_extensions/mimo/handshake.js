
const websocket = new WebSocket('ws://localhost:4444');


/*
*  Send handshake message when the connection is opened
* */
websocket.addEventListener('open', () =>
{
    let handshakeMessage = {
        'token': 'master',
        'client_type': 'browser',
        'event': 'handshake'
    };

    websocket.send(JSON.stringify(handshakeMessage));

}, { once: true });

websocket.onclose = () => {
   // closeBrowserWindow();
};

websocket.onerror = (e) => {
    console.log(e)
};