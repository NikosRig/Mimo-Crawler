
let mimoMainFunction = (token, custom_code) => {

    let responseMessage = { token: token, data: ''};

    let executeCustomCode = async () => {
        try {
           return new Function(custom_code)();

        } catch (error) { throw new Error(error) }
    };

    let websocket = new WebSocket('ws://localhost:4444/browser/crawl');

    websocket.onopen = async () => {

        await executeCustomCode().then((result) => {

            responseMessage.data = result;

        }).catch((error) => {
             responseMessage.data = error.toString();
        });

        websocket.send(JSON.stringify(responseMessage)); window.close();
    };

};




browser.runtime.sendMessage({ infoRequest: "tab_id" }).then((tab_id) => {

    browser.storage.local.get(''+tab_id+ '').then((e) => {

        let token = e[tab_id].token;
        let code = e[tab_id].code;

        document.documentElement.setAttribute('onreset', "("+mimoMainFunction+")("+JSON.stringify(token)+','+JSON.stringify(code)+")");
        document.documentElement.dispatchEvent(new CustomEvent('reset'));
        document.documentElement.removeAttribute('onreset');

    }).catch((e) => {console.log(e)});

});





