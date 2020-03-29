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
  
    // listen and send notify message to all connected users
    socket.broadcast.emit('init', `${username} is connected to group chat`);

    // Insert the user into active array 
    userUtils.insertUser(socket.id, username);

    // Emit all user in the active section 
    io.emit('online', userUtils.activeUsers);
  });

  // listen and send welcome message to connect user
  socket.on('welcome', msg => {
    socket.emit('welcome', msgUtils.formatMsg('Yap bot', msg));
  });

  // Listen when the user is send messages
  socket.on('brodcast', msg => {
    io.emit('brodcast', msgUtils.formatMsg(username, msg));
  });

  // Listen when the user is disconneted
  socket.on('disconnect', async () => {

    // To remove the current user 
    const activeUsers = userUtils.activeUsers;
    var i = activeUsers.length;
    while(i--){
      if( activeUsers[i] 
        && activeUsers[i].hasOwnProperty('id') 
        && (arguments.length > 2 && activeUsers[i]['id'] === socket.id ) ){ 
          
          activeUsers.splice(i,1);
        }
      }
    console.log(userUtils.activeUsers);
      
    console.log(`A ${socket.id} is disconnected!`);
    await io.emit('end', `${username} is disconnected!`);

    // Emit all user in the active section 
    await io.emit('online', activeUsers);
  });
});

// Init the port number
const PORT = process.env.PORT || 4000;

// Init the server
http.listen(PORT, () => {
  console.log('Server running on port #4000');
});
