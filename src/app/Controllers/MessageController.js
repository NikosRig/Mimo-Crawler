
class MessageController {

    constructor({messageService})
    {
        this.messageService = messageService;
    }


    handleClientWebsocketRequest = (request) =>
    {
        let token = request.message.token;

        let websocketConnection = request.websocketConnection;

        this.messageService.saveClientWebsocket(websocketConnection, token);

        this.messageService.sendMessageToBrowserWebsocket(request.message);
    }


    handleBrowserWebsocketRequest = (request) =>
    {
        let message = request.message;

        this.messageService.sendMessageToClientWebsocket(message);
    }

    browserHandshakeRequest = (request) =>
    {
        let websocketConnection = request.websocketConnection;

        this.messageService.saveBrowserWebsocket(websocketConnection);
    }


}

module.exports = MessageController;