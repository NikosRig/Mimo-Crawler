

let mimoFunction = (tab_message) => {

    let websocket = new WebSocket('ws://localhost:4444/browser/crawl');
    let closeTabDelay = 5000;

    if (tab_message.disableWindowAlert)
        alert = () => {};

    if (tab_message.closeTabDelay)
        closeTabDelay = tab_message.closeTabDelay;

    let message = {
        token: tab_message.token,
        url: tab_message.url,
    };

    window.onerror =  (msg, url, lineNo, columnNo, error) => {
        message.error = error.toString();
        websocket.send(JSON.stringify(message));
        return true;
    }

    let executeCustomCode = async () => {
        return new Promise((response, reject) => { eval(tab_message.code); });
    };

    websocket.onopen = async () => {

        await executeCustomCode().then(response => {
            message.responseData = response;
        }).catch(error => {
            message.error = error.toString()
        });

        websocket.send(JSON.stringify(message));

        setTimeout(() => { window.close(); }, closeTabDelay)
    };

};

const injectMimoFunctionOnPageContext = async (tab_message) =>
{
    if (!tab_message.token)
        throw new Error('token is missing');

    document.documentElement.setAttribute('onreset', "("+mimoFunction+")("+JSON.stringify(tab_message)+")");
    document.documentElement.dispatchEvent(new CustomEvent('reset'));
    document.documentElement.removeAttribute('onreset');
}

const retrieveTabMessageFromStorage = async (tab_id) =>
{
    let storage_object = await browser.storage.local.get(''+ tab_id + '');

    if (!storage_object[tab_id])
        throw new Error('tab message is not exists');

    return storage_object[tab_id];
}


const sendRequestToGetTabId = () =>
{
    return browser.runtime.sendMessage({ infoRequest: "tab_id" });
}



sendRequestToGetTabId().then(tab_id => {

  return retrieveTabMessageFromStorage(tab_id);

}).then((tab_message) => {

    return injectMimoFunctionOnPageContext(tab_message);

}).catch(error => console.log(error) );
