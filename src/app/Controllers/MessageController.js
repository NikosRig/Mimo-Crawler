
class MessageController {

    constructor({messageService})
    {
        this.messageService = messageService;
    }


    clientWebsocketRequest = (request) =>
    {
        let token = request.message.token;

        let websocketConnection = request.websocketConnection;

        this.messageService.saveClientWebsocket(websocketConnection, token);

        this.messageService.sendMessageToBrowserWebsocket(request.message);
    }


    browserWebsocketRequest = (request) =>
    {
        this.messageService.sendMessageToClientWebsocket(request.message);
    }

    browserHandshakeRequest = (request) =>
    {
        let websocketConnection = request.websocketConnection;

        this.messageService.saveBrowserWebsocket(websocketConnection);
    }


}

module.exports = MessageController;