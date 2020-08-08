

/*
*  Close the current browser window
* */
const closeBrowserWindow = () =>
{
    browser.windows.getCurrent().then((window) => {
        browser.windows.remove(window.id);
    });
};