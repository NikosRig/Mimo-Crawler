
const awilix = require('awilix');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});


container.register({

    appConfig: awilix.asValue(require('./appConfig')),

    websocketServer: awilix.asClass(require('./Server/websocketServer')).singleton(),

    routingService: awilix.asClass(require('./Services/RoutingService')).singleton(),
    routes: awilix.asFunction(require('./Routing/Routes')).singleton(),


    messageService: awilix.asClass(require('./Services/MessageService')).singleton(),

    userMessageController: awilix.asClass(require('./Controllers/UserMessageController')),
    
    browserController: awilix.asClass(require('./Controllers/BrowserMessageController'))

});


module.exports = container;




