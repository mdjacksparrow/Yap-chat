// Initialize the socket.io-client server for bi-directional communicaiton
var socket = io();
$(document).ready(function() {
  $('form').submit(e => {
    e.preventDefault();
    socket.emit('brod', $('#msg').val());
    $('#msg').val('');
    return false;
  });

   socket.on('restore', msg => {
    console.log(msg);
    msg.forEach(localmsg => {
        $('.chat-messages').append('<div class = "message">'
        + '<p class="meta">Brad <span> 9:12pm </span> </p>'
        + '<p class="text">'
        + `${localmsg} </p>`
        ); 
    });
})

  socket.on('brod', msg => {
    $('.chat-messages').append('<div class = "message">'
    + '<p class="meta">Brad <span> 9:12pm </span> </p>'
    + '<p class="text">'
    + `${msg} </p>`
    ); 
  });
});
