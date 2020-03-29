// Initialize the socket.io-client server for bi-directional communicaiton
var socket = io();
const msgContainer = document.querySelector('.chat-messages');

// Complete the loading page 
$(document).ready(function() {
  // show user when connected to the group
  socket.emit('init', 'User is connected!');

  // Listen when the user is connected
  socket.on('init', info => {
    $('.chat-messages').append(
      '<div class = "message">' + `<p class="notify">${info}</p>`
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

  // Listen the restore event
  socket.on('restore', msg => {
    console.log(msg);

    // Print all those previous chat messages
    msg.forEach(restore => {
      $('.chat-messages').append(
        '<div class = "message">' +
          '<p class="text">' +
          `<p class="meta">Username<span> 9:12pm </span> </p>` +
          `${restore} </p>`
      );

      
    // scroll down 
    msgContainer.scrollTop = msgContainer.scrollHeight;
    });
  });

  // Listen broadcast images
  socket.on('brodcast', msg => {
    $('.chat-messages').append(
      '<div class = "message">' +
        `<p class="meta">username <span> 9:12pm </span> </p>` +
        '<p class="text">' +
        `${msg} </p>`
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
