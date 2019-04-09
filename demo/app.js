'use strict';
const net = require('net');
const client = new net.Socket();

client.connect(3333,'localhost', () => {});

const events = ['create','foo','delete','bar','basz','update','read','bark'];

setInterval( () => {
  let event = events[Math.floor(Math.random() * events.length)];
  client.write( `${event} just happened`);
}, 500)