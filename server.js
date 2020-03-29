const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var localMsg = ['Welcome from yap-chat!'];

app.use(require('express').static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/chat-page', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

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
