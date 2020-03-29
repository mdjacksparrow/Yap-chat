const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const ejs = require('ejs');

// To store excited messages instead of using DB 
var localMsg = ['Welcome from yap-chat!'];

// Set public as a local folder to fetch our local html and css files 
app.use(require('express').static(__dirname + '/public'));
// Setup view engine template 
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chat-page', (req, res) => {
  res.render('chat');
});

// Initialize the socket connection 
io.on('connection', socket => {
  console.log('A user connected!');

  socket.emit('restore', localMsg);

  socket.on('brod', msg => {
    localMsg.push(msg);
    console.log('Data pushed into stack ' + msg);
    io.emit('brod', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user is disconnected!');
  });
});

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
  console.log('Server running on port #4000');
});
