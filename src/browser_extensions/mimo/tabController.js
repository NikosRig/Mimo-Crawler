// NS_ERROR_NET_ON_WAITING_FOR    NS_ERROR_UNKNOWN_HOST (server not found)
/*browser.webRequest.onErrorOccurred.addListener(
    (e) => {console.log(e)}, {urls: ["<all_urls>"]}
)*/



const createAndInject = (message) =>
{
    tabService.createTab(message.url).then((tabinfo) => {

        let code = codeInjectionBuilder(message.token, message.code);

        return tabService.injectCode(tabinfo.id, code, message.injectionDelay);

    }).catch(error => {
        console.log(error)
    });
}



websocket.addEventListener('message', (msg) =>
{
    let message = JSON.parse(msg.data);

    createAndInject(message);
});


