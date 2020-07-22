require('process').title = 'MimoHeartbeat';

const WebSocket = require('ws');

const path = require('path');

const logger = require(path.resolve(__dirname, '../Logging/Logger'));



class heartbeat {

    constructor(wsAddress, heartbeatTimeout) {

        this.heartbeatTimeout = heartbeatTimeout;

        this.wsAddress = wsAddress;

        this.start();
    }


    start = () => {

        this.wsConnect(this.wsAddress);

        this.pingWsServer(2000);

        this.onWsPong();
    };

    /*
    *  Check if last server pong was > 10 seconds
    * */
    checkPingPongTime = () => {

        this.hearbeatInterval = setInterval(function (lastPongDateTime) {

            if ((Math.abs((new Date - lastPongDateTime) / 1000)) >= 10)
                logger.warn('Warning: Last pong response was before ' + lastPongDateTime + 'seconds');


        }, this.heartbeatTimeout, this.ws.lastPongDateTime);

    };

    /*
    * Connect to websocket server
    * @param {String} ws:ip:port
    * */
    wsConnect = (wsAddress) => {

        this.ws = new WebSocket(wsAddress);

        this.onWsOpen();
    };

    /*
    *  On open, check ping and pong time
    * */
    onWsOpen = () => {

        this.ws.on('open', () => {

            this.checkPingPongTime();

        });
    };


    /*
    * On pong, update pong datetime and restart heartbeat
    * */
    onWsPong = () => {

        this.ws.on('pong', () => {

            this.updateLastPongDateTime();

            clearInterval(this.hearbeatInterval);

            this.checkPingPongTime();

        });

    };


    /*
    *  Ping websocket server every x time
    *  @param {int} milliseconds
    * */
    pingWsServer = (time) => {

        clearInterval(this.pingInterval);

       this.pingInterval = setInterval(function (ws) {

            ws.ping(() => {});

        }, time, this.ws);

    };


    /*
    *  Update last pong last pong datetime
    * */
    updateLastPongDateTime = () => {

        this.ws.lastPongDateTime =  new Date();

        logger.verbose("Last pong response:" + this.ws.lastPongDateTime);

    };





}

new heartbeat('ws://127.0.0.1:4444', 2000);


