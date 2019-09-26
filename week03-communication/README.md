# Week 3 - Communication

## Websockets

Up until today, you've been writing javascript applications which have been executing mostly on the client. If you wanted to load data from a server, you would use a `fetch` call, wait for an answer from the server and handle the server's response. 

But what if you wanted to get real-time data? An endless loop of fetches doesn't seem such a good idea performance-wise. Luckely, there is a way to keep an open connection and receive new data in our app as soon as it's available: (web)sockets.

(Web)sockets will allow us synchronize data / variables in real time between multiple clients connected to a central server. This data could be anything: text messages for a chat application, mouse positions for a collaborative drawing app or the position of a player in a multi-user game.

Most programming languages have built-in support for sockets. This way, you can link multiple programs and systems to eachother. Now, a socket connection is just one part of the picture, the programs must conform to a given set of rules: a protocol. When you write your own software, you can make this up yourself or use an existing protocol.

In javascript land, we will use Websockets. There have been a couple of versions of the Websocket protocol, but luckely you don't really have to worry about this, as this will be handled by the browser and the socket library you'll be using. Once the connection is made, it's up to you to decide on the format you want to use for data transfer. A logical choice would be sending JSON formatted messages back and forth.

You've probably already used web apps who are working with websockets: Facebook chat, Slack, a live reload server or a browser experience you control using your smartphone.

![collage of different websocket applications](images/websockets-applications.png)

We'll be using the [socket.io](https://socket.io) library on both our client and nodejs server. The benefit will be that a lot of the code on client and server will be pretty similar.

### Building a messaging client

As a first exercise, you'll build a client app which will talk to a server running on the professor's laptop.

Create a basic form, and load the socket.io library from a CDN:

```html
<form id="msgForm" method="post" action="">
  <input id="msgInput" type="text" name="msgInput" />
  <button type="submit">Send Message</button>
</form>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
```

Create variables to hold the form, input and the socket connections, and provide an `init()` function (empty for now):

```javascript
const msgForm = document.querySelector(`#msgForm`);
const msgInput = document.querySelector(`#msgInput`);

let socket; // will be assigned a value later

const init = () => {

};
init();
```

In this init function, you'll connect to the server. The ip-address of the server will be displayed on the beamer during the lab.

```javascript
socket = io.connect(`http://172.25.26.187:8082`);
socket.on(`connect`, () => {
  console.log(`Connected: ${socket.id}`);
});
```

Test the app. You should see the "connected" message in your javascript Console.

#### Sending a message to the server

Next up, we'll use the form to send a message to the server. Listen for the "submit" event on the form:

```javascript
msgForm.addEventListener(`submit`, e => handleSubmit(e));
```

and in the submit handler, you'll send a message with the socket. If everything works as it should, you should see your messages appear on the beamer!

```javascript
const handleSubmit = e => {
  e.preventDefault();
  if (socket.connected) {
    socket.emit(`message`, msgInput.value);
  }
  msgInput.value = ``;
};
```

#### Handling messages from the server

The server running on the beamer, also sends back messages. Everytime a client sends a message, the server will forward that message to all connected clients. Which means you can display everybody's messages in your app as well.

In our client-server application, the server will emit `message` events to all connected clients. So, you'll need to listen for this event on your socket object. Hook up an event listener in your `init()` function:

```javascript
socket.on(`message`, message => {
  console.log(`Received message: ${message}`);
});
```

Test the app again. You should see everybody's messages appear in your console as well as on the beamer.

Note that the `message` event type is something we chose ourselves. In your own apps, you can choose whichever event type you like (except from some built in types such as `connect`, `ping`, `pong`, ...)

Try to create a more interesting visualization for the socket messages received from the server 🙂.

### Building a server app

In the first part, we focussed on the client side code and connected to a ready-made server. Let's build our own server now!

#### Express

We'll use the express application framework as a basis of our nodejs server. Create a new project folder, and add the express framework to it's dependencies:

```bash
npm init -y
npm install express
```

Create an index.js file in the project root, where you start a basic express server:

```javascript
const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 8080;

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});
```

Add a start script to your package.json which executes the index.js file

```json
"scripts": {
  "start": "node index.js"
},
```

And run `npm start` to launch the node app. Navigating to http://localhost:8080 should give you a 404-error from express:

![screenshot of a 404 error](images/your-own-server-404.png)

So, how can you host files from your express app? If you [take a look at the docs](https://expressjs.com/en/starter/static-files.html) you'll see that there is an `express.static(root, [options])` middleware you can use.

Create a folder called `public` in your project root, and link the middleware to your express instance:

```javascript
app.use(express.static('public'));
```

Put your html file from the previous exercise in this public folder, and make sure you call it "index.html". Restart the server, and you should be able to view the html file. The websocket connection won't work yet, as we still need to handle it...

#### Listening for websocket connections

Next up, we'll need to handle websocket connections to our server. Add socket.io as a dependency to your project:

```
npm install socket.io
```

Initialise socket.io and pass in the express server:

```javascript
const io = require('socket.io')(server);
```

Next up, add an event listener to handle websocket connections:

```javascript
io.on('connection', socket => {
  console.log('connection');
}); 
```

As a final step, you'll need to connect to your own server in your html app:

```javascript
// socket = io.connect(`http://192.168.1.153:8082`);
socket = io.connect(`/`);
```

Restart the app, you should see a console.log happening in your server app when you open the html page.

#### Handling messages on the server

There's no logic in place yet to handle the messages from the clients. Let's listen for `message` events on our server and log them:

```javascript
io.on('connection', socket => {
  console.log(`Connection`);
  socket.on(`message`, message => {
    console.log(`Received message: ${message}`);
  });
});
```

When you restart the app, you'll see the messages from the browser appear in the server console!

Finally, we'll be forwarding the messages to all connected clients. There's an easy way to do this in socket.io: using `io.socket.emit()` you can broadcast a message to everyone. Use the same event type as a first parameter, and pass in the incoming message object:

```javascript
socket.on(`message`, message => {
  console.log(`Received message: ${message}`);
  io.sockets.emit(`message`, message);
});
```

You should see the messages appear in your client app as well. If you open up a second browser window, you should see the messages from one window appear in all windows. As a final test, you can try connecting to the server of one of your peers: use their ip-address instead of localhost. Use <kbd>option</kbd> + click on your wifi icon to view your ip address. You might want to disable your firewall in your Security & Privacy settings.