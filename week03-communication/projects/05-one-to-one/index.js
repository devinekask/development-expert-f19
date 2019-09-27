const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 8080;
const io = require('socket.io')(server);

app.use(express.static('public'));

const users = {};

io.on('connection', socket => {
  console.log(`Connection`);
  users[socket.id] = {
    id: socket.id
  };
  socket.on('update', (targetSocketId, data) => {
    if (!users[targetSocketId]) {
      return; // do nothing
    }
    // forward the update to that particular user
    socket.to(targetSocketId).emit('update', data);
  });
  socket.on('disconnect', () => {
    console.log('client disconnected');
    delete users[socket.id];
  });  
});

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});