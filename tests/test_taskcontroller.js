
const { describe } = require("mocha");

const chai = require("chai");

const expect = chai.expect;

const sinon = require('sinon');

const config = require(__dirname + '/../src/config/ModulesConfig');

let TaskController =  new require(__dirname + '/../src/Controllers/TaskController');



describe("Test task in progress mechanism", () =>
{

    let configMock = {

        tasks: {

            fakeTask: async () => { return true; }

        }

    };

    it("should set the task in progress state as true",  () => {


        TaskController = new TaskController(configMock);

        TaskController.on('task:start', (taskAlias) =>
        {
            expect(TaskController.state.taskInProgress).to.equal(true);
        });

        TaskController.start('fakeTask');

    });




    it("should verify that when a task is done, taskInProgress is false",   () => {


        TaskController = new TaskController(configMock);

        TaskController.on('task:done', () => {

            expect(TaskController.state.taskInProgress).to.be.false;
        });

        TaskController.start('fakeTask');

    });

});
