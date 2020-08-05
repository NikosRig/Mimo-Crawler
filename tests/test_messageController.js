const { describe } = require("mocha");

const chai = require("chai");

const expect = chai.expect;

const sinon = require('sinon');

const EventEmitter = require('events');

let MessageController = require(__dirname + '/../src/Controllers/MessageController');


describe("Test", () => {


    it('should save the browser', () =>
    {
        MessageController = new MessageController();

        let message = JSON.stringify({'client_type': 'browser', 'event': 'handshake'});

        let browserWsClient = new EventEmitter();

        MessageController.newMessage(browserWsClient, message);

        expect(MessageController.browser).exist;
    });



    it('should delete the browser', () =>
    {
        MessageController = new MessageController();

        let browserClient = new EventEmitter();

        browserClient.on('close', () => {
            delete MessageController.browser;

            expect(MessageController.browser).not.to.exist;
        })

        let message = JSON.stringify({'client_type': 'browser', 'event': 'handshake'});

        MessageController.newMessage(browserClient, message);

        browserClient.emit('close');

    });




});