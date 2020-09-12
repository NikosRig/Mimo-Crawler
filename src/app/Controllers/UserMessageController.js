
class UserMessageController {


    constructor(opts)
    {
        this.messageService = opts.messageService;
    }


    save = (request) =>
    {
        this.messageService.saveClient(request.websocketConnection, request.message.token);

        this.messageService.sendMessageToBrowser(request.message);
    }


    send = (request) =>
    {
        this.messageService.sendMessageToClient(request);
    }


}


module.exports = UserMessageController;