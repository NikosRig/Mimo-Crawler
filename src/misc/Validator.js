


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


}






module.exports = new validator();