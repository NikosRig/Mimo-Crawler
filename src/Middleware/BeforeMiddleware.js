
const EventEmitter = require('events');

const logger = require('../Logging/Logger');

const Validator = require('../misc/Validator');

class BeforeMiddleware {

    constructor()
    {

    }


    inspect = (wsclient, message) =>
    {
        return new Promise((resolve,reject) =>
        {
            if (!this.validateMessage(message))
                reject();


            resolve(wsclient, message);
        });
    };


    validateMessage = (message) => {

        if (!Validator.isJson(message))
            return false;


        return true;
    };


}

module.exports = new BeforeMiddleware();