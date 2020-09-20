

class MessageService  {


    constructor({logger})
    {
        this.logger = logger;

        this.clients = [];
    }


    saveBrowserWebsocket = (browserWebsocket) =>
    {
        this.logger.info('browser websocket connected');

        this.browserWebsocket = browserWebsocket;

        this.browserWebsocket.once('close', () => { delete this.browserWebsocket; });

        this.browserWebsocket.on('error', (error) => { this.logger.error(error); });
    }

    saveClientWebsocket = (websocketClient, token) =>
    {
        if (typeof token !== 'string')
            return false;

        this.clients[token] = websocketClient;

        websocketClient.on('error', (error) => { this.logger.error(error); });

        websocketClient.on('close', () => { delete this.clients[token]; });
    }

    sendMessageToBrowserWebsocket = (message) =>
    {
        if (!this.browserWebsocket) {
            this.logger.error('browser websocket is not exists');
            return;
        }

        this.browserWebsocket.send(JSON.stringify(message));
    }


    sendMessageToClientWebsocket = (request) =>
    {

        if (!this.isWebsocketClientExists(request.message.token)) {
            this.logger.info('websocket client is not exists');
            return;
        }


        this.clients[request.message.token].send(JSON.stringify(request.message));
    }

    isWebsocketClientExists = (token) =>
    {
        return this.clients.hasOwnProperty(token);
    }




}


module.exports = MessageService;