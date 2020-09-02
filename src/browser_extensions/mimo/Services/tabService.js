
class tabService  {


    createTab = url =>
    {
        return browser.tabs.create(
            { url: url }
        );
    }



    /* --------------------- Close a tab  ---------------------
    |  @param tabId {integer} @param delay {integer}
    */

    closeTab = (tabId, delay = 0) =>
    {
        setTimeout(() => {
            browser.tabs.remove(tabId).catch( closeTabError =>
            {
                console.log(closeTabError) ;
            });
        }, delay);
    }


    /*
    * @param tabId {integer}
    * @return {promise}
    * */

    isTabExists = async (tabId) =>
    {
        return await browser.tabs.get(tabId).then(() => {
            return true;
        }).catch( error => { throw new Error(error); });
    }

    

    /* --------------------------- Code injection  -----------------------------------
    |  Inject js code in tab
    |  @param tabId {integer} @param code {string} @param delay {integer}
    |  @return {promise}
    |
    */

    injectCode = (tabId, code, delay = 0) =>
    {
        return new Promise((resolve, reject) => {

            setTimeout(() => {

                this.isTabExists(tabId).catch( error => { reject(error); });

                browser.tabs.executeScript(tabId, { code: code }).then(() => {
                    resolve();
                }).catch( injectionError => { reject(injectionError); });

            }, delay);

        });
    }

}