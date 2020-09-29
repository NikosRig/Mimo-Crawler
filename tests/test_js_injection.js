const chai = require("chai");

const expect = chai.expect;

const sinon = require('sinon');

const EventEmitter = require('events');

let WebSocket = require('ws');



describe('Test response after js injection when an error occured.', () => {

    before(() => {
         websocket_client = new WebSocket('ws://localhost:4444/');
    });

    after(function(){
        websocket_client.close();
    });

    it('tests if the response is recieved after runtime Error in synchronous custom code', (done) => {

        websocket_client.addEventListener('open', () => {

            websocket_client.send(JSON.stringify({
                token: 'test', url: 'https://www.amazon.com',
                code: `throw new Error('i am an uncaught error'); return 'test';`
            }))

        });

        websocket_client.onmessage = (message) => {
            websocket_client.close();
            done();
        };
    });









});