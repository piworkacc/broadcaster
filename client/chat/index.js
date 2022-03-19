const WS_PORT = 3002;

const WebSockket = require('ws');

const WSS = new WebSockket.Server({ port: WS_PORT });

console.log(`Web socket server started on ${WS_PORT}`);

const WSHandler = (stream) => {
  console.log('Client connected');
  stream.on('message', (data) => {
    console.log(JSON.parse(data));
  });
};

module.exports = { WSS, WSHandler };
