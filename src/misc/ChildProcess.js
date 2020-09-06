'use strict';

const find = require('find-process');
const fork = require('child_process').fork;
const path = require('path');
const logger = require('../Logging/Logger');


class ChildProcess {


    constructor(relativeScriptPath, forkParameters = [])
    {
        this.scriptName = path.resolve(relativeScriptPath);

        this.assignLogMessages();

         this.forkOptions = {
            stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ],
            silent: true
        };

         this.forkParameters = forkParameters;

    }

    /*
    *  Start child process forking
    * */
    start = () => {

        this.childProcess = fork(
            this.scriptName,
            this.forkParameters,
            this.forkOptions
        );

        this.pid = this.childProcess.pid;

        logger.info(this.processHasStartedMsg);

        return this;
    }

    /*
    * Kill the child process
    * */
    die = () => {

        this.isPidRunning().then(() => {

           let dieResult = this.childProcess.kill();

           if (!dieResult)
               logger.error(this.processCannotDieMsg);


        }).catch((error) => {

        });
    }


    /*
    *  Check if child process pid is running
    *  @return Promise
    * */
     isPidRunning =  async () => {

       await find('pid', this.pid).then( (processInformation) => {

               if (!processInformation.length) {

                   logger.error(this.processIsNotRunningMsg);

                   return Promise.reject(new Error(this.processIsNotRunningMsg));
               }


               return Promise.resolve();
            },
             (error) => {
                 logger.error('Process error: ' + error.stack || error);
                 return Promise.reject(new Error(error.stack || error));
             });

    }


    assignLogMessages =  () => {

         this.processCannotDieMsg = this.scriptName + 'cannot be killed';

         this.processIsNotRunningMsg = 'Process is not running';

         this.processHasStartedMsg = this.scriptName + " has started.";
    }




}

module.exports = ChildProcess;