
const websocket = require('ws');
const logger = require(__dirname + '/../Logging/Logger');
const { v1: uuidv1 } = require('uuid');


class mimoClient {

    constructor()
    {
        this.setWebsocketApiObject();

        this.setToken();
    }

    close = () =>
    {
        this.websocket_client.close();
    }

    addResponseListener = (callback) =>
    {
        if (typeof callback !== 'function')
            throw new Error('Response listener must be a function')

        this.websocket_client.onmessage = message =>
        {
            callback(JSON.parse(message.data))
        };
    }

    sendMessage = async (message) => {

        message.token = this.token;
         message = JSON.stringify(message);

         if (this.websocket_client.readyState === this.websocket_client.OPEN) {
             this.websocket_client.send(message);
             return;
         }

        try {
            await this.waitForWebsocketConnectionToBeOpened(this.websocket_client);
            this.websocket_client.send(message);
        } catch (err) {
            console.error(err);
        }

    }

    waitForWebsocketConnectionToBeOpened = () => {

        return new Promise((resolve, reject) => {

            let interval = setInterval(() => {

                if (this.websocket_client.readyState === this.websocket_client.OPEN) {
                    clearInterval(interval);
                    resolve();
                }

            }, 10);
        })

    }

    setToken = () =>
    {
        this.token = uuidv1();
    }

    setWebsocketApiObject = () =>
    {
        this.websocket_client = new websocket('ws://localhost:4444/');
    }


}

module.exports =  new mimoClient();