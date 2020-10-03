
class BrowserService {


    constructor({web_ext, appConfig})
    {
        this.web_ext = web_ext;
        this.appConfig = appConfig;

        this.setMimoExtensionPath();
    }

    setMimoExtensionPath = () =>
    {
        this.mimo_extension_path = __dirname +'/../../browser_extensions/mimo';
    }

    startFirefoxDeveloperEdition = () =>
    {
        this.web_ext.cmd.run({
            firefox: '/usr/bin/firefox-developer-edition',
            sourceDir: this.mimo_extension_path,
        }, {
            shouldExitProgram: false,
        })
    }

}

module.exports = FirefoxService;