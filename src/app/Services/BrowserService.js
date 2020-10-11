
class BrowserService {


    constructor({web_ext, appConfig, filesystem})
    {

        this.web_ext = web_ext;
        this.firefox_binary_path = appConfig.firefox_binary_path;

        this.fs = filesystem;
        this.productionMode = appConfig.productionMode;

        this.checkIfFirefoxBinaryExists();

        this.setMimoBrowserExtensionPath();
    }

    checkIfFirefoxBinaryExists = () =>
    {
        if (!this.fs.existsSync(this.firefox_binary_path))
            throw new Error('Firefox cannot be found in ' + this.firefox_bin_path);
    }

    setMimoBrowserExtensionPath = () =>
    {
        this.mimo_extension_path = __dirname +'/../../browser_extensions/mimo';
    }


    startFirefox = () =>
    {
        this.web_ext.cmd.run({

            firefox: this.firefox_binary_path,
            pref: {'security.csp.enable': false},
            sourceDir: this.mimo_extension_path,
            noReload: this.productionMode,
            startUrl: 'about:about',
            noInput: true,
            keepProfileChanges: true
        }, {
            shouldExitProgram: false,
        });

    }

}

module.exports = BrowserService;