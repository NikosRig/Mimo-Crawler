

class WebsocketServer {


    constructor(opts)
    {
       this.websocketHost = opts.websocketHost;
       this.websocketPort = opts.websocketPort;
    }


    start = () =>
    {
        let WebSocket = require('ws');

        this.websocketServer = new WebSocket.Server({
            port: this.websocketPort,
            host: this.websocketHost
        });


        this.websocketServer.on('connection', (websocketConnection, request) =>
        {

            websocketConnection.on('message', (message) =>
            {
            });

        });
    }

}


module.exports = WebsocketServer;