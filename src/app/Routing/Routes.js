module.exports = ({routingService, messageController}) => {

    routingService.addRoute('/browser/handshake', (opts, request) => {
        messageController.handleBrowserHandshakeRequest(request);
    });


    routingService.addRoute('/', (opts, request) => {
        messageController.handleClientWebsocketRequest(request);
    });


    routingService.addRoute('/browser/crawl', (opts, request) => {
        messageController.handleBrowserWebsocketRequest(request);
    });

}