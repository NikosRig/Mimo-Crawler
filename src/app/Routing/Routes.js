module.exports = (opts) => {

    opts.routingService.addRoute('/browser/handshake', (opts, request) => {
        opts.browserController.save(request.websocketConnection);
    });



    opts.routingService.addRoute('/client/crawl', (opts, request) => {
        opts.userMessageController.save(request);
    });



    opts.routingService.addRoute('/browser/crawl', (opts, request) => {
        opts.userMessageController.send(request);
    });

}