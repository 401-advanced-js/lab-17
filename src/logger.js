'use strict';

const net = require('net');
const client = new net.Socket();
client.connect(3001, 'localhost', () => {});

client.on('data', (payload) => {
  console.log(payload,' has been saved');
})

client.on('close', () => {
  console.log('Connection closed');
})