
const path = require('path');


    /* ----------------------------- Module configuration --------------------------------- /
    |
    |
    |
    / ----------------------------------------------------------------------------------*/






    /* --------------------------- Singleton Modules  -----------------------------------
    |  Register modules as singletons
    |  Set your module's name as property and as it's value set your module object
    */

   const singletonModules = {

        expressvpn: require(path.resolve(__dirname, '../Modules/expressvpn')),
    };



    /* --------------------------- Module Tasks  -----------------------------------
    |  Declare a module task as an object
    |  Set as property an alias and as value a module task
    */

const tasks = {

    'connect': singletonModules.expressvpn.connect,
    'disconnect': singletonModules.expressvpn.disconnect

};






module.exports = {
    singletonModules,
    tasks
};