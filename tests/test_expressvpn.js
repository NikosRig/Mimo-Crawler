
const assert = require('assert');

const expressvpn = require('../src/extensions/expressvpn');

const { describe } = require("mocha");

describe('Testing Expressvpn Disconnect', () => {

    it('should pass if disconnection was successful',  (done) => {

        expressvpn.once('Disconnected', () => { done() });

        expressvpn.disconnect();

    }).timeout(20000);

});


describe('Testing Expressvpn Connect', () => {

    it('should pass if successful connection event is fired',  (done) => {

        expressvpn.once('Disconnected', () => {

            expressvpn.once('Connected', () => { done() });

            expressvpn.connect();

        });

        expressvpn.disconnect();

    }).timeout(25000);


    it('should pass if the auto reconnection was successful',  (done) => {

        expressvpn.once('Connected', () => { done() });

        expressvpn.autoConnect();

        expressvpn.disconnect();


    }).timeout(35000);


});