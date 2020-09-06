
const EventEmitter = require('events');


isInstanceOfEventEmitter = (object) =>
{
    if (object instanceof EventEmitter)
        return true;

    return false;
}


module.exports = {
    isInstanceOfEventEmitter
};