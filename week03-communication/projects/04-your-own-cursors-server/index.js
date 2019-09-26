const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 8080;
const io = require('socket.io')(server);

const users = {};

app.use(express.static('public'));

io.on('connection', socket => {
  console.log(`Connection`);
  users[socket.id] = {
    id: socket.id,
    x: Math.random(),
    y: Math.random()
  };
  socket.on('update', data => {
    users[socket.id].x = data.x;
    users[socket.id].y = data.y;
  });
  socket.on('disconnect', () => {
    console.log('client disconnected');
    delete users[socket.id];
  });  
});

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
 setInterval(() => {
    io.sockets.emit('update', users);
  }, 100);
});