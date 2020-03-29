// Initialize the socket.io-client server for bi-directional communicaiton
var socket = io();

$(document).ready(function() {

  // show user when connected to the group 
  socket.emit('init', 'User is connected!');

  socket.on('init', info => {
    $('.chat-messages').append(
      '<div class = "message">' +
        `<p class="notify">${info}</p>`
    );
  });

  $('form').submit(e => {
    e.preventDefault();
    socket.emit('brodcast', $('#msg').val());
    $('#msg').val('');
    return false;
  });

  socket.on('restore', msg => {
    console.log(msg);

    msg.forEach(restore => {
      $('.chat-messages').append(
        '<div class = "message">' +
          '<p class="text">' +
          `<p class="meta">Username<span> 9:12pm </span> </p>` +
          `${restore} </p>`
      );
    });
  });

  // Add meto info above the p Element
  // + '<p class="meta">Brad <span> 9:12pm </span> </p>'

  socket.on('brodcast', msg => {
    $('.chat-messages').append(
      '<div class = "message">' +
        `<p class="meta">username <span> 9:12pm </span> </p>` +
        '<p class="text">' +
        `${msg} </p>`
    );
  });
});

// Show msg when the user is disconnected 
socket.on('end', info => {
  $('.chat-messages').append(
    '<div class = "message">' +
      `<p class="notify">${info}</p>`
  );
});