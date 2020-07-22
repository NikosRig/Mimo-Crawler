
const { describe } = require("mocha");

const chai = require("chai");

const expect = chai.expect;

const sinon = require('sinon');

const EventEmitter = require('events');

const beforeMiddleware = require('../src/Middleware/BeforeMiddleware');

describe("Test middleware observingness", () => {


    it("checks if the middleware has been called", () => {
        let middlewareSpy = sinon.spy();

        let emitter = new EventEmitter;

        emitter.once('message',middlewareSpy);

        emitter.emit('message')

        expect(middlewareSpy.called);
    });


    it("should return false because the message is not in json", () => {

        let validatedMessage = beforeMiddleware.validateMessage('iAmNotJson');

        expect(validatedMessage).to.equal(false);
    });

    it("should return true because the message is json", () => {

        let validatedMessage = beforeMiddleware.validateMessage(JSON.stringify({}));

        expect(validatedMessage).to.equal(true);
    });


});