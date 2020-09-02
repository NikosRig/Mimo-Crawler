

// NS_ERROR_NET_ON_WAITING_FOR    NS_ERROR_UNKNOWN_HOST (server not found)


/*browser.webRequest.onErrorOccurred.addListener(
    (e) => {console.log(e)}, {urls: ["<all_urls>"]}

)*/


websocket.addEventListener('message', (message) =>
{
    let msg = JSON.parse(message.data);



});
