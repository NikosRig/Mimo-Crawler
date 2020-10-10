
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

        this.websocket_client.onmessage = response =>
        {
            response = JSON.parse(response.data);

            delete response.token;

            callback(response);
        };
    }

    crawl = async (options) => {

        options.token = this.token;

        options = JSON.stringify(options);

         if (this.websocket_client.readyState === this.websocket_client.OPEN) {
             this.websocket_client.send(options);
             return;
         }

        try {
            await this.waitForWebsocketConnectionToBeOpened(this.websocket_client);

            this.websocket_client.send(options);
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