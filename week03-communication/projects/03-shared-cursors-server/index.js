const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 8080;

const io = require('socket.io')(server);
let connectionUrl = '';

app.use(`/`, express.static(`public`));

const users = {};

io.on('connection', socket => {
  console.log('connection');
  socket.emit('connectionUrl', connectionUrl);

  users[socket.id] = {
    id: socket.id,
    x: Math.random() * 100,
    y: Math.random() * 100
  };

  socket.on('update', data => {
    if (!data || !data.x || !data.y || !users[socket.id]) {
      return;
    }
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

  require('./scripts/get-ip-addresses')().then(ipAddresses => {
    if (ipAddresses.en0) {
      connectionUrl = `http://${ipAddresses.en0[0]}:${port}`;
    } else {
      connectionUrl = `http://localhost:${port}`;
    }
  });

  setInterval(() => {
    io.sockets.emit('update', users);
  }, 100);
});