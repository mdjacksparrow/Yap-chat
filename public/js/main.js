// Initialize the socket.io-client server for bi-directional communicaiton
var socket = io();
const msgContainer = document.querySelector('.chat-messages');

// Get the user name
let { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

// console.log(username);

// Complete the loading page
$(document).ready(function() {
  // show user when connected to the group
  socket.emit('welcome', 'Welcome to YapChat!');

  // Send the username to server
  socket.emit('getUser', username);

  // Listen all onlie users
  socket.on('online', users => {
    console.log('Online users are :');
    
    users.forEach(user => {
      $('.users-container').html(
        `<p class="users"> ${user.username} </p>`
      );
      console.log(user);
    });
  });

  // Listen when the server send by broadcast
  socket.on('init', info => {
    $('.chat-messages').append(
      '<div class = "message">' + `<p class="notify"> ${info} </p>`
    );
  });

  // Listen when the user is connected
  socket.on('welcome', info => {
    $('.chat-messages').append(
      '<div class = "message">' +
        '<p class="text">' +
        `<p class="meta">${info.username}<span> ${info.time} </span> </p>` +
        `${info.message} </p>`
    );

    // scroll down
    msgContainer.scrollTop = msgContainer.scrollHeight;
  });

  // Submit the form
  $('form').submit(e => {
    e.preventDefault();
    socket.emit('brodcast', $('#msg').val());
    $('#msg').val('');
    return false;
  });

  // Listen broadcast images
  socket.on('brodcast', msg => {
    $('.chat-messages').append(
      '<div class = "message">' +
        `<p class="meta"> ${msg.username} <span> ${msg.time} </span> </p>` +
        '<p class="text">' +
        `${msg.message} </p>`
    );

    // scroll down
    msgContainer.scrollTop = msgContainer.scrollHeight;
  });

  // Show msg when the user is disconnected
  socket.on('end', info => {
    $('.chat-messages').append(
      '<div class = "message">' + `<p class="notify">${info}</p>`
    );

    // scroll down
    msgContainer.scrollTop = msgContainer.scrollHeight + 20;
  });
});
