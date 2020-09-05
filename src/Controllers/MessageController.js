

class MessageController {


    constructor(MessageService)
    {
        this.MessageService = MessageService;
    }


    processBrowserMessage = (websocketConnection, message) =>
    {
        if (message.event === "handshake") {
            this.MessageService.saveBrowser(websocketConnection);
            return;
        }

        this.MessageService.sendMessageToClient(message);
    }

    processClientMessage = (websocketConnection, message) =>
    {
        this.MessageService.saveClient(websocketConnection, message.token);

        this.MessageService.sendMessageToBrowser(message);
    }





}


module.exports = MessageController;