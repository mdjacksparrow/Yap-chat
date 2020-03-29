const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser')
// const url = require('url');


// To store excited messages instead of using DB 
var localMsg = [];

// Set public as a local folder to fetch our local html and css files 
app.use(require('express').static(__dirname + '/public'));
// Setup view engine template 
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chat-page', (req, res) => {

  // var url_parts = url.parse(req.url, true);
  // var query = url_parts.query;

  // users.push(query.username);

  res.render('chat');
});

// Initialize the socket connection 
io.on('connection', socket => {
  socket.on('init', msg => {
    io.emit('init', msg);
  });

  socket.emit('restore', localMsg);

  socket.on('brodcast', msg => {
    localMsg.push(msg);
    console.log('Data pushed into stack ' + msg);
    io.emit('brodcast', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user is disconnected!');
    io.emit('end','A user is disconnected!');
  });
});

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
  console.log('Server running on port #4000');
});
