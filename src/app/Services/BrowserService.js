
class BrowserService {


    constructor({web_ext, appConfig, filesystem})
    {
        this.web_ext = web_ext;
        this.firefoxDeveloperEditionBin = appConfig.firefoxDeveloperEditionBinaryPath;
        this.fs = filesystem;

        this.checkIfFirefoxBinaryExists();

        this.setMimoBrowserExtensionPath();
    }

    checkIfFirefoxBinaryExists = () =>
    {
        if (!this.fs.existsSync(this.firefoxDeveloperEditionBin))
            throw new Error('Firefox developer edition cannot be found in ' + this.firefoxDeveloperEditionBin);
    }

    setMimoBrowserExtensionPath = () =>
    {
        this.mimo_extension_path = __dirname +'/../../browser_extensions/mimo';
    }


    startFirefoxDeveloperEdition = () =>
    {
        this.web_ext.cmd.run({

            firefox: this.firefoxDeveloperEditionBin,
            sourceDir: this.mimo_extension_path,
            noReload: false,
            startUrl: 'about:about'

        }, {
            shouldExitProgram: false,
        })
    }

}

module.exports = BrowserService;