const EventEmitter = require('events');

const logger = require('../Logging/Logger');


class MessageController extends EventEmitter {


    constructor() {

        super();

        this.clients = [];

        this.setBrowserEventListeners();
    }


    setBrowserEventListeners = () =>
    {
        this.on('browser:connect', (browserWsClient) =>
        {
            this.browser = browserWsClient;

            browserWsClient.once('close', () =>
            {
                delete this.browser;

                logger.warn('browserWsClient has close');
            });

            browserWsClient.once('error', () =>
            {
                delete this.browser;

                logger.error('browserWsClient error');
            });

        });

    }

    newMessage = (websocketClient, message) =>
    {
        message = JSON.parse(message);

        if (message.client_type == "browser") {

            this.emit('browser:connect', websocketClient);

            return true;
        }



    }



}


module.exports = MessageController;