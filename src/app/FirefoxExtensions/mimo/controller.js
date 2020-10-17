


tabService.listenForTabIdRequests();

tabService.onTabClose( storage_service.removeTabMessageFromStorage );

websocket_service.onMessageEvent( createNewTabAndSaveTabMessage );


/*
function cancel(requestDetails) {
   // console.log("Canceling: " + requestDetails.url);
    return {cancel: true};
}

browser.webRequest.onBeforeRequest.addListener(
    cancel,
    {urls: ["<all_urls>"], types: ["image"]},
    ["blocking"]
);*/
