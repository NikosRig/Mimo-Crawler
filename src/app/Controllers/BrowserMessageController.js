

class BrowserMessageController {


    constructor(opts)
    {
        this.messageService = opts.messageService;
    }

    save = (websocketConnection) =>
    {
        this.messageService.saveBrowser(websocketConnection);
    }

    sendMessage = (message) =>
    {
        this.messageService.sendMessageToBrowser(message);
    }

}


module.exports = BrowserMessageController;