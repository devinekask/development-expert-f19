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