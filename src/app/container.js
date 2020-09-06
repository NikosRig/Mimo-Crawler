
const awilix = require('awilix')

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
})


container.register({

    websocketHost: awilix.asValue('127.0.0.1'),
    websocketPort: awilix.asValue(4444),
    websocketServer: awilix.asClass(require('./Server/websocketServer')).singleton(),

    router: awilix.asClass(require('./Routing/Router')).singleton(),

    messageService: awilix.asClass(require('./Services/MessageService')).singleton(),


    browserMessageController: awilix.asClass(require('./Controllers/UserMessageController')),
    userMessageController: awilix.asClass(require('./Controllers/BrowserMessageController'))

})


module.exports = container;




