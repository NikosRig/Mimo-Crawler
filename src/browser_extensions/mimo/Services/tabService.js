
class TabService  {


    createTab = url =>
    {
        return browser.tabs.create(
            { url: url }
        );
    }


    /*
    *  @param tabid {integer}
    *  @param delay {integer}
    *  @return {promise}
    * */

    closeTab = (tabid, delay = 0) =>
    {
        return new Promise((resolve, reject) => {

            setTimeout(() => {

                browser.tabs.remove(tabid).then(() => {
                    resolve();
                }).catch( closeTabError => { reject(closeTabError); });

            }, delay);

        });
    }


    /*
    * @param tabid {integer}
    * @return {promise}
    * */

    isTabExists = async (tabid) =>
    {
        return await browser.tabs.get(tabid).then(() => {
            return true;
        }).catch( error => { throw new Error(error); });
    }



    /*
    *  @param tabId {integer}
    *  @param code {string}
    *  @param delay {integer}
    *  @return {promise}
    * */

    injectCode = (tabid, code, delay = 0) =>
    {
        return new Promise((resolve, reject) => {

            setTimeout( () => {

                browser.tabs.executeScript(tabid, { code: code }).then(() => {
                    resolve();
                }).catch( injectionError => { reject(injectionError); });

            }, delay);

        });
    }

}


const tabService = new TabService();
