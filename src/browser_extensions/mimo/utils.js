

const closeBrowserWindow = () =>
{
    browser.windows.getCurrent().then((window) => {
        browser.windows.remove(window.id);
    });
};


const consoleLogErrorOnDebugMode = (error) =>
{
    if (!debugMode)
        return;

    console.log(error);
}

const createNewTabAndSaveTabMessage = (tab_message) =>
{
    tabService.createTab(tab_message.url).then(tab_info => {

        storage_service.saveTabMessageInStorage(tab_info.id, tab_message);

    }).catch(error => { console.log(error) });
}