// NS_ERROR_NET_ON_WAITING_FOR    NS_ERROR_UNKNOWN_HOST (server not found)
/*browser.webRequest.onErrorOccurred.addListener(
    (e) => {}, {urls: ["<all_urls>"]}
)*/


tabService.listenForTabIdRequests();

tabService.onTabClose( storage_service.removeTabMessageFromStorage );

websocket_service.onMessageEvent( createNewTabAndSaveTabMessage );
