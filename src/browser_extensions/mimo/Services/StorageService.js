class StorageService {


    saveTabMessageInStorage = (tab_id, message) =>
    {
        if (typeof message !== 'object') {
            consoleLogErrorOnDebugMode('SaveMessageInStorage: message must be object');

            return;
        }

        browser.storage.local.set({[tab_id]: message} ).catch(error => {
            consoleLogErrorOnDebugMode(error);
        });
    }


    removeTabMessageFromStorage = (tab_id) =>
    {
        browser.storage.local.remove(''+ tab_id + '').catch(error =>
        {
            consoleLogErrorOnDebugMode(error);
        });
    }


}

const storage_service = new StorageService();