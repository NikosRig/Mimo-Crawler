

/*
*  Close the current browser window
* */
const closeBrowserWindow = () =>
{
    browser.windows.getCurrent().then((window) => {
        browser.windows.remove(window.id);
    });
};




let code = (token, code) => {

    let mimoToken = `let mimoToken = '${token}';`;

    let eventFire = `
    document.documentElement.setAttribute('onreset', "("+mimoCode+")("+JSON.stringify(mimoToken)+")");
    document.documentElement.dispatchEvent(new CustomEvent('reset'));
    document.documentElement.removeAttribute('onreset');
    `;

    let mimoCode = `
   
     let mimoCode = (props) => {
    
        let msg = {
            token: props,
            client_type: 'browser',
            event: 'data',
            data: ''
        };
    
        let webSocket = new WebSocket('ws://localhost:4444');
    
        let crawlData = async () => {
            try {
                ${code}
    
            } catch (error) {throw new Error(error)}
        };
    
        webSocket.onopen = async () => {
            await crawlData().then((r) => {
                msg.data = r;
            }).catch((error) => { msg.event = 'error'; msg.error = error.toString(); });
    
            webSocket.send(JSON.stringify(msg));
        };
        
    }   
    `;

    return `${mimoToken} ${mimoCode} ${eventFire}`;
}