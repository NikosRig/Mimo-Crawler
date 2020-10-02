
class MessageController {

    constructor({messageService})
    {
        this.messageService = messageService;
    }


    handleClientWebsocketRequest = (request) =>
    {
        this.messageService.saveClientWebsocket(request.websocketConnection, request.message.token);

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