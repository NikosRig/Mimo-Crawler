const EventEmitter = require('events');

const logger = require('../Logging/Logger');

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

        let status =  spawnSync('expressvpn', ['status'], {stdio: 'pipe'}).stdout;

        if (String(status).search('Connected to') !== -1)
            return 'connected';
        else if (String(status).search('Connecting') !== -1)
            return 'connecting';
        else
            return 'not connected'
    }

    /*
    *   Disconnect from expressvpn
    *   @event {Disconnected} fires event
    * */
    disconnect = () => {

        if (this.getStatus() === 'not connected') {
            this.emit('Disconnected');
            return;
        }

        let disconnect =  spawn('expressvpn', ['disconnect']);

        disconnect.stdout.on('data', (data) => {

            if (String(data).search('Disconnected') !== -1)
                this.emit('Disconnected');
        });

        this.childErrorLogHandler(disconnect, 'disconnect error');
    }


    /*
    *  Auto connect every time vpn is disconnected
    *  @param randomly {boolean} connect in random country or not
    *  @param countryAlias {string} connect to specific country
    * */
    autoConnect = (randomly = true, countryAlias) => {

        this.on('Disconnected', () => {

            if (this.getStatus() !== 'not connected') {

                this.disconnect();

                return;
            }

            this.connect(randomly, countryAlias);

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
            this.disconnect();
        });

        this.childErrorLogHandler(connect, 'connect error');

    }


    /*
    *  On child error, hold logs
    *  @param child process {object}
    *  @param customMessage {string}
    * */
    childErrorLogHandler = (childProcess, customMessage) => {

        childProcess.stderr.on('data', (stderr) => {
            logger.error(stderr);
        });

        childProcess.on('error', () => {
            logger.error(customMessage);
        });

    }


}

module.exports = new expressvpn();