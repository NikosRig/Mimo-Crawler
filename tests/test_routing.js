const { describe } = require("mocha");

const chai = require("chai");

const expect = chai.expect;

const sinon = require('sinon');

const container = require('../src/app/container');

describe('Test routing service', () => {


    it('should verify that request handling is not throwing error', () => {
            let routingService = container.cradle.routingService;

            expect(routingService.handleRequest(1)).to.be.false;
    });


    it('', () => {



    });



});