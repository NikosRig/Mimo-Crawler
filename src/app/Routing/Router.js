
class Router {

    constructor()
    {
        this.routes = [];
    }

    onRequest = (requestUrl, opts) =>
    {
        if (!this.routes[requestUrl])
            return;

        this.routes[requestUrl](opts);
    }


    addRoute = (requestUrl, callback) =>
    {
        this.routes[requestUrl] = callback;
    }

}

module.exports = Router;