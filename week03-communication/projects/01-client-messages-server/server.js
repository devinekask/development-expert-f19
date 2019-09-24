const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 8080;

const io = require('socket.io')(server);
let connectionUrl = '';

app.use(`/`, express.static(`public`));

io.on('connection', socket => {
  console.log(`Connection`);
  socket.on(`message`, message => {
    console.log(`Received message: ${message}`);
    // Send message back to all connected clients
    io.sockets.emit(`message`, message);
  });
  socket.emit(`connectionUrl`, connectionUrl);
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
});