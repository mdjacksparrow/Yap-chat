const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const userUtils = require('./utils/users');
const msgUtils = require('./utils/messages');

// Set public as a local folder to fetch our local html and css files
app.use(require('express').static(__dirname + '/public'));

// Setup view engine template
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Get root route
app.get('/', (req, res) => {
  res.render('index');
});

// Get chat route
app.get('/chat-page', (req, res) => {
  reqObject = req;
  res.render('chat');
});

// Initialize the socket connection
io.on('connection', socket => {

  let username;

  // Get username 
  socket.on('getUser', user => {
    username = user;
    console.log(username);
  });

  // listen and send welcome message to connect user
  socket.on('welcome', msg => {
    socket.emit('welcome', msgUtils.formatMsg('Yap bot', msg));
  });

  // listen and send notify message to all connected users
  socket.broadcast.emit('init', 'User is connected to group chat');

  // Send all previous msg in the stack
  // socket.emit('restore', localMsg);

  // Listen when the user is send messages
  socket.on('brodcast', msg => {
    io.emit('brodcast', msgUtils.formatMsg(username, msg));
  });

  // Listen when the user is disconneted
  socket.on('disconnect', () => {
    console.log('A user is disconnected!');
    io.emit('end', 'A user is disconnected!');
  });
});

// Init the port number
const PORT = process.env.PORT || 4000;

// Init the server
http.listen(PORT, () => {
  console.log('Server running on port #4000');
});
