
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


    listenForTabIdRequests = () =>
    {
        browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {

            if (msg.infoRequest !== 'tab_id')
                return;

            sendResponse(sender.tab.id);
        });
    }


    listenForClosingTabs = (callback) =>
    {
        browser.tabs.onRemoved.addListener((tab_id, removeInfo) => {
            callback(tab_id);
        });
    }


}


const tabService = new TabService();
