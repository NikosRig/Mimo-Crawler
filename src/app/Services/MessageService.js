

class MessageService  {


    constructor({logger})
    {
        this.logger = logger;

        this.clients = [];
    }


    saveBrowserWebsocket = (browserWebsocket) =>
    {
        this.logger.info('Firefox has connected');

        this.browserWebsocket = browserWebsocket;

        this.browserWebsocket.once('close', () => { delete this.browserWebsocket; });

        this.browserWebsocket.on('error', (error) => { this.logger.error(error); });
    }

    saveClientWebsocket = (websocketClient, token) =>
    {
        if (typeof token !== 'string' || this.isWebsocketClientExists(token))
            return false;

        this.clients[token] = websocketClient;

        websocketClient.on('error', (error) => { this.logger.error(error); });

        websocketClient.on('close', () => { delete this.clients[token]; });
    }

    sendMessageToBrowserWebsocket = (message) =>
    {
        if (!this.browserWebsocket) {
            this.logger.error('Firefox connection cannot be found.');
            return;
        }

        this.browserWebsocket.send(JSON.stringify(message));
    }


    sendMessageToClientWebsocket = (message) =>
    {
        if (!this.isWebsocketClientExists(message.token))
            return;


        this.clients[message.token].send(JSON.stringify(message));
    }

    isWebsocketClientExists = (token) =>
    {
        return this.clients.hasOwnProperty(token);
    }


}


module.exports = MessageService;