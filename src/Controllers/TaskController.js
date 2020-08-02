
const EventEmitter = require('events');

class TaskController  extends  EventEmitter {


    constructor(config)
    {
        super();

        this.tasks = config.tasks;

        this.listenForTaskEvents();

        this.state = { taskInProgress: false };

    }


    listenForTaskEvents = () =>
    {
        this.on('task:start', (taskAlias) =>
        {
            this.state.taskInProgress = true;
        });

        this.on('task:done', (taskAlias) =>
        {
            this.state.taskInProgress = false;
        });
    }


    /* ------------- Start a task -------------
    *
    * @param {string} task alias
    * @param {object} props Passes the object to the task
    */
    start = async (taskAlias, props) =>
    {
        await this.validateTaskCall(taskAlias);

        this.emit('task:start', taskAlias);

       this.tasks[taskAlias](props).then(() => {

           this.emit('task:done', taskAlias);

       }).catch((error) => {
           this.emit('task:error', error);
       });

    }




    /* ------------- Validates a task call -------------
    *
    *  @param taskAlias {string} The module's task name
    *  @return Promise
    */

    validateTaskCall = (taskAlias) =>
    {
        return new Promise((resolve,reject) => {

             if (!this.tasks.hasOwnProperty(taskAlias))
                 reject();

            resolve();
        });
    }


}

module.exports = TaskController;
