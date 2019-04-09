'use strict';
const net = require('net');
const client = new net.Socket();
client.connect(3333, 'localhost', () => {});
client.on('data', (payload) => {
  console.log('Got some data:', payload)
})

client.on('close', () => {
  console.log('Connection closed');
})