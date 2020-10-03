

let mimoFunction = (tab_message) => {

    let websocket = new WebSocket('ws://localhost:4444/browser/crawl');

    let message = {
        token: tab_message.token,
        url: tab_message.url,
        errors: []
    };

    window.onerror =  (msg, url, lineNo, columnNo, error) => {
        message.errors.push(error.toString());
        websocket.send(JSON.stringify(message));
        return true;
    }

    let executeCustomCode = async () => {
        return new Promise((response, reject) => { eval(tab_message.code); });
    };

    websocket.onopen = async () => {

        await executeCustomCode().then(response => {
            message.responseData = response;
        }).catch(error => message.errors.push(error.toString()) );

        websocket.send(JSON.stringify(message));
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
