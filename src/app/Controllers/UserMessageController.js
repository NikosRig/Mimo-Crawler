
class MessageController {


    constructor(opts)
    {
        this.messageService = opts.messageService;
    }

    processBrowserMessage = (websocketConnection, message) =>
    {
        if (message.event === "handshake") {
            this.messageService.saveBrowser(websocketConnection);
            return;
        }

        this.messageService.sendMessageToClient(message);
    }

    processClientMessage = (websocketConnection, message) =>
    {
        this.messageService.saveClient(websocketConnection, message.token);

        this.messageService.sendMessageToBrowser(message);
    }





}


module.exports = MessageController;