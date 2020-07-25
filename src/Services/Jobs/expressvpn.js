const EventEmitter = require('events');

const path = require('path');


const logger = require(path.resolve(__dirname, '../../Logging/Logger'));

const {spawn, spawnSync} = require('child_process');

const uniqueRandomArray = require('unique-random-array');


class expressvpn extends EventEmitter {

    constructor()
    {
        super();

        this.getCountryAliases();
    }

    /*
    * Get all expressvpn country aliases
    * @return {array} aliases list
    * */
    getCountryAliases =   () => {

        let regexp = new RegExp(/(\b[a-z]+\d?)\s+/g);

        let countryListStdout =  spawnSync('expressvpn', ['list', 'all'], {stdio: 'pipe'}).stdout;

        this.countryAliases = String(countryListStdout).match(regexp).map(country => country.trim());

        if (!Array.isArray(this.countryAliases) || !this.countryAliases.length)
            this.countryAliases = ['de'];

        return this.countryAliases;
    }


    /*
    *  Get a random country alias
    *  @return {string}
    * */
    getRandomCountry = () => {

        return uniqueRandomArray(
            this.countryAliases
        )();

    }

    /*
    *  Get expressvpn status
    *  @return {string} connected or not
    * */
    getStatus = () => {

        return new Promise((resolve, reject) => {

            let status =  spawnSync('expressvpn', ['status'], {stdio: 'pipe'});

            if (String(status.stderr) != '')  {
                logger.error(String(status.stderr));
                reject();
            }

            resolve(String(status.stdout));
        });

    }

    /*
    *   Disconnect from expressvpn
    *   @event {Disconnected} Triggers the Disconnected event
    * */
    disconnect = () => {

        let disconnect =  spawn('expressvpn', ['disconnect']);

        disconnect.stdout.on('data', (data) => {

            if (String(data).search('Disconnected') !== -1)
                this.emit('vpn:disconnected');

        });

        disconnect.stderr.on('data', (stderr) => {

            if (String(stderr).search('Disconnected.') !== -1) {
                this.emit('vpn:disconnected');
                return;
            }

            logger.error(stderr);
        });

        this.keepLogsOnProcessError(disconnect, false);
    }


    /*
    *  Auto connect every time vpn is disconnected
    *  @param randomly {boolean} connect in random country or not
    *  @param countryAlias {string} connect to specific country
    * */
    autoConnect = (randomly = true, countryAlias) => {

        this.on('vpn:disconnected', async () => {

            let status = await this.getStatus();

            if (status.search('Not connected') === -1)
                this.disconnect();

            this.connect(randomly, countryAlias);

            /*         this.getStatus().then((status) => {

                         if (status.search('Not connected') !== -1) {
                             this.disconnect();
                             return;
                         }
                         this.connect(randomly, countryAlias);

                     });*/



        });

    }

    /*
    *  Connect to vpn
    *  @param randomly {boolean} connect in random country or not
    *  @param countryAlias {string} connect to specific country
    * */
    connect =  (randomly = true, countryAlias) => {

        if (randomly)
            countryAlias = this.getRandomCountry();

        let connect =  spawn('expressvpn', ['connect', countryAlias], {stdio: 'pipe', shell: true});

        connect.stdout.on('data', (data) => {

            if (String(data).search('100.0%') !== -1)
                this.emit('Connected');

        });

        connect.stderr.on('data', (data) => {
                this.emit('ConnectFailed');

                this.emit('reconnect');
        });

        this.keepLogsOnProcessError(connect, true);

    }


    /*
    *  Writes the error log on child process error
    *  @param child process {object}
    *  @param writeStderr {boolean} true to write stderr
    * */

    keepLogsOnProcessError = (childProcess, writeStderr = false) => {

        childProcess.on('error', () => {
            logger.error('expressvpn process error');
        });

        if (!writeStderr)
            return;

        childProcess.stderr.on('data', (stderr) => {
            logger.error(String(stderr));
        });

    }


}

module.exports = new expressvpn();