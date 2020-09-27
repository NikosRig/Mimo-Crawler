// NS_ERROR_NET_ON_WAITING_FOR    NS_ERROR_UNKNOWN_HOST (server not found)
/*browser.webRequest.onErrorOccurred.addListener(
    (e) => {console.log(e)}, {urls: ["<all_urls>"]}
)*/


tabService.listenForTabIdRequests();

tabService.listenForClosingTabs(
    storage_service.removeTabIdFromStorage
);

websocket.addEventListener('message', (msg) =>
{
    let message = JSON.parse(msg.data);

    tabService.createTab(message.url).then((tabinfo) => {

        storage_service.saveTabIdInStorage(tabinfo.id, message);

    }).catch(error => {
        console.log(error)
    });

});










