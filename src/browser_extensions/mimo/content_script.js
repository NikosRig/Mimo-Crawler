let mimoJsInjection = (token, custom_code) => {

    let websocket = new WebSocket('ws://localhost:4444/browser/crawl');
    let message = { token: token, errors: []};

    window.onerror =  (msg, url, lineNo, columnNo, error) => {
        message.errors.push(error.toString());
        websocket.send(JSON.stringify(message));
        return true;
    }

    let executeCustomCode = async () => {
        return new Promise((response, reject) => { eval(custom_code); });
    };

    websocket.onopen = async () => {

        await executeCustomCode().then(response => {
            message.responseData = response;
        }).catch(error => message.errors.push(error.toString()) );

        websocket.send(JSON.stringify(message)); //window.close();
    };

};


browser.runtime.sendMessage({ infoRequest: "tab_id" }).then((tab_id) => {

    browser.storage.local.get(''+tab_id+ '').then((e) => {

        let token = e[tab_id].token;
        let code = e[tab_id].code;

        document.documentElement.setAttribute('onreset', "("+mimoJsInjection+")("+JSON.stringify(token)+','+JSON.stringify(code)+")");
        document.documentElement.dispatchEvent(new CustomEvent('reset'));
        document.documentElement.removeAttribute('onreset');

    }).catch((e) => {console.log(e)});

});





