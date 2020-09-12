

class MessageService  {


    constructor({logger})
    {
        this.logger = logger;

        this.clients = [];
    }


    saveBrowserWebsocket = (browserWebsocket) =>
    {
        this.browserWebsocket = browserWebsocket;

        this.browserWebsocket.once('close', () => { delete this.browserWebsocket; });

        this.browserWebsocket.on('error', (error) => { this.logger.error(error); });
    }

    saveClientWebsocket = (websocketClient, token) =>
    {
        if (token !== 'string')
            return false;

        this.clients[token] = websocketClient;

        websocketClient.on('error', (error) => { this.logger.error(error); });

        websocketClient.on('close', () => { delete this.clients[token]; });
    }

    sendMessageToBrowserWebsocket = (message) =>
    {
        if (!this.browserWebsocket)
            return;

        this.browserWebsocket.send(JSON.stringify(message));
    }


    sendMessageToClientWebsocket = (request) =>
    {
        if (!this.isWebsocketClientExists(request.message.token))
            return;

        this.clients[request.message.token].send(JSON.stringify(request.message));
    }

    isWebsocketClientExists = (token) =>
    {
        return this.clients.hasOwnProperty(token);
    }




}


module.exports = MessageService;