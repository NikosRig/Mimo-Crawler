
class RoutingService {

    constructor(opts)
    {
        this.opts = opts;

        this.routes = [];
    }

    handle = (request) =>
    {
        if (!this.routes[request.url]) {
            console.log('unmatched url');
            return;
        }

        this.routes[request.url](this.opts, request);
    }


    addRoute = (requestUrl, callback) =>
    {
        this.routes[requestUrl] = callback;
    }

}

module.exports = RoutingService;