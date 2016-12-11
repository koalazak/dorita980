'use strict';

const dgram = require('dgram');

function discovery (cb) {
  const server = dgram.createSocket('udp4');

  server.on('error', (err) => {
    server.close();
    cb(err);
  });

  server.on('message', (msg) => {
    try {
      let parsedMsg = JSON.parse(msg);
      if (parsedMsg.hostname && parsedMsg.ip && parsedMsg.hostname.split('-')[0] === 'Roomba') {
        server.close();
        console.log('Robot found! with blid ' + parsedMsg.hostname.split('-')[1]);
        cb(null, parsedMsg.ip);
      }
    } catch (e) {}
  });

  server.on('listening', () => {
    console.log('Looking for robots...');
  });

  server.bind(5678, function () {
    const message = new Buffer('irobotmcs');
    server.setBroadcast(true);
    server.send(message, 0, message.length, 5678, '255.255.255.255');
  });
}

module.exports = discovery;
