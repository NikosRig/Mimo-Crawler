const chai = require("chai");
const expect = chai.expect;
const sinon = require('sinon');

const apiContainer = require('../../src/clientApi/apiContainer');

describe('Tests websocket client', () => {




    it('tests websocket connection', () => {

            let websocketClient = apiContainer.resolve('websocketClient');

            websocketClient.connectToServer();

           expect(websocketClient.websocketApi.OPEN).to.equal(1);
    });

});
