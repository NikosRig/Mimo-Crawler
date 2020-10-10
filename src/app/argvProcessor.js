
let argvProcessor = ({argv, appConfig}) =>
{
    if (argv.firefoxDev)
        appConfig.firefoxDeveloperEditionBinaryPath = argv.firefoxDev;


}

module.exports = argvProcessor;