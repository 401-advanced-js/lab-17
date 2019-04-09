'use strict';
const net = require('net');
const port = process.env.PORT || 3333;
const server = net.createServer();

server.listen(port, () => console.log(`server up on ${port}`));

let socketPool = {};
let allowedEvents = ['create','read','update','delete']

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  console.log('Welcome', id);

  socket.on('close', () => {
    delete socketPool[id];
    console.log(`Goodbye ${id}`);
  });

  socket.on('data', handleData);

});

const handleData = (buffer) => {
  let text = buffer.toString().trim();
  let [event, payload] = text.split(/\s+(.*)/)
  console.log('Event', event, 'Payload', payload);

  if(allowedEvents.includes(event)) {
    console.log(`BROADCAST: ${event}`);
    let message = {event,payload};
    for(let socket in socketPool){
      socketPool[socket].write(`${event}: ${payload}`);
    }
  }
  else{
    console.log(`Ignore: ${event}`)
  }
}