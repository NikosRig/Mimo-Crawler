
const { describe } = require("mocha");

const chai = require("chai");

const expect = chai.expect;

const sinon = require('sinon');

const expressvpn = require('../src/Services/expressvpn');



describe("Testing Expressvpn status", () => {

    it("checks if the status promise is resolved", () => {

        expressvpn.getStatus().then((status) => {

           chai.assert.typeOf(status, 'string');

        }).catch(() => {
            chai.assert.fail();
        });

    });

});


describe('Testing Expressvpn Disconnect', () => {

    it('should pass if disconnection was successful',  (done) => {

        expressvpn.once('Disconnected', () => { done() });

        expressvpn.disconnect();

    }).timeout(20000);

});


describe('Testing Expressvpn Connect', () => {

    it('should pass if successful connection event is fired',  (done) => {

        expressvpn.once('vpn:disconnected', () => {

            expressvpn.once('Connected', () => { done() });

            expressvpn.connect();

        });

        expressvpn.disconnect();

    }).timeout(25000);




    it('checks connect failure event',  (done) => {

        expressvpn.once('ConnectFailed', () => { done() });

        expressvpn.connect();

    }).timeout(25000);


    it('should pass if the auto reconnection was successful',  (done) => {

        expressvpn.once('Connected', () => { done() });

        expressvpn.autoConnect();

        expressvpn.disconnect();


    }).timeout(35000);


});

