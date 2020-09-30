const chai = require("chai");

const expect = chai.expect;

const sinon = require('sinon');

const EventEmitter = require('events');

let WebSocket = require('ws');

let websocket_url = 'ws://localhost:4444/';

describe('Tests js injection when an error occurred', () => {

    before(() => { websocket_client = new WebSocket(websocket_url); });

    after(() => { websocket_client.close(); });

    it('tests if the response is received by causing a runtime Error in synchronous custom code', (done) => {

        websocket_client.addEventListener('open', () => {

            websocket_client.send(JSON.stringify({
                token: 'test', url: 'https://www.amazon.com',
                code: `throw new Error('i am an uncaught error'); return 'test';`
            }));

        });

        websocket_client.onmessage = (message) => { done(); };
    });

});



describe('Tests js injection with asynchronous custom code', () => {

    before(() => { websocket_client = new WebSocket(websocket_url); });

    after(() => { websocket_client.close(); });

    it('tests setTimeout', (done) => {

        websocket_client.addEventListener('open', () => {

            websocket_client.send(JSON.stringify({
                token: 'test', url: 'https://www.amazon.com',
                code: `setTimeout(() => { response('testAsync') }, 1000) `
                })
            );

        });

        websocket_client.onmessage = (message) => {
            if (JSON.parse(message.data).responseData === 'testAsync')
                done();
        };
    }).timeout(5000);


    it('tests if an error inside a setTimeout will be caught', (done) => {
        websocket_client.addEventListener('open', () => {

            websocket_client.send(JSON.stringify({
                    token: 'test', url: 'https://www.hepsiburada.com/',
                    code: `setTimeout(() => { throw new Error('test'); response(1); }, 1000) `
                })
            );

        });

        websocket_client.onmessage = (message) => {
           console.log(message.data)
                done();
        };
    }).timeout(5000);


});
