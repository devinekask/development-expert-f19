const express = require('express');
const app = express();
const fs = require('fs');
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')
};
const server = require('https').Server(options, app);
const port = process.env.PORT || 8080;

app.use(express.static('public'));

const io = require('socket.io')(server);

const users = {};

io.on('connection', socket => {

  // keeping track of all users
  users[socket.id] = {
    peers: {}
  };
  io.to(socket.id).emit('connectionUrl', connectionUrl);

  // New connection - will be called by beamer
  // -- Broadcast = sending to all clients except sender
  socket.broadcast.emit('peerConnection', socket.id);
  
  // Sending all users, so beamer can call them (projector project)
  // -- sending to individual socketid(private message)
  io.to(socket.id).emit('users', users);

  // NEW: beamer app wants to be called
  socket.on('peerWantsACall', (peerId) => {
    if (!users[peerId]) {
      return;
    }
    io.to(peerId).emit('peerWantsACall', socket.id);
  });

  // Beamer asks to call a specific peer
  socket.on('peerOffer', (peerId, offer = false) => {
    if (!users[peerId]) {
      return;
    }
    if (!offer) {
      return;
    }
    io.to(peerId).emit('peerOffer', socket.id, offer);
  });

  // Peer sends an answer to beamer
  socket.on('peerAnswer', (peerId, answer = false) => {
    if (!users[peerId]) {
      return;
    }
    if (!answer) {
      return;
    }
    io.to(peerId).emit('peerAnswer', socket.id, answer);
    // link these two users together
    users[socket.id].peers[peerId] = true;
    users[peerId].peers[socket.id] = true;
  });

  // ICE candidate arrives
  socket.on('peerIce', (peerId, candidate = false) => {
    if (!users[peerId]) {
      return;
    }
    if (!candidate) {
      return;
    }
    io.to(peerId).emit('peerIce', socket.id, candidate);
  });

  socket.on('disconnect', () => {
    notifyPeersOfDisconnect(socket.id);
    removeSocketIdFromUsers(socket.id);
  });

});

const notifyPeersOfDisconnect = socketId => {
  if (!users[socketId]) {
    return;
  }
  for (let peerId in users[socketId].peers) {
    io.to(peerId).emit('peerDisconnect', socketId);
  }
};

const removeSocketIdFromUsers = socketId => {
  if (!users[socketId]) {
    return;
  }
  for (let peerId in users[socketId].peers) {
    if (!users[peerId]) {
      continue;
    }
    delete users[peerId].peers[socketId];
  }
  delete users[socketId];
};

server.listen(port, () => {
  require('./get-ip-addresses')().then(ipAddresses => {
    if (ipAddresses.en0) {
      connectionUrl = `https://${ipAddresses.en0[0]}:${port}`;
    } else {
      connectionUrl = `http://localhost:${port}`;
    }
    console.log(`Server running: ${connectionUrl}`);
  });
});