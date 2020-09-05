
let MessageService = require(__dirname + '/../Services/MessageService');

let MessageController = require(__dirname + '/../Controllers/MessageController');
MessageController = new MessageController(MessageService);

route = (websocketConnection, message) =>
{

    if (message.client_type === "browser") {

        MessageController.processBrowserMessage(websocketConnection, message);

        return;
    }


    if (message.client_type === 'client') {

        MessageController.processClientMessage(websocketConnection, message);

        return;
    }


}


module.exports = { route };