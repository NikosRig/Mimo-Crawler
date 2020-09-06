

class WebsocketServer {


    constructor(opts)
    {
       this.websocketHost = opts.appConfig.websocketHost;
       this.websocketPort = opts.appConfig.websocketPort;
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