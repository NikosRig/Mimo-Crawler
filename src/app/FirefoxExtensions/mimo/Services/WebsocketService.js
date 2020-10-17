
class WebsocketService {

    constructor(websocket_handshake_url)
    {
        this.websocket_handshake_url = websocket_handshake_url;

        this.startBrowserHandshakeProcess();
    }


    onMessageEvent = (callback) =>
    {
       this.websocket.addEventListener('message', (msg) =>
        {
            let message = JSON.parse(msg.data);

            callback(message);
        });
    }

    startBrowserHandshakeProcess = () =>
    {
        this.setWebsocketApiObject();

        this.onWebsocketOpen(
            this.sendMessageThatIdentifiesBrowserToWebsocket
        );
    }

    sendMessageThatIdentifiesBrowserToWebsocket = () =>
    {
        this.websocket.send(
            JSON.stringify({token: 'browser'})
        );
    }

    onWebsocketOpen = callback =>
    {
        this.websocket.addEventListener('open', () =>
        {
            callback();
        });
    }

    setWebsocketApiObject = () =>
    {
         this.websocket = new WebSocket(this.websocket_handshake_url);
    }

}


const websocket_service = new WebsocketService(websocket_handshake_url);