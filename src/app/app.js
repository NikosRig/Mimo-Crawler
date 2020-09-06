

const container = require('./container');

let ws = container.resolve('websocketServer')

ws.start()