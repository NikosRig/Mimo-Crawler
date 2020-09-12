
class RoutingService {

    constructor(opts)
    {
        this.opts = opts;

        this.routes = [];
    }

    handleRequest = (request) =>
    {
        if (request !== 'object' || !this.routes[request.url])
            return false;

        this.routes[request.url](this.opts, request);
    }


    addRoute = (requestUrl, callback) =>
    {
        this.routes[requestUrl] = callback;
    }

}

module.exports = RoutingService;