
let argvProcessor = ({argv, appConfig}) =>
{
    if (argv.firefox)
        appConfig.firefox_binary_path = argv.firefox;


}

module.exports = argvProcessor;