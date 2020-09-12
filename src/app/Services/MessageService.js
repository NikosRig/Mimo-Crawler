

class MessageService  {


    constructor()
    {
        this.clients = [];
    }


    saveBrowser = (browserWebsocket) =>
    {
        console.log('browser connected');

        this.browser = browserWebsocket;

        this.browser.once('close', () => { delete this.browser; });

        this.browser.on('error', (error) => { this.logger.error(error); });
    }

    saveClient = (websocketClient, token) =>
    {
        this.clients[token] = websocketClient;

        websocketClient.on('error', (error) => { this.logger.error(error); });

        websocketClient.on('close', () => { delete this.clients[token]; });
    }

    sendMessageToBrowser = (message) =>
    {
        if (!this.browser)
            return;

        this.browser.send(JSON.stringify(message));
    }


    sendMessageToClient = (request) =>
    {
        if (!this.isClientExists(request.message.token))
            return;

        this.clients[request.message.token].send(JSON.stringify(request.message));
    }

    isClientExists = (token) =>
    {
        return this.clients.hasOwnProperty(token);
    }




}


module.exports = MessageService;