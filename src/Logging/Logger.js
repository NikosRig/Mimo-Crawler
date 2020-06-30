'use strict';

const winston = require('winston');
const path = require('path');

const errorLog = path.resolve(__dirname, 'logs/errors.log');
const infoLog = path.resolve(__dirname, 'logs/info.log');
const warning = path.resolve(__dirname, 'logs/warnings.log');
const verbose = path.resolve(__dirname, 'logs/verbose.log');

const logger = winston.createLogger({

    level: 'debug',

    format: winston.format.simple(),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: errorLog, level: 'error' }),
        new winston.transports.File({ filename: infoLog, level: 'info' }),
        new winston.transports.File({ filename: verbose, level: 'verbose' }),
        new winston.transports.File({ filename: warning, level: 'warn' })
    ]
});


module.exports = logger;

