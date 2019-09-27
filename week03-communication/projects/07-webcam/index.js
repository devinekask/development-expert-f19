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
 console.log(`App listening on port ${port}!`);
});