


class validator {

    isJson = (jsonString) => {
        try {
            let isJson = JSON.parse(jsonString);

            if (isJson && typeof isJson === "object")
                return true;

        }
        catch (e) {
            return false;
        }

        return false;
    };


    isObjectMethodExists = (object, method) =>
    {
        if (typeof object[method] == 'function')
            return true;

        return false;
    };


    isPropertyExists = (object, propertyName) =>
    {
        return object.hasOwnProperty(propertyName);
    }


    isAsyncFunction = (func) =>
    {
        if (func.constructor.name === "AsyncFunction")
            return true;

        return false;
    }


    isPromise = (func) =>
    {
        if (func instanceof Promise)
            return true;

        return false;
    }

}






module.exports = new validator();