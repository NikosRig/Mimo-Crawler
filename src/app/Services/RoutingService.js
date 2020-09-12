
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
        if (typeof requestUrl !== 'string')
            return false;

        this.routes[requestUrl] = callback;
    }

}

module.exports = RoutingService;