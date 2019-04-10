'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  console.log('Welcome', id);

  socket.on('data', (buffer) => dispatchEvent(buffer));

  socket.on('close', () => {
    console.log(`Bye ${id}`)
    delete socketPool[id];
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  let [event, file] = text.split(/\s+(.*)/)
  if(event === 'Error'){
    console.log('Wrong file my dude');
  }
  else{
    console.log('STUFF HAPPENED TO ', buffer.toString().trim());
    for(let socket in socketPool){
      socketPool[socket].write(file);
    }
  }
}

let errorHandler = (err) => {
  console.log(err);
}
