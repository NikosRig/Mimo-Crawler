
const awilix = require('awilix');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});


container.register({

    filesystem: awilix.asValue(require('fs')),
    argv: awilix.asValue(require('minimist')(process.argv.slice(2))),
    web_ext: awilix.asValue(require('web-ext')),
    appConfig: awilix.asValue(require('../Config/appConfig')),
    processArgv: awilix.asFunction(require('../Utils/argvProcessor')),
    logger: awilix.asValue(require('../Utils/Logger')),
    websocketServer: awilix.asClass(require('../Server/websocketServer')).singleton(),
    routingService: awilix.asClass(require('../Services/RoutingService')).singleton(),
    routes: awilix.asFunction(require('../Routing/Routes')).singleton(),
    browserService: awilix.asClass(require('../Services/BrowserService')).singleton(),
    messageService: awilix.asClass(require('../Services/MessageService')).singleton(),
    messageController: awilix.asClass(require('../Controllers/MessageController')),

});


module.exports = container;

