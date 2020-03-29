const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const utils = require('./utils/utilities');

// To store excited messages instead of using DB 
var localMsg = [];

let reqObject = {};

// Set public as a local folder to fetch our local html and css files 
app.use(require('express').static(__dirname + '/public'));

// Setup view engine template 
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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

  // listent and send message to all connected users 
  socket.on('welcome', msg => {
    socket.emit('welcome', utils.formatMsg('Yap bot', msg));
  });

  // Send all previous msg in the stack 
  socket.emit('restore', localMsg);

  // Listen when the user is send messages 
  socket.on('brodcast', msg => {
    localMsg.push(utils.formatMsg(utils.getUser(reqObject), msg));
    console.log('Data pushed into stack ' + utils.formatMsg(utils.getUser(reqObject), msg));
    io.emit('brodcast', utils.formatMsg(utils.getUser(reqObject), msg));
  });

  // Listen when the user is disconneted 
  socket.on('disconnect', () => {
    console.log('A user is disconnected!');
    io.emit('end','A user is disconnected!');
  });
});

// Init the port number 
const PORT = process.env.PORT || 4000;

// Init the server 
http.listen(PORT, () => {
  console.log('Server running on port #4000');
});
