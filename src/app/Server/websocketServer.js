

class WebsocketServer {


    constructor({appConfig, routingService})
    {

        this.websocketPort = appConfig.websocketPort;
        this.websocketHost = appConfig.websocketHost

        this.routingService = routingService;

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
                request.websocketConnection = websocketConnection;

                request.message = JSON.parse(message);

                this.routingService.handle(request);
            });
        });
    }

}


module.exports = WebsocketServer;